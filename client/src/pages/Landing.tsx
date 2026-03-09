import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { ProductPreview } from '@/components/sections/ProductPreview'
import { Features } from '@/components/sections/Features'
import { Stats } from '@/components/sections/Stats'
import { Testimonials } from '@/components/sections/Testimonials'
import { Pricing } from '@/components/sections/Pricing'
import { Footer } from '@/components/layout/Footer'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { LeadModal } from '@/components/shared/LeadModal'
import { pageTransition } from '@/hooks/useAnimations'

export function Landing() {
  const [leadOpen, setLeadOpen] = useState(false)

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero onLeadOpen={() => setLeadOpen(true)} />
      <ProductPreview />
      <Features />
      <Stats />
      <Testimonials />
      <Pricing onLeadOpen={() => setLeadOpen(true)} />

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-6">
              Ready to build beyond?
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of businesses who've already broken free from the system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton size="lg" onClick={() => setLeadOpen(true)}>
                Start Building Free
                <ArrowRight size={18} />
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="lg" onClick={() => setLeadOpen(true)}>
                Talk to Sales
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LeadModal open={leadOpen} onOpenChange={setLeadOpen} />
    </motion.div>
  )
}
