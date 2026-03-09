import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { leadSchema, type LeadFormData } from '@/lib/validations'
import { AnimatedButton } from './AnimatedButton'

interface LeadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const requirementOptions = [
  'AI Chatbot / Virtual Assistant',
  'Business Process Automation',
  'LLM Integration & Fine-tuning',
  'Computer Vision / Image AI',
  'Custom ML Model Development',
  'AI SaaS Product Build',
  'AI Strategy & Consulting',
  'Improve Existing AI System',
  'Other',
]

export function LeadModal({ open, onOpenChange }: LeadModalProps) {
  const [success, setSuccess] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [submitError, setSubmitError] = useState('')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  })

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSuccess(false)
        setSubmitError('')
        reset()
      }, 300)
    }
  }, [open, reset])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onOpenChange(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, onOpenChange])

  const onSubmit = async (data: LeadFormData) => {
    try {
      setSubmitError('')
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '')
      await axios.post(`${apiUrl}/api/leads`, data)
      setSubmittedName(data.name)
      setSubmittedEmail(data.email)
      setSuccess(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.')
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-describedby={undefined}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card w-full max-w-lg p-8 relative"
              >
                {!success && (
                  <Dialog.Close className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                  </Dialog.Close>
                )}

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4"
                    >
                      <div className="flex justify-center mb-4">
                        <CheckCircle size={48} className="text-emerald-400" />
                      </div>
                      <Dialog.Title className="font-display font-bold text-2xl text-white mb-3">
                        Request Received 🎉
                      </Dialog.Title>
                      <p className="text-white/60 text-sm">
                        Thanks {submittedName}! We'll reach out to you at{' '}
                        <span className="text-white/80">{submittedEmail}</span> within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Dialog.Title className="font-display font-bold text-2xl text-white mb-1">
                        Get Started
                      </Dialog.Title>
                      <p className="text-white/50 text-sm mb-6">Tell us what you need. We'll take it from here.</p>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                          <input
                            {...register('name')}
                            type="text"
                            placeholder="Full Name"
                            className="glass-input"
                          />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                          <input
                            {...register('phone')}
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="glass-input"
                          />
                          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="Email Address"
                            className="glass-input"
                          />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                          <select
                            {...register('requirement')}
                            className="glass-input"
                            style={{ appearance: 'none', cursor: 'pointer' }}
                            defaultValue=""
                          >
                            <option value="" disabled style={{ background: '#111', color: 'rgba(255,255,255,0.4)' }}>
                              What do you need?
                            </option>
                            {requirementOptions.map((opt) => (
                              <option key={opt} value={opt} style={{ background: '#111', color: '#fff' }}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {errors.requirement && <p className="text-red-400 text-xs mt-1">{errors.requirement.message}</p>}
                        </div>

                        <div>
                          <textarea
                            {...register('message')}
                            placeholder="Additional details (optional)"
                            rows={4}
                            className="glass-input resize-none"
                          />
                        </div>

                        {submitError && <p className="text-red-400 text-sm">{submitError}</p>}

                        <AnimatedButton
                          type="submit"
                          loading={isSubmitting}
                          className="w-full justify-center"
                        >
                          Send Request →
                        </AnimatedButton>

                        <p className="text-white/30 text-xs text-center">
                          Responded to within 24 hrs · founder@unmatrix.in
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
