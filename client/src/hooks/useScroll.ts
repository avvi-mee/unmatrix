import { useScroll as useFramerScroll } from 'framer-motion'
import { useState, useEffect } from 'react'

export function useScroll() {
  const { scrollY, scrollYProgress } = useFramerScroll()
  return { scrollY, scrollYProgress }
}

export function useScrolledPast(threshold: number): boolean {
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolledPast
}
