'use client'

import Image from 'next/image'

// Main Export Component - Simple background image
export default function RoboticBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Image
                src="/images/hero-bg.png"
                alt="KAYRA Technology Background"
                fill
                priority
                className="object-cover"
                quality={100}
            />
            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20" />
        </div>
    )
}
