'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Waves, Plane, Anchor, Satellite, Cloud, Server,
  Radio, Eye, Navigation, Brain, Shield, Zap, Hexagon
} from 'lucide-react'

const ecosystemNodes = [
  {
    id: 'satellite',
    icon: Satellite,
    label: 'SATCOM Link',
    position: { x: '50%', y: '10%' },
    color: 'text-purple-400',
    description: 'Global satellite communication for beyond line-of-sight operations',
  },
  {
    id: 'cloud',
    icon: Cloud,
    label: 'Cloud C2',
    position: { x: '85%', y: '30%' },
    color: 'text-blue-400',
    description: 'Secure cloud-based command and control infrastructure',
  },
  {
    id: 'uav',
    icon: Plane,
    label: 'UAV Swarm',
    position: { x: '20%', y: '30%' },
    color: 'text-cyan-400',
    description: 'Aerial surveillance and reconnaissance platform',
  },
  {
    id: 'usv',
    icon: Waves,
    label: 'USV Fleet',
    position: { x: '50%', y: '50%' },
    color: 'text-cyan-400',
    description: 'Surface vessel command node and mobile operations center',
  },
  {
    id: 'rov',
    icon: Anchor,
    label: 'ROV System',
    position: { x: '50%', y: '80%' },
    color: 'text-yellow-400',
    description: 'Underwater inspection and intervention capability',
  },
  {
    id: 'gcs',
    icon: Server,
    label: 'Ground Control',
    position: { x: '15%', y: '70%' },
    color: 'text-green-400',
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
    title: 'AI Decision Core',
    description: 'Distributed neural networks for autonomous mission execution.',
  },
  {
    icon: Radio,
    title: 'Multi-Link Mesh',
    description: 'Self-healing encrypted communication across all domains.',
  },
  {
    icon: Eye,
    title: 'Omni-Fusion',
    description: '360° situational awareness combining sonar, radar, and lidar.',
  },
  {
    icon: Navigation,
    title: 'Swarm Nav',
    description: 'Synchronized formation control with collision avoidance.',
  },
  {
    icon: Shield,
    title: 'Cyber Defense',
    description: 'Quantum-resistant encryption and active intrusion countermeasures.',
  },
  {
    icon: Zap,
    title: 'Hyper-Response',
    description: 'Microsecond latency for critical tactical maneuvers.',
  },
]

export default function AutonomousEcosystem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <section className="relative py-32 overflow-hidden bg-navy-950">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">HIVE MIND</span>
          </h2>
          <p className="font-body text-xl text-slate-400 max-w-2xl mx-auto">
            A unified battle-space network where every node thinks, communicates, and acts as one.
          </p>
        </motion.div>

        {/* 3D Holographic Map Container */}
        <div ref={ref} className="relative h-[600px] mb-32 perspective-1000">
          {/* Tilted Plane */}
          <motion.div
            initial={{ rotateX: 45, scale: 0.8, opacity: 0 }}
            animate={isInView ? { rotateX: 25, scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-full transform-style-3d bg-navy-900/20 border border-cyan-500/20 rounded-full shadow-[0_0_100px_rgba(0,240,255,0.1)] backdrop-blur-sm overflow-hidden"
          >
            {/* Radar Scan Effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,240,255,0.1)_60deg,transparent_60deg)] animate-[spin_4s_linear_infinite]" />
            </div>

            {/* Concentric Rings */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10"
                style={{ width: `${i * 30}%`, height: `${i * 30}%` }}
              />
            ))}

            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, index) => {
                const fromNode = ecosystemNodes.find((n) => n.id === conn.from)
                const toNode = ecosystemNodes.find((n) => n.id === conn.to)
                if (!fromNode || !toNode) return null

                return (
                  <g key={`${conn.from}-${conn.to}`}>
                    {/* Base Line */}
                    <motion.line
                      x1={fromNode.position.x}
                      y1={fromNode.position.y}
                      x2={toNode.position.x}
                      y2={toNode.position.y}
                      stroke="url(#connectionGradient)"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />

                    {/* Moving Data Packet */}
                    <motion.circle
                      r="3"
                      fill="#00F0FF"
                      initial={{ cx: fromNode.position.x, cy: fromNode.position.y, opacity: 0 }}
                      animate={{
                        cx: [fromNode.position.x, toNode.position.x],
                        cy: [fromNode.position.y, toNode.position.y],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                      }}
                    />

                    {/* Flowing Dash Animation */}
                    <motion.line
                      x1={fromNode.position.x}
                      y1={fromNode.position.y}
                      x2={toNode.position.x}
                      y2={toNode.position.y}
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      strokeDasharray="4,8"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 0.6 } : {}}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </motion.line>
                  </g>
                )
              })}
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="#0077BE" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            {ecosystemNodes.map((node, index) => {
              const Icon = node.icon
              const isHovered = hoveredNode === node.id

              return (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{ left: node.position.x, top: node.position.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    {/* Pulse Effect */}
                    <div className={`absolute inset-0 -m-4 rounded-full bg-cyan-400/20 blur-xl transition-all duration-300 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />

                    {/* Icon Circle */}
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${isHovered ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.5)]' : 'bg-navy-900/80 border-cyan-500/30'}`}>
                      <Icon className={`w-5 h-5 transition-colors ${isHovered ? 'text-white' : node.color}`} />
                    </div>

                    {/* Label */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 transform-none' : 'opacity-60 translate-y-1'}`}>
                      <span className="font-mono text-xs font-bold text-cyan-300 bg-navy-900/80 px-2 py-1 rounded border border-cyan-500/30">
                        {node.label}
                      </span>
                    </div>

                    {/* Description Tooltip */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-3 bg-navy-800/90 backdrop-blur-md border border-cyan-500/50 rounded-lg text-center z-50"
                      >
                        <p className="text-xs text-cyan-100">{node.description}</p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-navy-800 border-r border-b border-cyan-500/50" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Hexagon Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full bg-navy-900/50 border border-white/5 hover:border-cyan-500/50 p-8 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-2">
                  {/* Hexagon Icon Background */}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Hexagon className="w-24 h-24 text-cyan-500" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>

                    <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="font-body text-slate-400 group-hover:text-slate-300 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  {/* Tech Corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
