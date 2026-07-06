import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScroll } from '@/hooks/useScroll'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { LeadModal } from '@/components/shared/LeadModal'
import { staggerContainer, staggerItem } from '@/hooks/useAnimations'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/product' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
        <div className="w-2.5 h-2.5 bg-white rounded-sm" />
        <div className="w-2.5 h-2.5 bg-white/40 rounded-sm group-hover:bg-white/70 transition-colors" />
        <div className="w-2.5 h-2.5 bg-white/40 rounded-sm group-hover:bg-white/70 transition-colors" />
        <div className="w-2.5 h-2.5 bg-white rounded-sm" />
      </div>
      <span className="font-display font-bold text-lg text-white">Unmatrix</span>
    </Link>
  )
}

export function Navbar() {
  const { scrollY } = useScroll()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [leadOpen, setLeadOpen] = useState(false)
  const location = useLocation()

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.6])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.05])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: `rgba(0,0,0,${bgOpacity.get()})`,
          borderBottom: `1px solid rgba(255,255,255,${borderOpacity.get()})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <motion.li key={link.href} variants={staggerItem}>
                <Link
                  to={link.href}
                  className={`text-sm transition-colors ${
                    location.pathname === link.href
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <div className="hidden md:flex items-center gap-3">
            <AnimatedButton size="sm" onClick={() => setLeadOpen(true)}>
              Get Started
            </AnimatedButton>
          </div>

          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-50 flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-12">
              <Logo />
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <ul className="flex flex-col gap-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.href}
                    className="text-2xl font-display font-bold text-white/80 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <AnimatedButton
              onClick={() => { setMobileOpen(false); setLeadOpen(true) }}
              className="w-full justify-center"
            >
              Get Started
            </AnimatedButton>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadModal open={leadOpen} onOpenChange={setLeadOpen} />
    </>
  )
}
