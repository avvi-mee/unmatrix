import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bot, Activity, Clock, IndianRupee } from 'lucide-react'

const stats = [
  {
    index: '01',
    icon: Bot,
    value: 200,
    display: '200+',
    label: 'AI Models Deployed',
    caption: 'chatbots to fine-tuned LLMs.',
    fillWidth: 0.72,
    delay: 0.2,
  },
  {
    index: '02',
    icon: Activity,
    value: 99.9,
    display: '99.9%',
    isDecimal: true,
    label: 'System Uptime',
    caption: 'monitored across all deployments.',
    fillWidth: 1.0,
    delay: 0.38,
  },
  {
    index: '03',
    icon: Clock,
    value: 72,
    display: '72hrs',
    label: 'Avg. First Prototype',
    caption: 'from brief to working demo.',
    fillWidth: 0.85,
    delay: 0.56,
  },
  {
    index: '04',
    icon: IndianRupee,
    value: 0,
    display: '₹0',
    label: 'Consultation Cost',
    caption: 'book a free discovery call.',
    fillWidth: 1.0,
    delay: 0.74,
  },
]

function useCountUp(target: number, isDecimal: boolean, active: boolean) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const duration = 1870

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      setCount(isDecimal ? Math.round(current * 100) / 100 : Math.floor(current))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [active, target, isDecimal])

  return count
}

function StatCell({
  index,
  icon: Icon,
  value,
  display,
  isDecimal,
  label,
  caption,
  fillWidth,
  delay,
  isLast,
}: typeof stats[0] & { isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, !!isDecimal, isInView)

  const formattedCount = isDecimal
    ? count.toFixed(2) + '%'
    : display.startsWith('₹')
    ? '₹' + count.toLocaleString('en-IN')
    : display.endsWith('hrs')
    ? count + 'hrs'
    : display.endsWith('ms')
    ? count + 'ms'
    : count.toLocaleString('en-IN') + (display.endsWith('+') ? '+' : '')

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        borderRight: !isLast ? '1px solid rgba(255,255,255,0.06)' : undefined,
        transition: 'background 0.3s',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.016)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '' }}
    >
      <div style={{ padding: '48px 36px 40px' }}>
        {/* Index + icon row */}
        <div className="flex items-center justify-between mb-6">
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
            {index}
          </span>
          <div
            style={{
              width: 32,
              height: 32,
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
          </div>
        </div>

        {/* Number */}
        <div
          className="gradient-text"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
            letterSpacing: '-0.035em',
            marginBottom: 12,
            lineHeight: 1,
          }}
        >
          {isInView ? formattedCount : (display.startsWith('₹') ? '₹0' : '0')}
        </div>

        {/* Label */}
        <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.78)', marginBottom: 6 }}>
          {label}
        </div>

        {/* Caption */}
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.30)', fontStyle: 'italic', marginBottom: 24 }}>
          {caption}
        </div>

        {/* Progress bar */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', width: '100%' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: fillWidth } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: '100%',
              background: 'rgba(255,255,255,0.4)',
              transformOrigin: 'left',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function Stats() {
  return (
    <section className="border-y border-white/[0.06]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <p className="text-white/40 text-sm uppercase tracking-widest mb-4">By the numbers</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
          <span className="text-white">Results that speak</span>
          <br />
          <span className="shimmer-text">for themselves.</span>
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <StatCell key={stat.index} {...stat} isLast={i === stats.length - 1} />
        ))}
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="max-w-7xl mx-auto px-6"
          style={{
            padding: '32px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', fontStyle: 'italic' }}>
            The AI partner quietly powering the next generation of Indian businesses.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
            SOC2 Compliant · GDPR Ready · ISO Certified
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > div:nth-child(3) {
            border-right: 1px solid rgba(255,255,255,0.06) !important;
          }
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
        }
        @media (max-width: 479px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
          }
          .stats-grid > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  )
}
