'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

// Custom North Star icon matching KAYRA logo
function NorthStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      {/* Vertical line */}
      <path d="M12 0 L12 24" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Horizontal line */}
      <path d="M0 12 L24 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Center diamond */}
      <path d="M12 2 L14 12 L12 22 L10 12 Z" fill="currentColor" />
      <path d="M2 12 L12 10 L22 12 L12 14 Z" fill="currentColor" />
    </svg>
  )
}

const navLinks = [
  { name: 'Technology', href: '#technology' },
  { name: 'Fleet', href: '#fleet' },
  { name: 'R&D', href: '#rd' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <NorthStar className="w-8 h-8 text-white group-hover:text-cyan-DEFAULT transition-colors" />
              <div className="absolute inset-0 bg-cyan-DEFAULT/20 rounded-full blur-lg group-hover:bg-cyan-DEFAULT/40 transition-all" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                KAYRA
              </span>
              <span className="font-heading text-[10px] tracking-[0.3em] text-metallic-DEFAULT uppercase">
                Consulting
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="relative font-body text-sm text-metallic-DEFAULT hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-DEFAULT to-ocean-DEFAULT group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block relative px-6 py-2.5 font-heading text-sm font-semibold tracking-wider text-cyan-DEFAULT border border-cyan-DEFAULT/50 rounded-sm overflow-hidden group"
          >
            <span className="relative z-10 group-hover:text-navy-DEFAULT transition-colors duration-300">
              Request Technical Specs
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-DEFAULT to-cyan-DEFAULT/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-cyan" />
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-metallic-DEFAULT hover:text-cyan-DEFAULT transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-4 mx-4 rounded-lg overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-body text-metallic-DEFAULT hover:text-cyan-DEFAULT transition-colors py-2 border-b border-ocean-DEFAULT/20"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full mt-4 px-6 py-3 font-heading text-sm font-semibold tracking-wider text-navy-DEFAULT bg-gradient-to-r from-cyan-DEFAULT to-ocean-DEFAULT rounded-sm"
              >
                Request Technical Specs
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
