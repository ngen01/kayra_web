'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Shield, LifeBuoy, Map, Bomb, ChevronLeft, ChevronRight } from 'lucide-react'

const missions = [
  {
    id: 'security',
    title: 'Border Security & Surveillance',
    icon: Shield,
    description:
      'Continuous maritime domain awareness with AI-powered threat detection. Long-endurance patrols without crew fatigue, ensuring 24/7 coastal protection.',
    capabilities: [
      'Automatic vessel tracking & identification',
      'Intrusion detection and alerting',
      'Coordinated multi-vessel operations',
      'Real-time intelligence sharing',
    ],
    image: '/missions/security.jpg',
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    id: 'sar',
    title: 'Search and Rescue (SAR)',
    icon: LifeBuoy,
    description:
      'Rapid deployment for maritime emergencies. Advanced sensors and AI algorithms locate survivors faster in challenging conditions.',
    capabilities: [
      'Thermal imaging for survivor detection',
      'Autonomous search pattern execution',
      'Real-time coordination with coast guard',
      'Emergency supply delivery capability',
    ],
    image: '/missions/sar.jpg',
    color: 'from-orange-500/20 to-yellow-500/20',
  },
  {
    id: 'survey',
    title: 'Hydrographic Surveying',
    icon: Map,
    description:
      'Precision bathymetric mapping and oceanographic data collection. Autonomous survey missions with centimeter-level accuracy.',
    capabilities: [
      'Multi-beam sonar integration',
      'Autonomous survey line following',
      'Real-time data processing & transmission',
      'Environmental monitoring sensors',
    ],
    image: '/missions/survey.jpg',
    color: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: 'mcm',
    title: 'Mine Countermeasures',
    icon: Bomb,
    description:
      'Safe and effective mine detection and neutralization. Keep crew out of danger zones while maintaining operational effectiveness.',
    capabilities: [
      'Side-scan sonar mine detection',
      'Autonomous mine hunting patterns',
      'ROV deployment capability',
      'Threat classification AI',
    ],
    image: '/missions/mcm.jpg',
    color: 'from-purple-500/20 to-pink-500/20',
  },
]

export default function MissionScenarios() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section id="rd" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-DEFAULT to-dark" />
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
            OPERATIONAL CAPABILITIES
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Mission <span className="text-gradient">Scenarios</span>
          </h2>
          <p className="font-body text-metallic-DEFAULT max-w-2xl mx-auto">
            Versatile platform designed for multiple mission profiles. From security
            to scientific research, our USV adapts to your operational needs.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 glass rounded-full border border-ocean-DEFAULT/30 hover:border-cyan-DEFAULT/50 transition-colors group -translate-x-4 lg:translate-x-0"
          >
            <ChevronLeft className="w-6 h-6 text-metallic-DEFAULT group-hover:text-cyan-DEFAULT transition-colors" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 glass rounded-full border border-ocean-DEFAULT/30 hover:border-cyan-DEFAULT/50 transition-colors group translate-x-4 lg:translate-x-0"
          >
            <ChevronRight className="w-6 h-6 text-metallic-DEFAULT group-hover:text-cyan-DEFAULT transition-colors" />
          </button>

          {/* Embla carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {missions.map((mission, index) => {
                const Icon = mission.icon
                const isActive = selectedIndex === index

                return (
                  <div
                    key={mission.id}
                    className="flex-[0_0_90%] md:flex-[0_0_70%] lg:flex-[0_0_60%] min-w-0 px-4"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.9,
                        opacity: isActive ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`relative rounded-2xl overflow-hidden glass border transition-colors duration-300 ${
                        isActive
                          ? 'border-cyan-DEFAULT/50'
                          : 'border-ocean-DEFAULT/20'
                      }`}
                    >
                      {/* Background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${mission.color} opacity-50`}
                      />

                      <div className="relative p-8 md:p-10">
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* Left content */}
                          <div className="flex-1 space-y-6">
                            {/* Icon */}
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-DEFAULT/20 to-ocean-DEFAULT/20 border border-cyan-DEFAULT/30"
                            >
                              <Icon className="w-8 h-8 text-cyan-DEFAULT" />
                            </motion.div>

                            {/* Title */}
                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                              {mission.title}
                            </h3>

                            {/* Description */}
                            <p className="font-body text-metallic-DEFAULT leading-relaxed">
                              {mission.description}
                            </p>

                            {/* CTA */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 font-heading text-sm font-semibold tracking-wider text-cyan-DEFAULT border border-cyan-DEFAULT/50 rounded-sm hover:bg-cyan-DEFAULT/10 transition-colors"
                            >
                              Learn More
                            </motion.button>
                          </div>

                          {/* Right content - Capabilities */}
                          <div className="flex-1">
                            <h4 className="font-heading text-sm font-semibold text-cyan-DEFAULT uppercase tracking-widest mb-4">
                              Key Capabilities
                            </h4>
                            <ul className="space-y-3">
                              {mission.capabilities.map((capability, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: 20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-DEFAULT flex-shrink-0" />
                                  <span className="font-body text-sm text-metallic-DEFAULT">
                                    {capability}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-20">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="absolute -top-16 -right-16 w-32 h-32 border border-cyan-DEFAULT rounded-full"
                        />
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {missions.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? 'bg-cyan-DEFAULT w-8'
                    : 'bg-ocean-DEFAULT/50 hover:bg-ocean-DEFAULT'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: '500+', label: 'Operational Hours' },
            { value: '15+', label: 'Mission Types' },
            { value: '99.7%', label: 'System Uptime' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 glass rounded-xl border border-ocean-DEFAULT/20"
            >
              <div className="font-heading text-3xl md:text-4xl font-bold text-cyan-DEFAULT mb-2">
                {stat.value}
              </div>
              <div className="font-body text-sm text-metallic-DEFAULT">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
