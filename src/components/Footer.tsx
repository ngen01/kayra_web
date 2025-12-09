'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Instagram, Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { useState } from 'react'

// Custom North Star icon - matching KAYRA background logo style
function NorthStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      {/* 4-pointed star with long elegant tapered points like background */}
      <path d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z" fill="currentColor" />
    </svg>
  )
}

const footerLinks = {
  technology: [
    { name: 'AI Navigation', href: '#' },
    { name: 'Propulsion Systems', href: '#' },
    { name: 'Sensor Suite', href: '#' },
    { name: 'Communication', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'News & Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Technical Specs', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Support', href: '#' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer id="contact" className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-navy-700" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-DEFAULT/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12 mb-16 border border-ocean-DEFAULT/20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                Lead the <span className="text-gradient">Autonomous Revolution</span>
              </h3>
              <p className="font-body text-metallic-DEFAULT">
                Subscribe to receive updates on our latest innovations, industry
                insights, and exclusive technical content.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 bg-navy-DEFAULT/50 border border-ocean-DEFAULT/30 rounded-lg font-body text-white placeholder:text-metallic-dark focus:outline-none focus:border-cyan-DEFAULT/50 transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-gradient-to-r from-cyan-DEFAULT to-ocean-DEFAULT rounded-lg font-heading font-semibold text-navy-DEFAULT flex items-center gap-2"
                >
                  {isSubscribed ? (
                    'Subscribed!'
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Logo and description */}
          <div>
            <motion.a
              href="#"
              className="flex items-center gap-3 group mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold tracking-wider text-white group-hover:text-cyan-DEFAULT transition-colors">
                  KAYRA
                </span>
                <span className="font-heading text-[10px] tracking-[0.3em] text-metallic-DEFAULT uppercase">
                  Technology
                </span>
              </div>
            </motion.a>
            <p className="font-body text-sm text-metallic-DEFAULT mb-6 max-w-xs">
              Pioneering the future of maritime autonomy with cutting-edge
              unmanned surface vehicle technology.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@kayratechnology.com"
                className="flex items-center gap-3 text-sm text-metallic-DEFAULT hover:text-cyan-DEFAULT transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@kayratechnology.com
              </a>
              <div className="flex items-center gap-3 text-sm text-metallic-DEFAULT">
                <MapPin className="w-4 h-4" />
                Istanbul, ITU Teknopark
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="md:text-right">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-3 md:justify-end">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'X (Twitter)' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg glass border border-ocean-DEFAULT/30 flex items-center justify-center text-metallic-DEFAULT hover:text-cyan-DEFAULT hover:border-cyan-DEFAULT/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ocean-DEFAULT/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-metallic-dark">
              &copy; 2025 Kayra Technology. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-body text-sm text-metallic-dark hover:text-cyan-DEFAULT transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-body text-sm text-metallic-dark hover:text-cyan-DEFAULT transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="font-body text-sm text-metallic-dark hover:text-cyan-DEFAULT transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-DEFAULT via-ocean-DEFAULT to-cyan-DEFAULT opacity-50" />
      </div>
    </footer>
  )
}
