"use client"

import { FileText, CheckCircle, Code, Rocket, CreditCard, Receipt, Banknote } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Projekt Graficzny",
    description: "Po zamówieniu i dostarczeniu materiałów - wykonam dla Państwa projekt graficzny (statyczny) strony głównej.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Twoja Decyzja",
    description: "Po zapoznaniu się z projektem i ew. wprowadzeniu poprawek, zdecydują Państwo czy rozpoczynamy współpracę i czy mam tworzyć stronę.",
    icon: CheckCircle,
  },
  {
    number: "03",
    title: "Realizacja i Kodowanie",
    description: "Jeżeli tak, rozpoczynam kodowanie i w trakcie realizacji podsyłam zrealizowane podstrony do oceny i poprawek.",
    icon: Code,
  },
  {
    number: "04",
    title: "Wdrożenie",
    description: "Po skończeniu podstron i akceptacji przez Państwa, wdrażam stronę na Wasz serwer.",
    icon: Rocket,
  },
]

const payments = [
  {
    title: "Projekt Graficzny",
    value: "FREE",
    description: "Wykonanie projektu graficznego strony głównej: bez płatności",
    label: "Bez Opłat",
    icon: CreditCard,
  },
  {
    title: "Zaliczka",
    value: "50%",
    description: "Po akceptacji projektu strony głównej i decyzji o rozpoczęciu współpracy: zaliczka 50% na podstawie proformy",
    label: "Faktura Proforma",
    icon: Receipt,
  },
  {
    title: "Finalizacja",
    value: "50%",
    description: "Po ukończeniu wszystkich podstron i pełnym wdrożeniu strony na serwer: płatność 50% na podstawie proformy",
    label: "Faktura Proforma",
    icon: Banknote,
  },
]

export function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="relative py-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Jak to działa
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Prosty, przejrzysty, 100% asynchroniczny proces
          </p>
        </div>
        
        {/* Process Steps */}
        <div className="mb-24">
          <h3 className="mb-10 text-center text-xl font-semibold text-foreground md:text-2xl">
            Przebieg realizacji
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl font-bold text-primary/30">{step.number}</span>
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Payments */}
        <div>
          <div className="mb-10 text-center">
            <h3 className="mb-2 text-xl font-semibold text-foreground md:text-2xl">
              Płatności
            </h3>
            <p className="text-muted-foreground">
              Przejrzysty model rozliczeń - 50% / 50% lub 100% z góry
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {payments.map((payment, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex items-center justify-between">
                  <payment.icon className="h-8 w-8 text-primary" />
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    payment.value === "FREE" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-primary/20 text-primary"
                  }`}>
                    {payment.label}
                  </span>
                </div>
                
                <h4 className="mb-1 text-lg font-semibold text-foreground">{payment.title}</h4>
                <div className="mb-3 text-3xl font-bold text-primary">{payment.value}</div>
                <p className="text-sm text-muted-foreground">{payment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
