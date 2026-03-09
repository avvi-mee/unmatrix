import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const LEAD_STATUSES = ['new', 'in_progress', 'won', 'lost', 'fake'] as const
const CONTACT_STATUSES = ['new', 'replied', 'closed', 'spam'] as const

const schema = z.object({
  type: z.enum(['lead', 'contact']),
  id: z.string().uuid(),
  status: z.string(),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' })

  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token || token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const result = schema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.errors })

  const { type, id, status } = result.data
  const validStatuses = type === 'lead' ? LEAD_STATUSES : CONTACT_STATUSES
  if (!validStatuses.includes(status as never)) {
    return res.status(400).json({ error: `Invalid status for ${type}` })
  }

  const table = type === 'lead' ? 'leads' : 'contacts'
  const { error } = await supabase.from(table).update({ status }).eq('id', id)
  if (error) return res.status(500).json({ error: 'Failed to update' })

  res.json({ success: true })
}
