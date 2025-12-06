import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FleetShowcase from '@/components/FleetShowcase'
import TechSpecsBento from '@/components/TechSpecsBento'
import AutonomousEcosystem from '@/components/AutonomousEcosystem'
import ProductShowcase from '@/components/ProductShowcase'
import MissionScenarios from '@/components/MissionScenarios'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <FleetShowcase />
      <AutonomousEcosystem />
      <TechSpecsBento />
      <ProductShowcase />
      <MissionScenarios />
      <Footer />
    </main>
  )
}
