import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { sendContactEmail } from './lib/email'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const result = schema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.errors })

  const { error } = await supabase.from('contacts').insert({
    name: result.data.name,
    email: result.data.email,
    phone: result.data.phone ?? null,
    company: result.data.company ?? null,
    message: result.data.message,
  })

  if (error) return res.status(500).json({ error: 'Failed to save' })

  // Fire nurturing email (non-blocking)
  sendContactEmail(result.data.email, result.data.name)

  res.status(201).json({ success: true, message: 'Message received!' })
}
