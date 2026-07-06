import { motion } from 'framer-motion'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'
import { GradientText } from '@/components/shared/GradientText'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { FloatingParticles } from '@/components/shared/FloatingParticles'

interface HeroProps {
  onLeadOpen?: () => void
}

const words = ['Build', 'Beyond', 'the', 'System.']
const gradientWords = ['the', 'System.']

const companies = ['Acme', 'Vercel', 'Linear', 'Stripe', 'Notion']

export function Hero({ onLeadOpen }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black dot-grid overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }}
      />

      <FloatingParticles />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          <span className="text-white/60 text-sm">Now live · AI solutions for 1,000+ Indian businesses</span>
        </motion.div>

        {/* Heading */}
        <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={gradientWords.includes(word) ? '' : 'text-white'}
            >
              {gradientWords.includes(word) ? (
                <GradientText>{word}</GradientText>
              ) : word}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We design, build and deploy AI solutions — intelligent chatbots, workflow automation,
          custom ML models — that give Indian startups an unfair advantage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <AnimatedButton size="lg" onClick={onLeadOpen} className="group">
            Start Building Free
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </AnimatedButton>
          <AnimatedButton variant="secondary" size="lg">
            <Play size={16} />
            Watch Demo
          </AnimatedButton>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-white/20 text-xs uppercase tracking-widest">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companies.map((company) => (
              <span
                key={company}
                className="text-white/20 font-display font-bold text-sm hover:text-white/40 transition-colors cursor-default"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 animate-bounce"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
