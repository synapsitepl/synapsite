"use client"

import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 pt-24 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-[128px]" />
      
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Agencja Web & AI</span>
            </div>
            
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Nowoczesne strony internetowe i{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                inteligentna automatyzacja AI
              </span>{" "}
              dla biznesu
            </h1>
            
            <p className="mb-10 max-w-xl text-pretty text-lg text-muted-foreground lg:mx-0 mx-auto">
              Budujemy błyskawiczne strony WWW oraz wdrażamy chatboty i voiceboty AI, które obsługują klientów i sprzedają 24/7.
            </p>
            
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Umów bezpłatną konsultację
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-transparent text-foreground hover:bg-secondary hover:text-foreground"
              >
                Zobacz realizacje
              </Button>
            </div>
          </div>
          
          {/* Right side - Image with animation */}
          <div className="relative flex items-center justify-center lg:justify-end lg:scale-125 lg:-mr-8">
            <div className="relative w-full max-w-xl lg:max-w-none animate-float rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 -z-10 scale-90 rounded-3xl bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 blur-3xl" />
              <Image
                src="/hero-image.webp"
                alt="AI i Web Development - nowoczesne rozwiązania"
                width={800}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:mt-20">
          {[
            { value: "150+", label: "Zrealizowanych projektów" },
            { value: "98%", label: "Zadowolonych klientów" },
            { value: "24/7", label: "Wsparcie AI" },
            { value: "<7", label: "Dni realizacji" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
