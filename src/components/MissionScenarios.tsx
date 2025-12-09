'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Search, Shield } from 'lucide-react'

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return isMobile
}

const scenarios = [
  {
    id: 'search',
    title: 'Deep Search & Rescue',
    description: 'AI-driven path planning optimizes coverage area while minimizing energy consumption. Real-time object detection identifies targets in complex environments.',
    icon: Search,
    features: ['A* Path Optimization', 'Multi-Agent Coordination', 'Real-time Object Detection']
  },
  {
    id: 'defense',
    title: 'Perimeter Defense',
    description: 'Autonomous patrol patterns with anomaly detection. Swarm intelligence enables coordinated interception of unauthorized vessels.',
    icon: Shield,
    features: ['Swarm Interception', 'Anomaly Detection', '24/7 Autonomous Patrol']
  },
  {
    id: 'survey',
    title: 'Hydrographic Survey',
    description: 'High-precision bathymetric mapping using multi-beam sonar. Automated data processing generates 3D terrain models in real-time.',
    icon: Target,
    features: ['Sub-millimeter Precision', 'Real-time 3D Mapping', 'Automated Data Processing']
  }
]

export default function MissionScenarios() {
  const [activeScenario, setActiveScenario] = useState(0)
  const isMobile = useIsMobile()

  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ocean-500 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Mission <span className="text-gradient">Intelligence</span>
          </motion.h2>
          <p className="font-body text-metallic-DEFAULT max-w-2xl mx-auto">
            Advanced AI algorithms adapt to changing environments and mission parameters in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Scenario List */}
          <div className="space-y-6">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon
              const isActive = activeScenario === index

              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveScenario(index)}
                  className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border ${isActive
                    ? 'bg-navy-800/80 border-cyan-DEFAULT/50 shadow-[0_0_30px_rgba(0,240,255,0.1)]'
                    : 'bg-navy-800/30 border-white/5 hover:bg-navy-800/50 hover:border-white/10'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${isActive ? 'bg-cyan-DEFAULT/20 text-cyan-DEFAULT' : 'bg-navy-700 text-metallic-dark'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-heading text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-metallic-DEFAULT'}`}>
                        {scenario.title}
                      </h3>
                      <p className="font-body text-sm text-metallic-dark mb-4">
                        {scenario.description}
                      </p>

                      <motion.div
                        initial={false}
                        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 pt-2">
                          {scenario.features.map((feature) => (
                            <span key={feature} className="text-xs font-mono px-2 py-1 rounded bg-navy-900 text-cyan-DEFAULT border border-cyan-DEFAULT/20">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right: Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-navy-950"
          >
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />

            {/* Video Visualization - hidden on mobile for performance */}
            <div className="absolute inset-0">
              {!isMobile ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/mission-intro.mp4" type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-ocean-500/20" />
              )}
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30" />
            </div>

            {/* UI Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-950 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-xs text-green-500">SYSTEM ACTIVE</span>
                </div>
                <div className="font-mono text-xs text-metallic-dark">
                  COORD: 34.0522° N, 118.2437° W
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
