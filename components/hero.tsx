import Image from "next/image"
import { ArrowRight, Bot, Globe, Mic, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute left-0 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[96px]" />
      <div className="absolute bottom-1/4 right-0 h-80 w-80 translate-x-1/2 rounded-full bg-accent/15 blur-[96px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Strony WWW &amp; AI dla firm</span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Strony internetowe i{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                boty AI
              </span>
              , które pomagają zdobywać klientów
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-pretty text-lg text-muted-foreground lg:mx-0">
              Projektuję nowoczesne strony internetowe oraz wdrażam chatboty i voiceboty AI, które wspierają sprzedaż, automatyzują obsługę klienta i oszczędzają czas Twojego zespołu.
            </p>

            <ul className="mx-auto mb-8 max-w-xl space-y-3 text-left lg:mx-0">
              <li className="flex items-start gap-3">
                <Globe className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">Strony WWW, które budują zaufanie i dobrze wyglądają na każdym urządzeniu</span>
              </li>
              <li className="flex items-start gap-3">
                <Bot className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">Chatboty AI, które odpowiadają klientom 24/7 i zbierają leady</span>
              </li>
              <li className="flex items-start gap-3">
                <Mic className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">Voiceboty AI, które prowadzą rozmowy, umawiają terminy i odciążają firmę</span>
              </li>
            </ul>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="group relative overflow-hidden bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                <a href="#kontakt-formularz">
                  <span className="relative z-10 flex items-center gap-2">
                    Zamów bezpłatny projekt
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border bg-transparent text-foreground hover:bg-secondary hover:text-foreground"
              >
                <a href="#kontakt-formularz">Poproś o wycenę</a>
              </Button>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground/70 lg:text-left">
              Bez zobowiązań. Najpierw widzisz kierunek, potem decydujesz.
            </p>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end lg:scale-125 lg:-mr-8">
            <div className="relative w-full max-w-xl rotate-3 transition-transform duration-500 hover:rotate-0 lg:max-w-none">
              <div className="absolute inset-0 -z-10 scale-90 rounded-3xl bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 blur-3xl" />
              <Image
                src="/hero-image.webp"
                alt="Strony internetowe i chatboty AI dla firm - Synapsite"
                width={800}
                height={600}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Przewiń</span>
          <div className="h-12 w-6 rounded-full border border-border p-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
