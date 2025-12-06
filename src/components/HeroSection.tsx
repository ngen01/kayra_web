'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowDown, Shield, Cpu, Radio, Waves, Plane, Anchor } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import WebGL components to avoid SSR issues
const WebGLBackground = dynamic(() => import('./WebGLBackground'), { ssr: false })
const DomainVisualizer = dynamic(() => import('./DomainVisualizer'), { ssr: false })

const platforms = [
  { id: 'usv', name: 'USV', fullName: 'Unmanned Surface Vehicle', icon: Waves },
  { id: 'uav', name: 'UAV', fullName: 'Unmanned Aerial Vehicle', icon: Plane },
  { id: 'rov', name: 'ROV', fullName: 'Remotely Operated Vehicle', icon: Anchor },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePlatform, setActivePlatform] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth fade out of the hero content as you scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* 3D Background */}
      <WebGLBackground className="pointer-events-none" activePlatform={activePlatform} />

      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-[#050A14]/50 z-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <motion.div
            style={{ opacity }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-DEFAULT animate-pulse" />
              <span className="font-body text-sm text-metallic-DEFAULT">
                Full Spectrum Autonomous Systems
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Autonomous</span>
              <br />
              <span className="text-gradient glow-text">Dominance</span>
              <br />
              <span className="text-white">Everywhere</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-lg text-metallic-DEFAULT max-w-xl leading-relaxed"
            >
              Next-generation unmanned systems for sea, air, and underwater operations.
              USV, UAV, and ROV platforms engineered for precision, endurance, and
              AI-powered intelligence.
            </motion.p>

            {/* Platform selector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex gap-3"
            >
              {platforms.map((platform, index) => {
                const Icon = platform.icon
                return (
                  <motion.button
                    key={platform.id}
                    onClick={() => setActivePlatform(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 ${activePlatform === index
                      ? 'bg-gradient-to-r from-cyan-DEFAULT to-ocean-DEFAULT text-navy-DEFAULT glow-cyan'
                      : 'glass border border-ocean-DEFAULT/30 text-metallic-DEFAULT hover:border-cyan-DEFAULT/50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-heading font-semibold">{platform.name}</span>
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
                { icon: Shield, text: 'Military Grade' },
                { icon: Cpu, text: 'Level 4+ Autonomy' },
                { icon: Radio, text: 'Multi-Domain C2' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-sm border border-ocean-DEFAULT/30"
                >
                  <item.icon className="w-4 h-4 text-cyan-DEFAULT" />
                  <span className="font-body text-sm text-white">{item.text}</span>
                </div>
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 font-heading text-sm font-semibold tracking-wider text-navy-DEFAULT bg-gradient-to-r from-cyan-DEFAULT to-ocean-DEFAULT rounded-sm glow-cyan"
              >
                Explore All Platforms
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 font-heading text-sm font-semibold tracking-wider text-cyan-DEFAULT border border-cyan-DEFAULT/50 rounded-sm hover:bg-cyan-DEFAULT/10 transition-colors"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right content - 3D Globe Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ scale }}
            className="hidden lg:block relative h-[600px] w-full"
          >
            <DomainVisualizer activePlatform={activePlatform} />

            {/* Platform labels overlay */}
            <div className="absolute top-4 right-4 space-y-2 pointer-events-none">
              <div className={`flex items-center gap-2 text-xs font-heading transition-colors duration-300 ${activePlatform === 1 ? 'text-cyan-DEFAULT' : 'text-metallic-DEFAULT'}`}>
                <span className={`w-2 h-2 rounded-full ${activePlatform === 1 ? 'bg-cyan-DEFAULT animate-pulse' : 'bg-metallic-DEFAULT/50'}`} />
                AIR DOMAIN
              </div>
              <div className={`flex items-center gap-2 text-xs font-heading transition-colors duration-300 ${activePlatform === 0 ? 'text-ocean-DEFAULT' : 'text-metallic-DEFAULT'}`}>
                <span className={`w-2 h-2 rounded-full ${activePlatform === 0 ? 'bg-ocean-DEFAULT animate-pulse' : 'bg-metallic-DEFAULT/50'}`} />
                SURFACE DOMAIN
              </div>
              <div className={`flex items-center gap-2 text-xs font-heading transition-colors duration-300 ${activePlatform === 2 ? 'text-yellow-500' : 'text-metallic-DEFAULT'}`}>
                <span className={`w-2 h-2 rounded-full ${activePlatform === 2 ? 'bg-yellow-500 animate-pulse' : 'bg-metallic-DEFAULT/50'}`} />
                SUBSEA DOMAIN
              </div>
            </div>
          </motion.div>
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
            <span className="font-body text-xs text-metallic-DEFAULT tracking-widest uppercase">
              Scroll to Explore
            </span>
            <ArrowDown className="w-5 h-5 text-cyan-DEFAULT" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
