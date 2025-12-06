'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Waves, Plane, Anchor, Satellite, Cloud, Server,
  Radio, Eye, Navigation, Brain, Shield, Zap
} from 'lucide-react'

const ecosystemNodes = [
  {
    id: 'satellite',
    icon: Satellite,
    label: 'SATCOM Link',
    position: { x: '50%', y: '5%' },
    description: 'Global satellite communication for beyond line-of-sight operations',
  },
  {
    id: 'cloud',
    icon: Cloud,
    label: 'Cloud C2',
    position: { x: '85%', y: '20%' },
    description: 'Secure cloud-based command and control infrastructure',
  },
  {
    id: 'uav',
    icon: Plane,
    label: 'UAV Swarm',
    position: { x: '25%', y: '25%' },
    description: 'Aerial surveillance and reconnaissance platform',
  },
  {
    id: 'usv',
    icon: Waves,
    label: 'USV Fleet',
    position: { x: '50%', y: '50%' },
    description: 'Surface vessel command node and mobile operations center',
  },
  {
    id: 'rov',
    icon: Anchor,
    label: 'ROV System',
    position: { x: '50%', y: '85%' },
    description: 'Underwater inspection and intervention capability',
  },
  {
    id: 'gcs',
    icon: Server,
    label: 'Ground Control',
    position: { x: '15%', y: '60%' },
    description: 'Shore-based mission planning and monitoring station',
  },
]

const connections = [
  { from: 'satellite', to: 'usv' },
  { from: 'satellite', to: 'cloud' },
  { from: 'cloud', to: 'gcs' },
  { from: 'uav', to: 'usv' },
  { from: 'usv', to: 'rov' },
  { from: 'gcs', to: 'usv' },
  { from: 'uav', to: 'satellite' },
]

const capabilities = [
  {
    icon: Brain,
    title: 'AI-Powered Decision Making',
    description: 'Distributed artificial intelligence for autonomous mission execution and threat response.',
  },
  {
    icon: Radio,
    title: 'Multi-Domain Communication',
    description: 'Seamless data exchange across air, surface, and subsea platforms via encrypted links.',
  },
  {
    icon: Eye,
    title: 'Sensor Fusion',
    description: 'Integrated sensor data from all platforms for comprehensive situational awareness.',
  },
  {
    icon: Navigation,
    title: 'Coordinated Navigation',
    description: 'Synchronized movement and positioning for complex multi-platform operations.',
  },
  {
    icon: Shield,
    title: 'Cyber Resilience',
    description: 'Military-grade encryption and intrusion prevention across all systems.',
  },
  {
    icon: Zap,
    title: 'Real-Time Response',
    description: 'Sub-second latency for critical command and control operations.',
  },
]

export default function AutonomousEcosystem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-DEFAULT via-dark to-navy-DEFAULT" />
      <div className="absolute inset-0 bg-topo-pattern opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 font-heading text-sm tracking-widest text-cyan-DEFAULT border border-cyan-DEFAULT/30 rounded-full">
            INTEGRATED OPERATIONS
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Autonomous <span className="text-gradient">Ecosystem</span>
          </h2>
          <p className="font-body text-metallic-DEFAULT max-w-2xl mx-auto">
            A fully integrated multi-domain autonomous system where USV, UAV, and ROV
            platforms operate as a unified intelligent network.
          </p>
        </motion.div>

        {/* Ecosystem visualization */}
        <div ref={ref} className="relative h-[500px] md:h-[600px] mb-16">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#0077BE" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Animated data flow lines */}
            {connections.map((conn, index) => {
              const fromNode = ecosystemNodes.find((n) => n.id === conn.from)
              const toNode = ecosystemNodes.find((n) => n.id === conn.to)
              if (!fromNode || !toNode) return null

              return (
                <motion.line
                  key={`${conn.from}-${conn.to}`}
                  x1={fromNode.position.x}
                  y1={fromNode.position.y}
                  x2={toNode.position.x}
                  y2={toNode.position.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-24"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </motion.line>
              )
            })}
          </svg>

          {/* Nodes */}
          {ecosystemNodes.map((node, index) => {
            const Icon = node.icon
            const isCenter = node.id === 'usv'

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-10 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative flex flex-col items-center ${
                    isCenter ? 'scale-125' : ''
                  }`}
                >
                  {/* Pulse ring for center node */}
                  {isCenter && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-24 h-24 rounded-full border-2 border-cyan-DEFAULT"
                    />
                  )}

                  {/* Node icon */}
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCenter
                        ? 'bg-gradient-to-br from-cyan-DEFAULT to-ocean-DEFAULT glow-cyan'
                        : 'glass border border-ocean-DEFAULT/50 group-hover:border-cyan-DEFAULT/80'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        isCenter ? 'text-navy-DEFAULT' : 'text-cyan-DEFAULT'
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <div className="mt-2 text-center">
                    <div className="font-heading text-xs font-semibold text-white whitespace-nowrap">
                      {node.label}
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="glass rounded-lg px-4 py-2 max-w-[200px] border border-cyan-DEFAULT/30">
                      <p className="font-body text-xs text-metallic-DEFAULT text-center">
                        {node.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}

          {/* Domain labels */}
          <div className="absolute top-[15%] left-4 glass-light rounded-lg px-3 py-1">
            <span className="font-heading text-xs text-cyan-DEFAULT tracking-widest">
              AIR DOMAIN
            </span>
          </div>
          <div className="absolute top-[45%] left-4 glass-light rounded-lg px-3 py-1">
            <span className="font-heading text-xs text-ocean-DEFAULT tracking-widest">
              SURFACE DOMAIN
            </span>
          </div>
          <div className="absolute top-[75%] left-4 glass-light rounded-lg px-3 py-1">
            <span className="font-heading text-xs text-yellow-500 tracking-widest">
              SUBSEA DOMAIN
            </span>
          </div>
        </div>

        {/* Capabilities grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {capabilities.map((cap, index) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-xl p-6 border border-ocean-DEFAULT/20 hover:border-cyan-DEFAULT/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-DEFAULT/20 to-ocean-DEFAULT/20 border border-cyan-DEFAULT/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-DEFAULT" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {cap.title}
                </h3>
                <p className="font-body text-sm text-metallic-DEFAULT">
                  {cap.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
