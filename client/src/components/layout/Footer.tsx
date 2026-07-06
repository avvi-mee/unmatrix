import { Link } from 'react-router-dom'
import { Instagram, Linkedin } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Security', 'Status'],
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                <div className="w-2.5 h-2.5 bg-white rounded-sm" />
                <div className="w-2.5 h-2.5 bg-white/40 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-white/40 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-white rounded-sm" />
              </div>
              <span className="font-display font-bold text-lg text-white">Unmatrix</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-2">Build Beyond the System.</p>
            <p className="text-white/25 text-xs mb-6">Pune, Maharashtra, India</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/avvi.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/avvimee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-medium mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-white/40 hover:text-white/70 text-sm transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 text-center">
          <p className="text-white/30 text-sm">
            © 2025 Unmatrix. All rights reserved. ·{' '}
            <a href="mailto:founder@unmatrix.in" className="hover:text-white/50 transition-colors">
              founder@unmatrix.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
