import { Router } from 'express'
import { z } from 'zod'
import { supabase } from '../lib/supabase'
import { sendContactEmail } from '../lib/email'

const router = Router()

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10),
})

router.post('/', async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body)

    const { error } = await supabase
      .from('contacts')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        message: data.message,
      })

    if (error) throw new Error(error.message)

    // Fire nurturing email (non-blocking — failure won't affect response)
    sendContactEmail(data.email, data.name)

    res.json({ success: true, message: 'Message received!' })
  } catch (err) {
    next(err)
  }
})

export default router
