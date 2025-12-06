'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { X, Camera, Radio, Settings, Cpu, Radar, Navigation } from 'lucide-react'

const hotspots = [
  {
    id: 'camera',
    icon: Camera,
    position: { x: '25%', y: '25%' },
    title: 'Multi-Spectrum Camera System',
    description:
      'Day/night capable EO/IR camera with 40x optical zoom and thermal imaging for target identification and surveillance.',
    specs: [
      { label: 'Resolution', value: '4K HDR' },
      { label: 'Zoom', value: '40x Optical' },
      { label: 'Range', value: '12km' },
    ],
  },
  {
    id: 'radar',
    icon: Radar,
    position: { x: '45%', y: '15%' },
    title: 'AESA Radar Array',
    description:
      'Active electronically scanned array radar for 360-degree surface and low-altitude air surveillance.',
    specs: [
      { label: 'Coverage', value: '360°' },
      { label: 'Range', value: '24nm' },
      { label: 'Tracking', value: '200+ targets' },
    ],
  },
  {
    id: 'satcom',
    icon: Radio,
    position: { x: '60%', y: '22%' },
    title: 'SATCOM Terminal',
    description:
      'Ku-band and X-band satellite communication for beyond line-of-sight command and control operations.',
    specs: [
      { label: 'Bandwidth', value: '10 Mbps' },
      { label: 'Encryption', value: 'AES-256' },
      { label: 'Coverage', value: 'Global' },
    ],
  },
  {
    id: 'navigation',
    icon: Navigation,
    position: { x: '35%', y: '40%' },
    title: 'Navigation Bridge',
    description:
      'Integrated navigation system with INS/GPS, electronic charts, and collision avoidance algorithms.',
    specs: [
      { label: 'GPS Accuracy', value: '<1m' },
      { label: 'Redundancy', value: 'Triple' },
      { label: 'COLREGS', value: 'Compliant' },
    ],
  },
  {
    id: 'engine',
    icon: Settings,
    position: { x: '75%', y: '50%' },
    title: 'Propulsion System',
    description:
      'Hybrid diesel-electric propulsion with waterjet drives for high speed and maneuverability.',
    specs: [
      { label: 'Power', value: '2x 450HP' },
      { label: 'Max Speed', value: '35 knots' },
      { label: 'Fuel', value: 'Diesel/Electric' },
    ],
  },
  {
    id: 'ai',
    icon: Cpu,
    position: { x: '50%', y: '55%' },
    title: 'AI Command Center',
    description:
      'Nvidia-powered AI computing platform for autonomous decision-making and mission execution.',
    specs: [
      { label: 'Computing', value: '500 TOPS' },
      { label: 'Autonomy', value: 'Level 4' },
      { label: 'Response', value: '<100ms' },
    ],
  },
]

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const boatX = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const activeData = hotspots.find((h) => h.id === activeHotspot)

  return (
    <section
      id="fleet"
      ref={containerRef}
      className="relative py-24 min-h-screen overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-DEFAULT via-dark to-navy-DEFAULT" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

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
            INTERACTIVE EXPLORER
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Discover the <span className="text-gradient">IDA Platform</span>
          </h2>
          <p className="font-body text-metallic-DEFAULT max-w-2xl mx-auto">
            Click on the hotspots to explore the advanced systems that power our
            autonomous surface vehicle.
          </p>
        </motion.div>

        {/* Boat Showcase */}
        <motion.div style={{ opacity }} className="relative">
          <motion.div
            style={{ x: boatX }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Boat container */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden glass border border-ocean-DEFAULT/20">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-DEFAULT to-dark" />

              {/* Water effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3">
                <svg
                  viewBox="0 0 1440 200"
                  className="absolute bottom-0 w-[200%] animate-wave"
                  preserveAspectRatio="none"
                >
                  <path
                    fill="rgba(0, 119, 190, 0.15)"
                    d="M0,160L60,144C120,128,240,96,360,90.7C480,85,600,107,720,138.7C840,171,960,213,1080,213.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                  />
                </svg>
              </div>

              {/* Boat SVG illustration */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <svg viewBox="0 0 800 400" className="w-full h-full max-w-4xl">
                  {/* Hull */}
                  <path
                    d="M100,280 Q150,320 250,320 L550,320 Q650,320 700,280 L680,200 Q650,150 550,130 L250,130 Q150,150 120,200 Z"
                    fill="url(#hullGradient)"
                    stroke="#0077BE"
                    strokeWidth="2"
                  />

                  {/* Superstructure */}
                  <path
                    d="M200,130 L200,80 Q200,60 220,60 L580,60 Q600,60 600,80 L600,130"
                    fill="url(#superstructureGradient)"
                    stroke="#00F0FF"
                    strokeWidth="1"
                  />

                  {/* Bridge windows */}
                  <rect
                    x="230"
                    y="75"
                    width="340"
                    height="40"
                    rx="5"
                    fill="rgba(0, 240, 255, 0.2)"
                    stroke="#00F0FF"
                    strokeWidth="1"
                  />

                  {/* Mast */}
                  <line
                    x1="400"
                    y1="60"
                    x2="400"
                    y2="20"
                    stroke="#D1D5DB"
                    strokeWidth="3"
                  />

                  {/* Radar dome */}
                  <ellipse
                    cx="400"
                    cy="15"
                    rx="20"
                    ry="10"
                    fill="#D1D5DB"
                    stroke="#00F0FF"
                    strokeWidth="1"
                  />

                  {/* Sensor arrays */}
                  <circle cx="180" cy="100" r="15" fill="#0B1C3E" stroke="#00F0FF" strokeWidth="1" />
                  <circle cx="620" cy="100" r="15" fill="#0B1C3E" stroke="#00F0FF" strokeWidth="1" />

                  {/* Deck details */}
                  <rect x="250" y="130" width="300" height="5" fill="rgba(0, 119, 190, 0.3)" />

                  <defs>
                    <linearGradient
                      id="hullGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#1a3a6e" />
                      <stop offset="50%" stopColor="#0B1C3E" />
                      <stop offset="100%" stopColor="#050A14" />
                    </linearGradient>
                    <linearGradient
                      id="superstructureGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#D1D5DB" />
                      <stop offset="100%" stopColor="#6B7280" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Hotspots */}
              {hotspots.map((hotspot, index) => {
                const Icon = hotspot.icon
                return (
                  <motion.button
                    key={hotspot.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    onClick={() =>
                      setActiveHotspot(
                        activeHotspot === hotspot.id ? null : hotspot.id
                      )
                    }
                    style={{
                      left: hotspot.position.x,
                      top: hotspot.position.y,
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group ${
                      activeHotspot === hotspot.id ? 'z-20' : 'z-10'
                    }`}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className={`absolute inset-0 rounded-full border-2 ${
                        activeHotspot === hotspot.id
                          ? 'border-cyan-DEFAULT'
                          : 'border-ocean-DEFAULT'
                      }`}
                    />

                    {/* Hotspot button */}
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeHotspot === hotspot.id
                          ? 'bg-cyan-DEFAULT glow-cyan'
                          : 'bg-ocean-DEFAULT/80 hover:bg-ocean-DEFAULT group-hover:glow-cyan'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          activeHotspot === hotspot.id
                            ? 'text-navy-DEFAULT'
                            : 'text-white'
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2 py-1 text-xs font-heading text-cyan-DEFAULT bg-navy-DEFAULT/90 rounded">
                        {hotspot.title.split(' ')[0]}
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Info Panel */}
          <AnimatePresence>
            {activeData && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-xl z-30"
              >
                <div className="glass rounded-xl p-6 border border-cyan-DEFAULT/30 glow-cyan">
                  {/* Close button */}
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="absolute top-4 right-4 p-1 text-metallic-DEFAULT hover:text-cyan-DEFAULT transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-DEFAULT/20 to-ocean-DEFAULT/20 border border-cyan-DEFAULT/30 flex items-center justify-center">
                      <activeData.icon className="w-7 h-7 text-cyan-DEFAULT" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold text-white mb-2">
                        {activeData.title}
                      </h3>
                      <p className="font-body text-sm text-metallic-DEFAULT mb-4">
                        {activeData.description}
                      </p>

                      {/* Specs grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {activeData.specs.map((spec) => (
                          <div key={spec.label} className="text-center">
                            <div className="font-heading text-lg font-bold text-cyan-DEFAULT">
                              {spec.value}
                            </div>
                            <div className="font-body text-xs text-metallic-dark uppercase tracking-wider">
                              {spec.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-20 font-body text-sm text-metallic-dark"
        >
          Click on the glowing points to explore system specifications
        </motion.p>
      </div>
    </section>
  )
}
