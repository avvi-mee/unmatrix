import type { LucideIcon } from 'lucide-react'

export interface ContactForm {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export interface LeadForm {
  name: string
  phone: string
  email: string
  requirement: string
  message?: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  initials: string
  color: string
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export interface PricingPlan {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
  ctaHref?: string
  highlighted: boolean
}
