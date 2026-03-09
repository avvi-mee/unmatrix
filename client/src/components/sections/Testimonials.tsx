import { GlassCard } from '@/components/shared/GlassCard'
import { motion } from 'framer-motion'
import type { Testimonial } from '@/types'

const testimonials: Testimonial[] = [
  { id: 1, name: 'Rahul Mehta', role: 'Founder', company: 'PaySync India', quote: 'Unmatrix built us a customer support chatbot in 3 weeks. It now handles 80% of our queries automatically. Our support costs dropped by 60%.', initials: 'RM', color: 'from-purple-500 to-blue-500' },
  { id: 2, name: 'Ananya Krishnan', role: 'CTO', company: 'Agritech.io', quote: 'The LLM integration they built for our agronomist assistant is genuinely impressive. GPT-4 fine-tuned on our crop data. Farmers love it.', initials: 'AK', color: 'from-emerald-500 to-cyan-500' },
  { id: 3, name: 'Vikram Nair', role: 'CEO', company: 'LegalEase', quote: 'Our document automation AI went live in 6 weeks. What used to take a paralegal 2 hours now takes 30 seconds.', initials: 'VN', color: 'from-orange-500 to-pink-500' },
  { id: 4, name: 'Shreya Joshi', role: 'Head of Product', company: 'HealthBridge', quote: 'We had zero AI experience. Unmatrix handled strategy, development, and deployment. We now have a working AI triage system in production.', initials: 'SJ', color: 'from-blue-500 to-indigo-500' },
  { id: 5, name: 'Arjun Patel', role: 'Co-founder', company: 'LogiTrack', quote: 'The computer vision model they built for our warehouse is 97% accurate at detecting defects. We\'ve cut quality check time by 75%.', initials: 'AP', color: 'from-pink-500 to-rose-500' },
  { id: 6, name: 'Meera Rajan', role: 'VP Engineering', company: 'FinPilot', quote: 'Three AI features shipped in one quarter. Their team moves fast and actually understands fintech constraints.', initials: 'MR', color: 'from-amber-500 to-orange-500' },
  { id: 7, name: 'Rohan Sharma', role: 'Founder', company: 'EdAI', quote: 'The personalised tutoring AI they built is now used by 12,000 students. We couldn\'t have built this in-house.', initials: 'RS', color: 'from-teal-500 to-green-500' },
  { id: 8, name: 'Kavya Iyer', role: 'CEO', company: 'RetailSense', quote: 'Unmatrix delivered an AI demand-forecasting model that reduced our overstock by 40%. ROI in month 2.', initials: 'KI', color: 'from-violet-500 to-purple-500' },
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass-card p-6 min-w-[320px] max-w-[360px] flex-shrink-0">
      <p className="text-white/60 text-sm leading-relaxed mb-4">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
          {testimonial.initials}
        </div>
        <div>
          <p className="text-white text-sm font-medium">{testimonial.name}</p>
          <p className="text-white/40 text-xs">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 px-6"
      >
        <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Testimonials</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
          Loved by Indian builders
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Startups and SMBs across India trust Unmatrix to build their AI.
        </p>
      </motion.div>

      {/* Row 1 */}
      <div className="relative mb-4 overflow-hidden">
        <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Row 2 - reverse */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4 animate-marquee-reverse" style={{ width: 'max-content' }}>
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`row2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
