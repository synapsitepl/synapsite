"use client"

import { Check, Star, Globe, Bot, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const webPackages = [
  {
    name: "One-Pager / Landing",
    price: "999",
    description: "Idealne na start lub kampanię marketingową",
    features: [
      "1 długa, responsywna podstrona",
      "Formularz lead magnet",
      "Panel CMS do edycji treści",
      "Certyfikat SSL",
      "Realizacja w 7 dni",
    ],
    popular: false,
  },
  {
    name: "Elite Performance",
    price: "2 899",
    description: "Kompletna wizytówka firmy z pełnym SEO",
    features: [
      "Do 5 podstron",
      "Zaawansowana analityka (GA4, GTM)",
      "Pełne SEO techniczne",
      "Optymalizacja Core Web Vitals",
      "Integracja z social media",
      "Realizacja w 14 dni",
    ],
    popular: true,
  },
  {
    name: "Custom App / Sklep",
    price: "Wycena",
    priceLabel: "indywidualna",
    description: "Rozwiązania szyte na miarę Twojego biznesu",
    features: [
      "Systemy E-commerce (Next.js)",
      "Animacje GSAP/Three.js",
      "Integracje API",
      "Panel administracyjny",
      "Dedykowany opiekun projektu",
    ],
    popular: false,
  },
]

const aiPackages = [
  {
    name: "Chatbot AI",
    price: "2 000",
    monthly: "200",
    icon: Bot,
    description: "Automatyczna obsługa klienta na stronie",
    features: [
      "Trening na danych Twojej firmy",
      "Automatyczna kwalifikacja leadów",
      "Integracja z Twoją stroną WWW",
      "Panel do zarządzania konwersacjami",
      "Raporty i statystyki",
    ],
  },
  {
    name: "Voicebot AI",
    price: "4 499",
    monthly: "450",
    icon: Mic,
    description: "Głosowy asystent dla Twojej firmy",
    features: [
      "Naturalna synteza mowy PL",
      "Rezerwacje spotkań przez telefon",
      "Obsługa setek połączeń jednocześnie",
      "Integracja z kalendarzem",
      "Przekierowanie do konsultanta",
    ],
  },
]

export function Pricing() {
  return (
    <section id="cennik" className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Przejrzysty <span className="text-primary">cennik</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Wybierz pakiet dopasowany do potrzeb Twojego biznesu. Wszystkie ceny są cenami netto.
          </p>
        </div>

        {/* Web Packages */}
        <div className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground">Strony WWW</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {webPackages.map((pkg, i) => (
              <div
                key={i}
                className={cn(
                  "group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
                  pkg.popular
                    ? "border-primary/50 bg-gradient-to-b from-primary/10 to-transparent"
                    : "border-border bg-card/50 backdrop-blur-sm hover:border-primary/30"
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      <Star className="h-3 w-3" />
                      BESTSELLER
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-foreground">{pkg.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                  {pkg.priceLabel ? (
                    <span className="ml-2 text-muted-foreground">{pkg.priceLabel}</span>
                  ) : (
                    <span className="ml-2 text-muted-foreground">zł</span>
                  )}
                </div>
                
                <ul className="mb-6 space-y-3">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={cn(
                    "w-full",
                    pkg.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  Wybierz pakiet
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Packages */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <Bot className="h-6 w-6 text-accent" />
            <h3 className="text-2xl font-semibold text-foreground">Automatyzacja AI</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:max-w-4xl">
            {aiPackages.map((pkg, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8">
                  <pkg.icon className="h-full w-full text-accent/5" />
                </div>
                
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <pkg.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">{pkg.name}</h4>
                  </div>
                  
                  <p className="mb-4 text-sm text-muted-foreground">{pkg.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                    <span className="ml-2 text-muted-foreground">zł</span>
                    <div className="mt-1 text-sm text-muted-foreground">
                      + {pkg.monthly} zł/mc utrzymanie
                    </div>
                  </div>
                  
                  <ul className="mb-6 space-y-3">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Zamów wdrożenie
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
