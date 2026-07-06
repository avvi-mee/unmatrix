import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, MessageSquare, GitBranch, Eye } from 'lucide-react'
import { GlassCard } from '@/components/shared/GlassCard'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { Footer } from '@/components/layout/Footer'
import { LeadModal } from '@/components/shared/LeadModal'
import { pageTransition, staggerContainer, staggerItem } from '@/hooks/useAnimations'

const products = [
  {
    name: 'Unmatrix Chat',
    icon: MessageSquare,
    description: 'Production-ready AI chatbots and assistants for any channel — web, WhatsApp, API.',
    accent: 'from-blue-500 to-purple-500',
    features: ['Custom personality & tone', 'Multi-language (Hindi/English/regional)', 'Live handoff to human agents', 'Conversation analytics'],
  },
  {
    name: 'Unmatrix Automate',
    icon: GitBranch,
    description: 'AI-powered workflow automation that eliminates repetitive business processes.',
    accent: 'from-purple-500 to-pink-500',
    features: ['Document parsing & data extraction', 'Multi-step AI agent pipelines', 'ERP / CRM integrations', 'Audit trails & logging'],
  },
  {
    name: 'Unmatrix Vision',
    icon: Eye,
    description: 'Custom computer vision and ML models trained on your specific data and domain.',
    accent: 'from-emerald-500 to-blue-500',
    features: ['Defect & anomaly detection', 'OCR & document AI', 'Custom image classifiers', 'Edge deployment ready'],
  },
]

const featureTabs = [
  {
    label: 'Chatbots',
    content: {
      title: 'Intelligent conversations, not just scripts',
      description: 'Our AI agents understand context, remember history, and escalate gracefully.',
      bullets: ['Context-aware multi-turn dialogue', 'Custom persona & knowledge base', 'WhatsApp + web + API', 'Handoff to human agent'],
    },
  },
  {
    label: 'Automation',
    content: {
      title: 'Your AI workforce',
      description: 'Automate complex, multi-step business processes with AI agents that read, reason, and act.',
      bullets: ['Invoice & document parsing', 'Data extraction & classification', 'Conditional workflow logic', 'CRM/ERP push integrations'],
    },
  },
  {
    label: 'ML Models',
    content: {
      title: 'AI trained on your world',
      description: 'We fine-tune and train on your domain data so accuracy is specific to your business.',
      bullets: ['LLM fine-tuning (GPT, Llama, Mistral)', 'Custom image classifiers', 'Anomaly detection models', 'Continuous retraining pipelines'],
    },
  },
  {
    label: 'Analytics',
    content: {
      title: 'See exactly how your AI is performing',
      description: 'Real-time dashboards for accuracy, latency, conversation quality, and automation success rates.',
      bullets: ['Conversation quality scores', 'Automation success/failure rates', 'Model drift detection', 'Custom KPI dashboards'],
    },
  },
  {
    label: 'Integrations',
    content: {
      title: 'Fits into what you already use',
      description: 'Connect your AI to your existing stack in one click. No re-architecting required.',
      bullets: ['WhatsApp Business API', 'Salesforce, HubSpot, Zoho', 'AWS, GCP, Azure hosting', 'Slack, Teams, Telegram'],
    },
  },
]

const integrations = [
  'OpenAI', 'Anthropic', 'Google Gemini', 'Meta Llama', 'Hugging Face',
  'WhatsApp', 'Salesforce', 'HubSpot', 'AWS', 'Azure',
  'PostgreSQL', 'MongoDB', 'Pinecone', 'Weaviate', 'LangChain',
  'Zapier', 'Make', 'Slack', 'Twilio', 'Razorpay',
]

export function Product() {
  const [activeTab, setActiveTab] = useState(0)
  const [leadOpen, setLeadOpen] = useState(false)

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black dot-grid overflow-hidden pt-24">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/40 text-sm uppercase tracking-widest mb-4"
          >
            AI Solutions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold text-5xl md:text-7xl text-white mb-6"
          >
            AI Solutions. Built for India.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Three core capabilities, one unified AI team. Built from the ground up for Indian businesses.
          </motion.p>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.name} variants={staggerItem}>
              <GlassCard className="h-full relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${product.accent}`} />
                <product.icon className="w-8 h-8 text-white/60 mb-4" />
                <h3 className="font-display font-bold text-xl text-white mb-2">{product.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-white/60 text-sm">
                      <Check size={14} className="text-white/30 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="text-white/40 hover:text-white text-sm flex items-center gap-1 transition-colors">
                  Learn more <ArrowRight size={14} />
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Interactive feature breakdown */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-12"
        >
          Every AI capability you need
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tab list */}
          <div className="relative space-y-1">
            {featureTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                  activeTab === i ? 'bg-white text-black font-medium' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard hover={false}>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">
                    {featureTabs[activeTab].content.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {featureTabs[activeTab].content.description}
                  </p>
                  <ul className="space-y-3">
                    {featureTabs[activeTab].content.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 text-white/70 text-sm">
                        <Check size={16} className="text-white/30 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Integration marquee */}
      <section className="py-24 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-2xl text-white text-center mb-10 px-6"
        >
          Works with your entire stack
        </motion.h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-marquee" style={{ width: 'max-content' }}>
            {[...integrations, ...integrations].map((name, i) => (
              <div key={i} className="glass-card px-6 py-3 flex-shrink-0">
                <span className="text-white/50 text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-4xl text-white mb-4">
            Start your AI journey today
          </h2>
          <p className="text-white/50 mb-8">Free discovery call. No obligations.</p>
          <AnimatedButton size="lg" onClick={() => setLeadOpen(true)}>
            Book a Free Call <ArrowRight size={18} />
          </AnimatedButton>
        </motion.div>
      </section>

      <Footer />
      <LeadModal open={leadOpen} onOpenChange={setLeadOpen} />
    </motion.div>
  )
}
