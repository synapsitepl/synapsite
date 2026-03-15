import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Portfolio } from "@/components/portfolio"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Portfolio – realizacje stron i wdrożeń AI | Synapsite",
  description: "Zobacz nasze realizacje: strony internetowe, chatboty AI i voiceboty AI dla firm.",
}

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Wróć do strony
          </Link>

          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Nasze <span className="text-primary">realizacje</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Projekty stron internetowych, chatbotów AI i voicebotów AI, które zrealizowaliśmy dla naszych klientów.
            </p>
          </div>

          <Portfolio />
        </div>
      </div>
      <Footer />
    </main>
  )
}
