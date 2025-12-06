'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Brain, Disc3, Satellite, Anchor, Zap, Eye, Shield, Gauge,
  Waves, Plane, Radio, Navigation, Camera, Wifi, Battery, Cpu
} from 'lucide-react'

const platformTabs = [
  { id: 'all', label: 'All Platforms', icon: Brain },
  { id: 'usv', label: 'USV', icon: Waves },
  { id: 'uav', label: 'UAV', icon: Plane },
  { id: 'rov', label: 'ROV', icon: Anchor },
]

const techSpecs = [
  {
    title: 'AI Navigation',
    icon: Brain,
    detail: 'Level 4+ Autonomy with real-time obstacle avoidance and path planning across all domains.',
    stats: { label: 'Autonomy Level', value: 'L4+' },
    size: 'large',
    gradient: 'from-cyan-DEFAULT/20 to-ocean-DEFAULT/20',
    platforms: ['all', 'usv', 'uav', 'rov'],
  },
  {
    title: 'Propulsion Systems',
    icon: Disc3,
    detail: 'Hybrid diesel-electric for USV, electric motors for UAV & ROV with optimized efficiency.',
    stats: { label: 'Combined Range', value: '650+ nm' },
    size: 'medium',
    gradient: 'from-ocean-DEFAULT/20 to-navy-50/20',
    platforms: ['all'],
  },
  {
    title: 'USV Propulsion',
    icon: Disc3,
    detail: 'High-efficiency hybrid diesel-electric system with waterjet drives for superior speed.',
    stats: { label: 'Max Speed', value: '35 kts' },
    size: 'medium',
    gradient: 'from-ocean-DEFAULT/20 to-navy-50/20',
    platforms: ['usv'],
  },
  {
    title: 'UAV Propulsion',
    icon: Disc3,
    detail: 'Electric pusher motor with high-efficiency propeller for extended flight time.',
    stats: { label: 'Flight Time', value: '12h' },
    size: 'medium',
    gradient: 'from-cyan-DEFAULT/20 to-blue-400/20',
    platforms: ['uav'],
  },
  {
    title: 'ROV Thrusters',
    icon: Disc3,
    detail: '8 vectored thrusters for 6-DOF movement with precision positioning.',
    stats: { label: 'Thrust', value: '45 kgf' },
    size: 'medium',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    platforms: ['rov'],
  },
  {
    title: 'Communication',
    icon: Satellite,
    detail: 'Encrypted SATCOM, LOS radio, and mesh networking for seamless C2.',
    stats: { label: 'Latency', value: '<50ms' },
    size: 'medium',
    gradient: 'from-cyan-DEFAULT/10 to-ocean-DEFAULT/20',
    platforms: ['all', 'usv', 'uav'],
  },
  {
    title: 'Acoustic Comms',
    icon: Radio,
    detail: 'Underwater acoustic modem for ROV-USV communication link.',
    stats: { label: 'Range', value: '3 km' },
    size: 'medium',
    gradient: 'from-yellow-500/15 to-cyan-DEFAULT/15',
    platforms: ['rov'],
  },
  {
    title: 'Multi-Sensor Fusion',
    icon: Eye,
    detail: 'EO/IR cameras, LIDAR, RADAR, and sonar integration across platforms.',
    stats: { label: 'Coverage', value: '360°' },
    size: 'large',
    gradient: 'from-navy-50/20 to-ocean-DEFAULT/20',
    platforms: ['all'],
  },
  {
    title: 'Surface Sensors',
    icon: Eye,
    detail: 'AESA radar, EO/IR gimbal, and LIDAR for surface surveillance.',
    stats: { label: 'Range', value: '24 nm' },
    size: 'large',
    gradient: 'from-ocean-DEFAULT/20 to-cyan-DEFAULT/20',
    platforms: ['usv'],
  },
  {
    title: 'Aerial Sensors',
    icon: Camera,
    detail: '4K EO/IR gimbal camera with 40x optical zoom and thermal imaging.',
    stats: { label: 'Resolution', value: '4K HDR' },
    size: 'large',
    gradient: 'from-cyan-DEFAULT/20 to-blue-400/20',
    platforms: ['uav'],
  },
  {
    title: 'Subsea Sensors',
    icon: Eye,
    detail: 'Multi-beam sonar, 4K cameras, and USBL positioning system.',
    stats: { label: 'Depth', value: '300m' },
    size: 'large',
    gradient: 'from-yellow-500/20 to-ocean-DEFAULT/20',
    platforms: ['rov'],
  },
  {
    title: 'Power Systems',
    icon: Zap,
    detail: 'Optimized power management with hybrid and electric systems.',
    stats: { label: 'USV Endurance', value: '72h' },
    size: 'small',
    gradient: 'from-cyan-DEFAULT/15 to-transparent',
    platforms: ['all', 'usv'],
  },
  {
    title: 'Battery System',
    icon: Battery,
    detail: 'High-density Li-ion batteries with smart BMS for UAV.',
    stats: { label: 'Capacity', value: '25 kWh' },
    size: 'small',
    gradient: 'from-cyan-DEFAULT/15 to-blue-400/15',
    platforms: ['uav'],
  },
  {
    title: 'Tethered Power',
    icon: Zap,
    detail: 'High-power tether with fiber optic data link from USV.',
    stats: { label: 'Power', value: '15 kW' },
    size: 'small',
    gradient: 'from-yellow-500/15 to-transparent',
    platforms: ['rov'],
  },
  {
    title: 'Cyber Security',
    icon: Shield,
    detail: 'MIL-STD encryption, intrusion detection, and secure boot.',
    stats: { label: 'Standard', value: 'MIL-STD' },
    size: 'small',
    gradient: 'from-cyan-DEFAULT/10 to-ocean-DEFAULT/15',
    platforms: ['all', 'usv', 'uav', 'rov'],
  },
  {
    title: 'Navigation',
    icon: Navigation,
    detail: 'INS/GPS with COLREGS compliance and GPS-denied capability.',
    stats: { label: 'Accuracy', value: '<1m' },
    size: 'small',
    gradient: 'from-ocean-DEFAULT/15 to-cyan-DEFAULT/10',
    platforms: ['all', 'usv', 'uav'],
  },
  {
    title: 'Edge Computing',
    icon: Cpu,
    detail: 'Nvidia-powered AI computing for real-time decision making.',
    stats: { label: 'Performance', value: '500 TOPS' },
    size: 'small',
    gradient: 'from-navy-50/15 to-cyan-DEFAULT/10',
    platforms: ['all', 'usv', 'uav', 'rov'],
  },
  {
    title: 'Mesh Network',
    icon: Wifi,
    detail: 'Self-forming mesh network between all autonomous platforms.',
    stats: { label: 'Bandwidth', value: '100 Mbps' },
    size: 'small',
    gradient: 'from-cyan-DEFAULT/10 to-ocean-DEFAULT/10',
    platforms: ['all'],
  },
]

export default function TechSpecsBento() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState('all')

  const filteredSpecs = techSpecs.filter((spec) => spec.platforms.includes(activeTab))

  return (
    <section id="technology" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-navy-DEFAULT" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 mb-4 font-heading text-sm tracking-widest text-cyan-DEFAULT border border-cyan-DEFAULT/30 rounded-full">
            TECHNOLOGY
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Engineering <span className="text-gradient">Excellence</span>
          </h2>
          <p className="font-body text-metallic-DEFAULT max-w-2xl mx-auto">
            State-of-the-art systems designed for unmatched performance across air, surface, and underwater domains.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {platformTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-DEFAULT to-ocean-DEFAULT text-navy-DEFAULT'
                    : 'glass border border-ocean-DEFAULT/30 text-metallic-DEFAULT hover:border-cyan-DEFAULT/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-heading text-sm font-semibold">{tab.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Bento Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredSpecs.map((spec, index) => {
            const Icon = spec.icon
            const colSpan =
              spec.size === 'large'
                ? 'col-span-2'
                : spec.size === 'medium'
                ? 'col-span-2 md:col-span-1'
                : 'col-span-1'

            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className={`${colSpan} group`}
              >
                <div
                  className={`relative h-full p-6 rounded-xl glass border border-ocean-DEFAULT/20 hover:border-cyan-DEFAULT/50 transition-all duration-500 overflow-hidden cursor-pointer`}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${spec.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute -top-10 -right-10 w-20 h-20 border border-cyan-DEFAULT/20 rounded-full"
                    />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-cyan-DEFAULT/20 to-ocean-DEFAULT/20 border border-cyan-DEFAULT/30"
                    >
                      <Icon className="w-6 h-6 text-cyan-DEFAULT" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-cyan-DEFAULT transition-colors">
                      {spec.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm text-metallic-DEFAULT mb-4 leading-relaxed">
                      {spec.detail}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-ocean-DEFAULT/20">
                      <span className="font-body text-xs text-metallic-dark uppercase tracking-wider">
                        {spec.stats.label}
                      </span>
                      <span className="font-heading text-lg font-bold text-cyan-DEFAULT">
                        {spec.stats.value}
                      </span>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-cyan-DEFAULT/10 blur-3xl" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 font-heading text-sm font-semibold tracking-wider text-cyan-DEFAULT border border-cyan-DEFAULT/50 rounded-sm hover:bg-cyan-DEFAULT/10 transition-colors"
          >
            Download Full Technical Specifications
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
