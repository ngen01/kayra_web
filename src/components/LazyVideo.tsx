'use client'

import { useRef, useState, useEffect } from 'react'

interface LazyVideoProps {
  src: string
  className?: string
  poster?: string
}

export default function LazyVideo({ src, className = '', poster }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { 
        rootMargin: '200px',
        threshold: 0.1 
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.load()
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-navy-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-DEFAULT border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {isVisible && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
