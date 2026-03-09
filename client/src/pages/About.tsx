import { motion } from 'framer-motion'
import { Instagram, Linkedin } from 'lucide-react'
import { GlassCard } from '@/components/shared/GlassCard'
import { Footer } from '@/components/layout/Footer'
import { pageTransition, fadeInUp, staggerContainer, staggerItem } from '@/hooks/useAnimations'

const values = [
  {
    title: 'Radical Transparency',
    description: 'We share our roadmap, our metrics, and our mistakes publicly. No corporate speak.',
  },
  {
    title: 'Speed Over Perfection',
    description: 'We ship fast and iterate faster. Good enough today beats perfect tomorrow.',
  },
  {
    title: 'Developer First',
    description: "Every decision starts with one question: does this make developers' lives better?",
  },
]

const founders = [
  {
    name: 'Aviraj Patil',
    role: 'CEO & Co-founder',
    bio: 'Serial entrepreneur and full-stack architect from Pune. Built products used by millions. Passionate about making world-class developer infrastructure accessible to every Indian startup.',
    initials: 'AP',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    instagram: 'https://www.instagram.com/avvi.me/',
    linkedin: 'https://www.linkedin.com/in/avvimee',
  },
  {
    name: 'Pratik Kapse',
    role: 'CTO & Co-founder',
    bio: 'Systems engineer and cloud infrastructure specialist. Expert in distributed systems and edge computing. Building the infra that makes deployment as simple as saving a file.',
    initials: 'PK',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    instagram: 'https://www.instagram.com/pratik.kapse.127/',
    linkedin: null,
  },
]

export function About() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black dot-grid overflow-hidden pt-24">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-white/40 text-sm uppercase tracking-widest mb-4"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-6xl text-white leading-tight"
          >
            We're building India's AI-first future
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.blockquote
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-2xl md:text-3xl text-white/90 italic leading-relaxed border-l-2 border-white/20 pl-8"
          >
            "The best tools are the ones that disappear — that let you focus on what only you can create."
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <p className="text-white/60 leading-relaxed">
              Unmatrix was born from a simple observation: Indian businesses were being left behind in
              the AI revolution — not because of capability, but because of access. World-class AI was
              either too expensive, too generic, or built by teams that didn't understand the Indian market.
            </p>
            <p className="text-white/60 leading-relaxed">
              We exist to change that. Our mission is to make sophisticated AI — custom chatbots,
              intelligent automation, production ML models — accessible to every Indian startup and SMB.
              We build AI that understands your business, your customers, and your language.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-white text-center mb-12"
        >
          The Founders
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {founders.map((founder) => (
            <motion.div key={founder.name} variants={staggerItem}>
              <GlassCard>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white mb-4"
                  style={{ background: founder.gradient }}
                >
                  {founder.initials}
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-1">{founder.name}</h3>
                <p className="text-white/40 text-sm mb-4">{founder.role}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{founder.bio}</p>
                <div className="flex items-center gap-3">
                  <a
                    href={founder.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    <Instagram size={18} />
                  </a>
                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/30 hover:text-white/60 transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-white text-center mb-12"
        >
          What we believe
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {values.map((value) => (
            <motion.div key={value.title} variants={staggerItem}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-white mb-3">{value.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Vision */}
      <section className="py-24 px-6 my-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 text-center"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              The future we're building toward
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {[
                { heading: 'Universal Developer Layer', body: 'A single platform that handles all infrastructure so teams focus exclusively on product.' },
                { heading: 'AI-Native by Default', body: 'Every tool, workflow, and integration built with AI at the core, not as an afterthought.' },
                { heading: 'Zero-Friction Deployment', body: 'From commit to global production in under 5 seconds. Every time, without exception.' },
              ].map((item) => (
                <div key={item.heading} className="text-left">
                  <h4 className="font-display font-bold text-white text-lg mb-2">{item.heading}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
