import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { GlassCard } from '@/components/shared/GlassCard'
import { staggerContainer, staggerItem } from '@/hooks/useAnimations'
import type { PricingPlan } from '@/types'

interface PricingProps {
  onLeadOpen?: () => void
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '₹9,000',
    period: '/month',
    description: 'Perfect for startups adding their first AI feature.',
    features: [
      '1 AI chatbot deployment',
      'Basic LLM integration (GPT-4o/Claude)',
      '10,000 API calls/month',
      'Community support',
      'Standard analytics dashboard',
    ],
    cta: 'Start for Free',
    highlighted: false,
  },
  {
    name: 'Standard',
    price: '₹20,000',
    period: '/month',
    description: 'For product teams ready to go AI-native.',
    features: [
      'Up to 5 AI agents / automations',
      'Custom LLM fine-tuning on your data',
      '100,000 API calls/month',
      'Priority support (24hr SLA)',
      'Multi-channel deployment (web, WhatsApp, API)',
      'Advanced accuracy & usage analytics',
      'Dedicated AI consultant (5 hrs/mo)',
      'Custom model hosting',
    ],
    cta: 'Start Standard',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '₹50K – ₹3L',
    period: '/month',
    description: 'Full-scale custom AI systems for large teams.',
    features: [
      'Everything in Standard',
      'Unlimited API calls',
      'On-premise / private cloud deployment',
      'Custom ML model training & fine-tuning',
      '99.9% uptime SLA',
      'Dedicated AI engineering team',
      'VAPT & data compliance support',
      'White-label AI products',
    ],
    cta: 'Contact Sales',
    ctaHref: 'mailto:founder@unmatrix.in',
    highlighted: false,
  },
]

export function Pricing({ onLeadOpen }: PricingProps) {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Pricing</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
          Simple, honest pricing
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Start free, scale as you grow. No hidden fees, no vendor lock-in.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-4 items-stretch"
      >
        {plans.map((plan) => (
          <motion.div key={plan.name} variants={staggerItem} className="flex-1">
            {plan.highlighted ? (
              <div className="relative h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                  Most Popular
                </div>
                <motion.div
                  className="bg-white text-black rounded-2xl p-6 h-full flex flex-col"
                  initial={{ scale: 0.98 }}
                  whileInView={{ scale: 1.02 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display font-extrabold text-4xl">{plan.price}</span>
                    <span className="text-black/50 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-black/60 text-sm mb-6">{plan.description}</p>
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-black flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={onLeadOpen}
                    className="w-full py-3 bg-black text-white rounded-full font-medium text-sm hover:bg-black/80 transition-colors"
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              </div>
            ) : (
              <GlassCard className="h-full flex flex-col" hover={false}>
                <h3 className="font-display font-bold text-xl text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display font-extrabold text-4xl text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/30 text-sm">{plan.period}</span>}
                </div>
                <p className="text-white/50 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <Check size={16} className="text-white/40 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.ctaHref ? (
                  <a href={plan.ctaHref}>
                    <AnimatedButton variant="secondary" className="w-full justify-center">
                      {plan.cta}
                    </AnimatedButton>
                  </a>
                ) : (
                  <AnimatedButton variant="secondary" onClick={onLeadOpen} className="w-full justify-center">
                    {plan.cta}
                  </AnimatedButton>
                )}
              </GlassCard>
            )}
          </motion.div>
        ))}
      </motion.div>

      <p className="text-white/30 text-xs text-center mt-8">
        All prices in INR + GST · Annual plans at 20% off · UPI & all major cards
      </p>
    </section>
  )
}
