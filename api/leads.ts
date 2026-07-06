import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { sendLeadEmail } from './lib/email'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  requirement: z.string().min(1),
  message: z.string().optional(),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const result = schema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.errors })

  const { error } = await supabase.from('leads').insert({
    name: result.data.name,
    phone: result.data.phone,
    email: result.data.email,
    requirement: result.data.requirement,
    message: result.data.message ?? null,
  })

  if (error) return res.status(500).json({ error: 'Failed to save' })

  // Fire nurturing email (non-blocking)
  sendLeadEmail(result.data.email, result.data.name)

  res.status(201).json({ success: true, message: 'Request received!' })
}
