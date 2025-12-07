'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Waves, Plane, Anchor, ChevronRight, Gauge, Battery, Radio,
  Eye, Ruler, Weight, Timer
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import for 3D viewer
const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false })

const fleet = [
  {
    id: 'usv' as const,
    name: 'KAYRA USV',
    subtitle: 'Unmanned Surface Vehicle',
    turkishName: 'İDA - İnsansız Deniz Aracı',
    icon: Waves,
    description: 'High-speed autonomous surface vessel designed for maritime security, surveillance, and multi-domain coordination. The nerve center of our autonomous fleet.',
    color: 'from-ocean-DEFAULT to-cyan-DEFAULT',
    bgColor: 'from-ocean-DEFAULT/20 to-cyan-DEFAULT/10',
    specs: [
      { icon: Ruler, label: 'Length', value: '12m' },
      { icon: Gauge, label: 'Max Speed', value: '35 kts' },
      { icon: Timer, label: 'Endurance', value: '72h' },
      { icon: Weight, label: 'Payload', value: '2,000 kg' },
      { icon: Battery, label: 'Power', value: 'Hybrid' },
      { icon: Radio, label: 'Range', value: '500+ nm' },
    ],
    capabilities: [
      'Level 4+ Autonomous Navigation',
      'SATCOM & Multi-Link Communication',
      'EO/IR & Radar Sensor Fusion',
      'UAV Launch & Recovery Platform',
      'ROV Deployment Capability',
      'Anti-Collision COLREGS Compliant',
    ],
  },
  {
    id: 'uav' as const,
    name: 'KAYRA UAV',
    subtitle: 'Unmanned Aerial Vehicle',
    turkishName: 'İHA - İnsansız Hava Aracı',
    icon: Plane,
    description: 'Fixed-wing tactical UAV platform for extended aerial surveillance, reconnaissance, and real-time intelligence gathering. Deployable from USV or land.',
    color: 'from-cyan-DEFAULT to-blue-400',
    bgColor: 'from-cyan-DEFAULT/20 to-blue-400/10',
    specs: [
      { icon: Ruler, label: 'Wingspan', value: '4.5m' },
      { icon: Gauge, label: 'Max Speed', value: '150 km/h' },
      { icon: Timer, label: 'Endurance', value: '12h' },
      { icon: Weight, label: 'Payload', value: '15 kg' },
      { icon: Battery, label: 'Power', value: 'Electric' },
      { icon: Radio, label: 'Range', value: '150 km' },
    ],
    capabilities: [
      'Autonomous Takeoff & Landing',
      'EO/IR Gimbal Stabilized Camera',
      'Real-time Video Streaming',
      'GPS-Denied Navigation',
      'Swarm Coordination Ready',
      'USV Launch & Recovery',
    ],
  },
  {
    id: 'rov' as const,
    name: 'KAYRA ROV',
    subtitle: 'Remotely Operated Vehicle',
    turkishName: 'ROV - Uzaktan Kumandalı Sualtı Aracı',
    icon: Anchor,
    description: 'Advanced underwater inspection and intervention ROV for subsea operations, pipeline inspection, and underwater reconnaissance.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-500/20 to-orange-500/10',
    specs: [
      { icon: Ruler, label: 'Depth Rating', value: '300m' },
      { icon: Gauge, label: 'Speed', value: '4 kts' },
      { icon: Timer, label: 'Operation', value: '8h' },
      { icon: Weight, label: 'Payload', value: '50 kg' },
      { icon: Battery, label: 'Power', value: 'Tethered' },
      { icon: Eye, label: 'Cameras', value: '4K HDR' },
    ],
    capabilities: [
      '6-DOF Precision Control',
      'Manipulator Arms',
      'Sonar & USBL Positioning',
      'LED Lighting Array',
      'Auto Depth & Heading Hold',
      'USV Tether Management',
    ],
  },
]

export default function FleetShowcase() {
  const [activeVehicle, setActiveVehicle] = useState(0)
  const vehicle = fleet[activeVehicle]

  return (
    <section id="fleet" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-navy-DEFAULT to-dark" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

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
            AUTONOMOUS FLEET
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Multi-Domain <span className="text-gradient">Unmanned Systems</span>
          </h2>
          <p className="font-body text-metallic-DEFAULT max-w-2xl mx-auto">
            Integrated autonomous platforms operating seamlessly across air, surface, and underwater domains.
          </p>
        </motion.div>

        {/* Vehicle selector tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {fleet.map((v, index) => {
            const Icon = v.icon
            return (
              <motion.button
                key={v.id}
                onClick={() => setActiveVehicle(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${activeVehicle === index
                  ? `bg-gradient-to-r ${v.color} text-navy-DEFAULT glow-cyan`
                  : 'glass border border-ocean-DEFAULT/30 text-metallic-DEFAULT hover:border-cyan-DEFAULT/50'
                  }`}
              >
                <Icon className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-heading font-bold">{v.name.split(' ')[1]}</div>
                  <div className="text-xs opacity-80">{v.subtitle}</div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Vehicle showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left - Visualization */}
            <div className="relative h-[400px] lg:h-[500px] w-full">
              <div className={`absolute inset-0 bg-gradient-to-br ${vehicle.bgColor} rounded-3xl blur-3xl opacity-50`} />
              <div className="relative h-full glass rounded-2xl border border-ocean-DEFAULT/30 overflow-hidden">
                {/* USV: Show video */}
                {vehicle.id === 'usv' ? (
                  <div className="relative w-full h-full">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    >
                      <source src="/usv-demo.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 text-xs font-mono bg-navy-900/80 backdrop-blur-sm text-cyan-DEFAULT border border-cyan-DEFAULT/30 rounded-full">
                        SURFACE VIEW
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-mono bg-navy-900/80 backdrop-blur-sm text-ocean-DEFAULT border border-ocean-DEFAULT/30 rounded-full">
                        UNDERWATER
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/20 pointer-events-none" />
                  </div>
                ) : vehicle.id === 'uav' ? (
                  /* UAV: Show aerial video */
                  <div className="relative w-full h-full">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    >
                      <source src="/İnsansız_Hava_Aracı_Videosu_Hazır.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-mono bg-navy-900/80 backdrop-blur-sm text-cyan-DEFAULT border border-cyan-DEFAULT/30 rounded-full">
                        AERIAL SURVEILLANCE
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/20 pointer-events-none" />
                  </div>
                ) : (
                  /* ROV: Show 3D model */
                  <ModelViewer vehicleId={vehicle.id} />
                )}

                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <p className="text-xs font-mono text-cyan-DEFAULT/70">
                    {vehicle.id === 'usv' ? 'USV LIVE DEMONSTRATION' :
                      vehicle.id === 'uav' ? 'UAV FLIGHT FOOTAGE' :
                        'INTERACTIVE 3D MODEL'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-3xl font-bold text-white mb-4">
                  {vehicle.name}
                </h3>
                <p className="font-body text-metallic-DEFAULT leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-3 gap-4">
                {vehicle.specs.map((spec) => {
                  const Icon = spec.icon
                  return (
                    <div
                      key={spec.label}
                      className="glass rounded-lg p-4 border border-ocean-DEFAULT/20 text-center"
                    >
                      <Icon className="w-5 h-5 text-cyan-DEFAULT mx-auto mb-2" />
                      <div className="font-heading text-lg font-bold text-white">
                        {spec.value}
                      </div>
                      <div className="font-body text-xs text-metallic-dark uppercase tracking-wider">
                        {spec.label}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Capabilities */}
              <div>
                <h4 className="font-heading text-sm font-semibold text-cyan-DEFAULT uppercase tracking-widest mb-4">
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {vehicle.capabilities.map((cap, index) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4 text-cyan-DEFAULT flex-shrink-0" />
                      <span className="font-body text-sm text-metallic-DEFAULT">{cap}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 font-heading text-sm font-semibold tracking-wider rounded-sm bg-gradient-to-r ${vehicle.color} text-navy-DEFAULT`}
                >
                  Technical Datasheet
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 font-heading text-sm font-semibold tracking-wider text-cyan-DEFAULT border border-cyan-DEFAULT/50 rounded-sm hover:bg-cyan-DEFAULT/10 transition-colors"
                >
                  Request Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
