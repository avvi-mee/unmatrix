import { motion } from 'framer-motion'
import { GlassCard } from '@/components/shared/GlassCard'
import { staggerContainer, staggerItem } from '@/hooks/useAnimations'

const barHeights = [40, 70, 55, 85, 60, 90, 45, 75, 80, 65]

function FakeDashboard() {
  return (
    <div className="glass-card overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        <span className="ml-4 text-white/20 text-xs">unmatrix.app / ai-console</span>
      </div>

      <div className="flex">
        {/* Mini sidebar */}
        <div className="hidden sm:flex flex-col gap-2 p-3 border-r border-white/[0.06] w-32">
          {['Overview', 'Chatbots', 'Automations', 'Models', 'Analytics'].map((item) => (
            <div key={item} className={`px-2 py-1.5 rounded text-xs ${item === 'Overview' ? 'bg-white/10 text-white' : 'text-white/30'}`}>
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Active Bots', value: '12' },
              { label: 'Chats Today', value: '4,821' },
              { label: 'Automation Runs', value: '18.3K' },
              { label: 'Accuracy', value: '96.4%' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-3">
                <p className="text-white/30 text-xs mb-1">{stat.label}</p>
                <p className="text-white font-display font-bold text-lg">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="glass-card p-3 mb-4">
            <p className="text-white/40 text-xs mb-3">Conversations Handled</p>
            <div className="flex items-end gap-1.5 h-16">
              {barHeights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex-1 bg-white/20 rounded-t hover:bg-white/40 transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="space-y-2">
            {[
              { name: 'support-bot-v2', status: 'Live', env: 'production' },
              { name: 'invoice-parser', status: 'Training', env: 'staging' },
              { name: 'vision-quality', status: 'Live', env: 'production' },
            ].map((row) => (
              <div key={row.name} className="flex items-center justify-between py-1.5">
                <span className="text-white/60 text-xs font-mono">{row.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  row.status === 'Live' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductPreview() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Product</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
          Your AI. Fully managed.
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          A command center built for AI products in production.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Main dashboard */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <FakeDashboard />
        </motion.div>

        {/* Side cards */}
        <div className="flex flex-col gap-4">
          <motion.div variants={staggerItem}>
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
              <p className="text-white/40 text-xs mb-1">Deploy AI in minutes</p>
              <p className="font-display font-bold text-white text-lg mb-2">$ unmatrix deploy --model gpt4o</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs">↳ Model live · 142ms avg response</span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
              <p className="text-white/40 text-xs mb-1">Fine-tuned on your data</p>
              <p className="font-display font-bold text-white mb-1">GPT-4o · Claude 3.5 · Llama 3</p>
              <p className="text-white/40 text-xs">Your data. Your model. Your edge.</p>
            </GlassCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/50 to-cyan-500/50" />
              <p className="text-white/40 text-xs mb-1">Accuracy metrics</p>
              {/* Sparkline */}
              <svg viewBox="0 0 100 30" className="w-full h-8 mb-1">
                <polyline
                  points="0,25 15,20 30,22 45,12 60,15 75,8 90,5 100,3"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-emerald-400 text-xs">↑ 3.2% accuracy this week</p>
            </GlassCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-amber-500/50 to-orange-500/50" />
              <p className="text-white/40 text-xs mb-1">Reliability</p>
              <p className="font-display font-bold text-white text-2xl">99.9%</p>
              <p className="text-white/40 text-xs">AI uptime last 90 days</p>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
