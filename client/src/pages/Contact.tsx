import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Instagram } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import axios from 'axios'
import { Footer } from '@/components/layout/Footer'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { pageTransition } from '@/hooks/useAnimations'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How is Unmatrix different from using ChatGPT directly?',
    a: 'ChatGPT is a general-purpose tool. We build AI fine-tuned on your specific business data, integrated into your systems, deployed reliably, and monitored continuously.',
  },
  {
    q: 'How long does a typical AI project take?',
    a: 'Most projects go from discovery to a working prototype in 72 hours. Full production deployment typically takes 2–6 weeks depending on complexity and integrations required.',
  },
  {
    q: 'Do you work with non-technical founders?',
    a: 'Absolutely. We handle the entire technical side — strategy, development, deployment, and ongoing maintenance. You focus on the business.',
  },
  {
    q: 'What happens to our data?',
    a: 'Your data stays yours. We operate on strict data isolation — your training data is never shared across clients. We can also deploy on your own private cloud for maximum privacy.',
  },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError('')
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '')
      await axios.post(`${apiUrl}/api/contact`, data)
      setSubmitted(true)
    } catch {
      setSubmitError('Failed to send message. Please try again.')
    }
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/40 text-sm uppercase tracking-widest mb-4"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl md:text-6xl text-white"
        >
          Let's talk
        </motion.h1>
      </section>

      {/* Two-column contact */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-10 -left-10 w-64 h-64 pointer-events-none"
            />
            <div className="relative space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-6">Reach us directly</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/60">
                    <Mail size={18} className="text-white/30" />
                    <a href="mailto:founder@unmatrix.in" className="hover:text-white/80 transition-colors">
                      founder@unmatrix.in
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Instagram size={18} className="text-white/30" />
                    <a
                      href="https://www.instagram.com/avvi.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/80 transition-colors"
                    >
                      @avvi.me
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin size={18} className="text-white/30" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white mb-3">Response times</h3>
                <p className="text-white/50 text-sm">
                  We respond to all inquiries within 24 hours on business days. For urgent enterprise matters,
                  please mention it in your message.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <span className="text-emerald-400 text-2xl">✓</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Message received!</h3>
                <p className="text-white/50 text-sm">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input {...register('name')} type="text" placeholder="Your name *" className="glass-input" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('email')} type="email" placeholder="Email address *" className="glass-input" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <input {...register('phone')} type="tel" placeholder="Phone (optional)" className="glass-input" />
                </div>
                <div>
                  <input {...register('company')} type="text" placeholder="Company (optional)" className="glass-input" />
                </div>
                <div>
                  <textarea
                    {...register('message')}
                    placeholder="Tell us how we can help... *"
                    rows={5}
                    className="glass-input resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>
                {submitError && <p className="text-red-400 text-sm">{submitError}</p>}
                <AnimatedButton type="submit" loading={isSubmitting} className="w-full justify-center">
                  Send Message
                </AnimatedButton>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-white text-center mb-10"
        >
          Frequently asked
        </motion.h2>
        <Accordion.Root type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <Accordion.Item key={i} value={`item-${i}`} className="glass-card overflow-hidden">
              <Accordion.Header>
                <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left group">
                  <span className="text-white text-sm font-medium">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-white/40 group-data-[state=open]:rotate-180 transition-transform flex-shrink-0 ml-4"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-4">
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <Footer />
    </motion.div>
  )
}
