import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { Portfolio } from "@/components/portfolio"
import { HomeInteractiveSections } from "@/components/home-interactive-sections"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Portfolio />
      <HomeInteractiveSections />
      <Footer />
    </main>
  )
}
