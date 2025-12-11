'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Waves, Plane, Anchor, ChevronRight, Gauge, Battery, Radio,
  Eye, Ruler, Weight, Timer
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import for 3D viewer
const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false })

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

const fleet = [
  {
    id: 'usv' as const,
    name: 'KAYRA USV',
    subtitle: 'Unmanned Surface Vehicle',
    turkishName: 'İDA - İnsansız Deniz Aracı',
    icon: Waves,
    description: 'Autonomous surface vessel powered by Jetson Orin Nano Super running ROS 2 Jazzy on Ubuntu 24.04. Features 3D LiDAR, stereo camera, and AI-powered computer vision with OpenCV & YOLO.',
    color: 'from-ocean-DEFAULT to-cyan-DEFAULT',
    bgColor: 'from-ocean-DEFAULT/20 to-cyan-DEFAULT/10',
    specs: [
      { icon: Ruler, label: 'Dimensions', value: '80x24x23cm' },
      { icon: Gauge, label: 'Speed', value: '2.5 kts' },
      { icon: Timer, label: 'Operation', value: '5+ hours' },
      { icon: Weight, label: 'Payload', value: '20 kg' },
      { icon: Battery, label: 'Computer', value: 'Jetson Orin' },
      { icon: Radio, label: 'Range', value: '40+ km' },
    ],
    capabilities: [
      'Jetson Orin Nano Super',
      'ROS 2 Jazzy + Ubuntu 24.04',
      '3D LiDAR & Stereo Camera',
      'OpenCV + YOLO AI Vision',
      'Dual-Motor Propulsion',
      'Point Cloud Processing',
    ],
  },
  {
    id: 'uav' as const,
    name: 'KAYRA UAV',
    subtitle: 'Unmanned Aerial Vehicle',
    turkishName: 'İHA - İnsansız Hava Aracı',
    icon: Plane,
    description: 'Fixed-wing tactical UAV platform for extended aerial surveillance, reconnaissance, and real-time intelligence gathering. Currently in development.',
    color: 'from-cyan-DEFAULT to-blue-400',
    bgColor: 'from-cyan-DEFAULT/20 to-blue-400/10',
    specs: [
      { icon: Ruler, label: 'Specs', value: 'Coming Soon' },
      { icon: Gauge, label: 'Speed', value: 'Coming Soon' },
      { icon: Timer, label: 'Endurance', value: 'Coming Soon' },
      { icon: Weight, label: 'Payload', value: 'Coming Soon' },
      { icon: Battery, label: 'Power', value: 'Coming Soon' },
      { icon: Radio, label: 'Range', value: 'Coming Soon' },
    ],
    capabilities: [
      'Coming Soon',
      'Coming Soon',
      'Coming Soon',
      'Coming Soon',
      'Coming Soon',
      'Coming Soon',
    ],
  },
  {
    id: 'rov' as const,
    name: 'KAYRA ROV',
    subtitle: 'Inspection Class ROV',
    turkishName: 'ROV - Uzaktan Kumandalı Sualtı Aracı',
    icon: Anchor,
    description: 'Inspection Class Remotely Operated Vehicle featuring Cast Polyamide Chassis with Acrylic Watertight Enclosure. Powered by Raspberry Pi 5 running ROS 2 Humble Hawksbill on Ubuntu 22.04 LTS.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-500/20 to-orange-500/10',
    specs: [
      { icon: Ruler, label: 'Dimensions', value: '440x300x220mm' },
      { icon: Gauge, label: 'Thrusters', value: '6-Vector' },
      { icon: Timer, label: 'Computer', value: 'RPi 5 8GB' },
      { icon: Weight, label: 'Battery', value: '4S 6P Li-Ion' },
      { icon: Battery, label: 'Data Link', value: '30m RJ45' },
      { icon: Eye, label: 'Camera', value: 'Fisheye Wide' },
    ],
    capabilities: [
      '6-Thruster Vector Configuration',
      'ROS 2 Humble Hawksbill',
      'MPU6050 IMU (6-Axis)',
      'Low-Latency Ethernet Streaming',
      'Custom User Interface',
      'Flanged O-Ring Sealing',
    ],
  },
]

export default function FleetShowcase() {
  const [activeVehicle, setActiveVehicle] = useState(0)
  const vehicle = fleet[activeVehicle]
  const isMobile = useIsMobile()

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
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {fleet.map((v, index) => {
            const Icon = v.icon
            return (
              <motion.button
                key={v.id}
                onClick={() => setActiveVehicle(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 rounded-xl transition-all duration-300 ${activeVehicle === index
                  ? `bg-gradient-to-r ${v.color} text-navy-DEFAULT glow-cyan`
                  : 'glass border border-ocean-DEFAULT/30 text-metallic-DEFAULT hover:border-cyan-DEFAULT/50'
                  }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="text-left">
                  <div className="font-heading text-sm sm:text-base font-bold">{v.name.split(' ')[1]}</div>
                  <div className="text-xs opacity-80 hidden sm:block">{v.subtitle}</div>
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
            className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center"
          >
            {/* Left - Visualization */}
            <div className="relative h-[280px] sm:h-[400px] lg:h-[500px] w-full">
              <div className={`absolute inset-0 bg-gradient-to-br ${vehicle.bgColor} rounded-3xl blur-3xl opacity-50`} />
              <div className="relative h-full glass rounded-2xl border border-ocean-DEFAULT/30 overflow-hidden">
                {/* 3D Model Viewer */}
                <div className="relative w-full h-full">
                  <ModelViewer vehicleId={vehicle.id} />

                  {/* Subtle label */}
                  <div className="absolute bottom-4 right-4 pointer-events-none z-10">
                    <div className="px-3 py-1 glass rounded-full border border-white/10 text-xs font-mono text-white/50">
                      INTERACTIVE 3D
                    </div>
                  </div>

                  {/* UAV Special "Coming Soon" Overlay */}
                  {vehicle.id === 'uav' && (
                    <div className="absolute inset-0 backdrop-blur-md bg-navy-950/60 flex items-center justify-center z-20">
                      <div className="text-center">
                        <span className="inline-block px-6 sm:px-8 py-3 sm:py-4 font-heading text-lg sm:text-2xl font-bold tracking-widest text-white bg-gradient-to-r from-cyan-500/30 to-ocean-500/30 border-cyan-DEFAULT/50 shadow-[0_0_40px_rgba(0,240,255,0.3)] border-2 rounded-lg backdrop-blur-sm">
                          COMING SOON
                        </span>
                        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-metallic-DEFAULT">Geliştirme aşamasında</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
                  {vehicle.name}
                </h3>
                <p className="font-body text-metallic-DEFAULT leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {vehicle.specs.map((spec) => {
                  const Icon = spec.icon
                  return (
                    <div
                      key={spec.label}
                      className="glass rounded-lg p-2 sm:p-4 border border-ocean-DEFAULT/20 text-center"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-DEFAULT mx-auto mb-1 sm:mb-2" />
                      <div className="font-heading text-sm sm:text-lg font-bold text-white">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
