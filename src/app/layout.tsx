import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kayra Technology | Autonomous Mastery of the Seas',
  description: 'Cutting-edge autonomous maritime systems by Kayra Technology',
  keywords: 'USV, Unmanned Surface Vehicle, Maritime Technology, Autonomous Vessels, Marine Technology, Defense Systems',
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
