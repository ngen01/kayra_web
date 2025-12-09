'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowDown, Cpu, Sparkles, Bot, Brain, Zap } from 'lucide-react'
import Image from 'next/image'

const platforms = [
  { id: 'autonomous', name: 'Autonomous', fullName: 'Self-Driving Systems', icon: Bot },
  { id: 'ai', name: 'AI', fullName: 'Artificial Intelligence', icon: Brain },
  { id: 'robotics', name: 'Robotics', fullName: 'Industrial Robotics', icon: Cpu },
]

// Floating particles for magical effect
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Animated wave effect
function OceanWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <motion.path
          fill="url(#waveGradient)"
          fillOpacity="0.3"
          animate={{
            d: [
              "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,122.7C672,128,768,192,864,213.3C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0077BE" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <motion.path
          fill="url(#waveGradient2)"
          fillOpacity="0.2"
          animate={{
            d: [
              "M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,218.7C672,235,768,245,864,229.3C960,213,1056,171,1152,160C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <defs>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0077BE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#050A14" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Moon with glow
function Moon() {
  return (
    <motion.div
      className="absolute top-10 right-4 sm:top-20 sm:right-20 w-16 h-16 sm:w-32 sm:h-32"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <div className="relative w-full h-full">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-radial from-cyan-300/20 via-cyan-500/5 to-transparent rounded-full blur-3xl scale-[3]" />
        {/* Moon body */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 rounded-full shadow-[0_0_60px_rgba(255,255,255,0.3)]" />
        {/* Craters */}
        <div className="absolute top-4 left-6 w-4 h-4 bg-slate-300/50 rounded-full" />
        <div className="absolute top-12 right-8 w-6 h-6 bg-slate-300/40 rounded-full" />
        <div className="absolute bottom-8 left-10 w-3 h-3 bg-slate-300/30 rounded-full" />
      </div>
    </motion.div>
  )
}

// Liquid Glass Card
function LiquidGlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl" />
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border border-white/20" />
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePlatform, setActivePlatform] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image - Using Next.js Image for better quality */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="KAYRA Consulting Background"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/50 z-[1]" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30 z-[2]"
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Moon */}
      <Moon />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Ocean waves */}
      <OceanWaves />

      {/* Main content */}
      <motion.div
        style={{ opacity, y }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 pt-24"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <LiquidGlassCard className="inline-flex items-center gap-3 px-5 py-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="font-body text-sm font-semibold text-white">
                  Full Spectrum Autonomous Systems
                </span>
              </LiquidGlassCard>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              <span className="text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>Autonomous</span>
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Dominance
              </motion.span>
              <br />
              <span className="text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>Everywhere</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-base sm:text-xl font-semibold text-white max-w-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Next-generation autonomous systems powered by advanced AI and robotics.
              Ground, aerial, and swarm platforms engineered for precision, adaptability,
              and intelligent decision-making.
            </motion.p>

            {/* Platform selector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {platforms.map((platform, index) => {
                const Icon = platform.icon
                return (
                  <motion.button
                    key={platform.id}
                    onClick={() => setActivePlatform(index)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-4 rounded-xl transition-all duration-300 overflow-hidden ${activePlatform === index
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.3)]'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                  >
                    {activePlatform === index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10"
                        layoutId="activePlatform"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 relative z-10 ${activePlatform === index ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className={`font-heading text-xs sm:text-base font-semibold relative z-10 ${activePlatform === index ? 'text-white' : 'text-slate-300'}`}>
                      {platform.name}
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { icon: Brain, text: 'AI Powered' },
                { icon: Cpu, text: 'Level 4+ Autonomy' },
                { icon: Zap, text: 'Real-time Processing' },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                >
                  <item.icon className="w-4 h-4 text-cyan-400" />
                  <span className="font-body text-sm text-white/80">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,240,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 sm:px-8 py-3 sm:py-4 font-heading text-xs sm:text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative z-10">Explore All Platforms</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,240,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-8 py-3 sm:py-4 font-heading text-xs sm:text-sm font-semibold tracking-wider text-cyan-400 border-2 border-cyan-400/50 rounded-xl backdrop-blur-sm"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Right content - 3D Visualization */}

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-body text-xs text-slate-400 tracking-widest uppercase">
              Scroll to Explore
            </span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-2"
            >
              <motion.div
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
