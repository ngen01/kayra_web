import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kayra Robotics | Autonomous Mastery of the Seas',
  description: 'Next-generation Unmanned Surface Vehicles engineered for precision, endurance, and intelligence. Advanced maritime autonomous systems for defense, research, and commercial applications.',
  keywords: 'USV, Unmanned Surface Vehicle, Maritime Robotics, Autonomous Vessels, Marine Technology, Defense Systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
