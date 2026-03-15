"use client"

import { useState } from "react"
import { X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const WEB3FORMS_KEY = "2e896285-38f9-493c-a40d-f7ff0509a7da"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    formData.append("access_key", WEB3FORMS_KEY)
    formData.append("subject", `Nowe zapytanie ze strony synapsite.pl – ${formData.get("name")}`)
    formData.append("from_name", "Synapsite.pl")

    try {
      // Send to Web3Forms
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      const web3Data = await web3Response.json()

      if (!web3Data.success) {
        setError("Nie udało się wysłać wiadomości. Spróbuj ponownie.")
        setIsSubmitting(false)
        return
      }

      // Save to DB for admin panel
      const jsonData = {
        name: formData.get("name") as string,
        company: formData.get("company") as string || "",
        email: formData.get("email") as string,
        phone: formData.get("phone") as string || "",
        serviceType: formData.get("service") as string || "",
        budget: formData.get("budget") as string || "",
        timeline: formData.get("timeline") as string || "",
        message: formData.get("message") as string,
        website: "",
      }

      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData),
        })
      } catch (dbErr) {
        console.error("DB save failed:", dbErr)
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
      }, 4000)
    } catch {
      setError("Nie udało się wysłać wiadomości. Sprawdź połączenie.")
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4 max-h-[90vh] overflow-y-auto">
        <div className="relative rounded-2xl border border-border bg-card p-6 shadow-2xl md:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Glow effect */}
          <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl" />

          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Dziękuję za wiadomość!
              </h3>
              <p className="text-muted-foreground">
                Wrócę do Ciebie tak szybko, jak to możliwe z propozycją kolejnych kroków.
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Opowiedz krótko, czego potrzebujesz
              </h2>
              <p className="mb-6 text-muted-foreground">
                Napisz, czy interesuje Cię strona internetowa, chatbot AI, voicebot AI lub pełne rozwiązanie. Odpowiem z konkretną propozycją dalszych kroków.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot for Web3Forms */}
                <input type="checkbox" name="botcheck" className="hidden" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="modal-name" className="mb-2 block text-sm font-medium text-foreground">
                      Imię / nazwa firmy *
                    </label>
                    <Input
                      id="modal-name"
                      name="name"
                      required
                      placeholder="Jan Kowalski lub Firma ABC"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-company" className="mb-2 block text-sm font-medium text-foreground">
                      Firma
                    </label>
                    <Input
                      id="modal-company"
                      name="company"
                      placeholder="Nazwa firmy"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="modal-email" className="mb-2 block text-sm font-medium text-foreground">
                      Adres e-mail *
                    </label>
                    <Input
                      id="modal-email"
                      name="email"
                      type="email"
                      required
                      placeholder="jan@firma.pl"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-phone" className="mb-2 block text-sm font-medium text-foreground">
                      Numer telefonu
                    </label>
                    <Input
                      id="modal-phone"
                      name="phone"
                      type="tel"
                      placeholder="+48 123 456 789"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-service" className="mb-2 block text-sm font-medium text-foreground">
                    Czego potrzebujesz? *
                  </label>
                  <select
                    id="modal-service"
                    name="service"
                    required
                    className="w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Wybierz usługę...</option>
                    <option value="Landing page">Landing page / one page</option>
                    <option value="Strona firmowa">Strona firmowa</option>
                    <option value="Sklep internetowy">Sklep internetowy</option>
                    <option value="Chatbot AI">Chatbot AI</option>
                    <option value="Voicebot AI">Voicebot AI</option>
                    <option value="Strona + AI">Pełne rozwiązanie (strona + AI)</option>
                    <option value="Inne">Inne</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="modal-budget" className="mb-2 block text-sm font-medium text-foreground">
                      Budżet
                    </label>
                    <select
                      id="modal-budget"
                      name="budget"
                      className="w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Wybierz zakres...</option>
                      <option value="Do 2 000 zł">Do 2 000 zł</option>
                      <option value="2 000 - 5 000 zł">2 000 - 5 000 zł</option>
                      <option value="5 000 - 10 000 zł">5 000 - 10 000 zł</option>
                      <option value="10 000 - 20 000 zł">10 000 - 20 000 zł</option>
                      <option value="Powyżej 20 000 zł">Powyżej 20 000 zł</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="modal-timeline" className="mb-2 block text-sm font-medium text-foreground">
                      Termin realizacji
                    </label>
                    <select
                      id="modal-timeline"
                      name="timeline"
                      className="w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Wybierz termin...</option>
                      <option value="Jak najszybciej">Jak najszybciej</option>
                      <option value="W ciągu miesiąca">W ciągu miesiąca</option>
                      <option value="1-3 miesiące">1-3 miesiące</option>
                      <option value="3-6 miesięcy">3-6 miesięcy</option>
                      <option value="Bez pośpiechu">Bez pośpiechu</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-message" className="mb-2 block text-sm font-medium text-foreground">
                    Opisz krótko swój projekt *
                  </label>
                  <Textarea
                    id="modal-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Opisz krótko swój projekt lub zadaj pytanie..."
                    className="bg-secondary/50 border-border resize-none"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Im więcej konkretów, tym lepsza wycena</p>
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Wyślij wiadomość
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
