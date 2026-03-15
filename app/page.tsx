import { GlowCursor } from "@/components/glow-cursor"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { Portfolio } from "@/components/portfolio"
import { FAQ } from "@/components/faq"
import { InlineContactForm } from "@/components/inline-contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlowCursor />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Portfolio />
      <FAQ />
      <InlineContactForm />
      <Footer />
    </main>
  )
}
