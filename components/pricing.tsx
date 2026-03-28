"use client"

import { Check, Star, Globe, Bot, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const webPackages = [
  {
    name: "Pakiet Start",
    subtitle: "Landing page / one page",
    price: "999",
    priceLabel: "bez CMS",
    description: "Idealny, jeśli chcesz szybko ruszyć z profesjonalną obecnością online i zacząć zbierać zapytania. Wersja z CMS do samodzielnej edycji kosztuje 1499 zł.",
    features: [
      "Nowoczesny projekt strony",
      "Jedna długa strona sprzedażowa",
      "Pełna responsywność",
      "Formularz kontaktowy",
      "CMS do samodzielnej edycji za dopłatą",
      "Wersja z CMS: 1499 zł",
      "Wdrożenie techniczne",
    ],
    cta: "Zamów landing page",
    popular: false,
  },
  {
    name: "Pakiet Business",
    subtitle: "Strona firmowa",
    price: "2 899",
    description: "Dla firm, które potrzebują mocniejszego wizerunku, kilku podstron i solidnej bazy pod dalszy rozwój.",
    features: [
      "Do 5 podstron",
      "Indywidualny projekt",
      "Techniczne SEO",
      "Optymalizacja szybkości",
      "Integracje kontaktowe i analityczne",
      "CMS i łatwa edycja treści",
    ],
    cta: "Poproś o wycenę strony firmowej",
    popular: true,
  },
  {
    name: "Pakiet Custom",
    subtitle: "Aplikacja / sklep / rozwiązanie szyte na miarę",
    price: "Wycena",
    priceLabel: "indywidualna",
    description: "Dla biznesów, które potrzebują czegoś więcej niż standardowa strona: sklepu, panelu klienta, niestandardowych funkcji lub integracji.",
    features: [
      "Sklep internetowy",
      "Aplikacja webowa",
      "Integracje API",
      "Niestandardowe moduły",
      "Rozwiązania dopasowane do procesu w firmie",
    ],
    cta: "Umów konsultację",
    popular: false,
  },
]

const aiPackages = [
  {
    name: "Chatbot AI",
    price: "1 999",
    monthly: "200",
    icon: Bot,
    description: "Chatbot AI, który odpowiada klientom nawet wtedy, gdy Ty pracujesz nad czymś innym",
    salesCopy: "To dobre rozwiązanie, jeśli codziennie odpowiadasz na te same pytania albo chcesz szybciej zamieniać ruch na stronie w konkretne zapytania.",
    features: [
      "Odpowiadanie na pytania klientów 24/7",
      "Przedstawianie oferty",
      "Zbieranie leadów",
      "Kwalifikacja zapytań",
      "Odciążenie z powtarzalnej komunikacji",
    ],
    cta: "Wdrożenie chatbota AI",
  },
  {
    name: "Voicebot AI",
    price: "4 499",
    monthly: "450",
    icon: Mic,
    description: "Voicebot AI, który odbiera połączenia i prowadzi rozmowę za Ciebie",
    salesCopy: "To rozwiązanie dla firm, które chcą obsługiwać więcej połączeń bez zwiększania obciążenia zespołu.",
    features: [
      "Odbieranie telefonów",
      "Przekazywanie podstawowych informacji",
      "Umawianie terminów",
      "Kwalifikowanie rozmów",
      "Przekierowywanie klienta do odpowiedniej osoby",
    ],
    cta: "Zapytaj o voicebota AI",
  },
]

export function Pricing() {
  const scrollToContact = () => {
    document.getElementById("kontakt-formularz")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="cennik" className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Strony internetowe dopasowane do{" "}
            <span className="text-primary">Twojego biznesu</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Strony WWW, które nie tylko dobrze wyglądają, ale też pracują na wynik
          </p>
        </div>

        {/* Web Packages */}
        <div className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground">Strony internetowe</h3>
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
                  <p className="mt-0.5 text-xs text-primary font-medium">{pkg.subtitle}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>
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
                  onClick={scrollToContact}
                >
                  {pkg.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Packages */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <Bot className="h-6 w-6 text-accent" />
            <h3 className="text-2xl font-semibold text-foreground">Chatboty i voiceboty AI dla firm</h3>
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
                  
                  <p className="mb-2 text-sm font-medium text-foreground">{pkg.description}</p>
                  <p className="mb-4 text-sm text-muted-foreground italic">{pkg.salesCopy}</p>
                  
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
                  
                  <Button
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={scrollToContact}
                  >
                    {pkg.cta}
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
