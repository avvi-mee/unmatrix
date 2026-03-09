import { Router } from 'express'
import { z } from 'zod'
import { supabase } from '../lib/supabase'

const router = Router()

const LEAD_STATUSES = ['new', 'in_progress', 'won', 'lost', 'fake'] as const
const CONTACT_STATUSES = ['new', 'replied', 'closed', 'spam'] as const

router.get('/data', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token || token !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const [{ data: leads }, { data: contacts }] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
    ])
    res.json({ leads: leads ?? [], contacts: contacts ?? [] })
  } catch (err) {
    next(err)
  }
})

const updateSchema = z.object({
  type: z.enum(['lead', 'contact']),
  id: z.string().uuid(),
  status: z.string(),
})

router.patch('/update', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token || token !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const result = updateSchema.safeParse(req.body)
    if (!result.success) return res.status(400).json({ error: result.error.errors })

    const { type, id, status } = result.data
    const validStatuses = type === 'lead' ? LEAD_STATUSES : CONTACT_STATUSES
    if (!validStatuses.includes(status as never)) {
      return res.status(400).json({ error: `Invalid status for ${type}` })
    }

    const table = type === 'lead' ? 'leads' : 'contacts'
    const { error } = await supabase.from(table).update({ status }).eq('id', id)
    if (error) throw new Error(error.message)

    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

export default router
