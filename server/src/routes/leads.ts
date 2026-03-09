import { Router } from 'express'
import { z } from 'zod'
import { supabase } from '../lib/supabase'
import { sendLeadEmail } from '../lib/email'

const router = Router()

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  requirement: z.string().min(1),
  message: z.string().optional(),
})

router.post('/', async (req, res, next) => {
  try {
    const data = leadSchema.parse(req.body)

    const { error } = await supabase
      .from('leads')
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        requirement: data.requirement,
        message: data.message ?? null,
      })

    if (error) throw new Error(error.message)

    // Fire nurturing email (non-blocking — failure won't affect response)
    sendLeadEmail(data.email, data.name)

    res.json({ success: true, message: 'Request received!' })
  } catch (err) {
    next(err)
  }
})

export default router
