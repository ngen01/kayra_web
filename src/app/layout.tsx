import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kayra Consulting | Autonomous Mastery of the Seas',
  description: 'Cutting-edge autonomous maritime systems by Kayra Consulting',
  keywords: 'USV, Unmanned Surface Vehicle, Maritime Consulting, Autonomous Vessels, Marine Technology, Defense Systems',
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
