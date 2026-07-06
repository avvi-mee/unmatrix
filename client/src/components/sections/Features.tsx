import { motion } from 'framer-motion'
import { Bot, Cpu, GitBranch, Eye, Package, Lightbulb } from 'lucide-react'
import { GlassCard } from '@/components/shared/GlassCard'
import { staggerContainer, staggerItem } from '@/hooks/useAnimations'
import type { Feature } from '@/types'

const features: Feature[] = [
  {
    icon: Bot,
    title: 'AI Chatbots & Assistants',
    description: 'Deploy intelligent AI agents that handle support, sales, and onboarding 24/7 — in Hindi, English, or any language your customers speak.',
  },
  {
    icon: Cpu,
    title: 'LLM Integration & Fine-tuning',
    description: 'Connect your product to GPT-4o, Claude, or Gemini — then fine-tune on your own data so answers are specific, not generic.',
  },
  {
    icon: GitBranch,
    title: 'AI Automation & Workflows',
    description: 'Eliminate repetitive work. Our AI agents handle data entry, document processing, and complex business decisions automatically.',
  },
  {
    icon: Eye,
    title: 'Computer Vision & ML',
    description: 'From quality inspection to face recognition — we build and deploy production-grade vision models tailored to your industry.',
  },
  {
    icon: Package,
    title: 'Custom AI SaaS Products',
    description: 'Have an AI idea? We take it from brief to a live, paying-customer-ready SaaS product — end-to-end, built in weeks not months.',
  },
  {
    icon: Lightbulb,
    title: 'AI Strategy & Consulting',
    description: 'Not sure where AI fits in your business? We map the highest-ROI opportunities and build a clear execution roadmap.',
  },
]

export function Features() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Features</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
          Everything you need to go AI-first
        </h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          End-to-end AI capabilities. From first chatbot to full ML pipeline.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {features.map((feature, i) => (
          <motion.div key={i} variants={staggerItem}>
            <GlassCard className="h-full relative overflow-hidden group">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <feature.icon className="w-10 h-10 text-white/60 mb-4" />
              <h3 className="font-display font-bold text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
