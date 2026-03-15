"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const WEB3FORMS_KEY = "2e896285-38f9-493c-a40d-f7ff0509a7da"

export function InlineContactForm() {
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

      // Also save to DB (non-blocking)
      const jsonData = {
        name: formData.get("name") as string,
        company: "",
        email: formData.get("email") as string,
        phone: formData.get("phone") as string || "",
        serviceType: formData.get("service") as string || "ogólne",
        budget: "",
        timeline: "",
        message: formData.get("message") as string,
        website: "",
      }

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      }).catch(() => {})

      setIsSubmitted(true)
    } catch {
      setError("Nie udało się wysłać wiadomości. Sprawdź połączenie.")
    }
    setIsSubmitting(false)
  }

  return (
    <section id="kontakt-formularz" className="relative py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Opowiedz krótko, czego <span className="text-primary">potrzebujesz</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Napisz, czy interesuje Cię strona internetowa, chatbot AI, voicebot AI lub pełne rozwiązanie. Odpowiem z konkretną propozycją dalszych kroków.
          </p>
        </div>

        {isSubmitted ? (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
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
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-8">
            {/* Web3Forms honeypot */}
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="inline-name" className="mb-2 block text-sm font-medium text-foreground">
                  Imię / nazwa firmy *
                </label>
                <Input
                  id="inline-name"
                  name="name"
                  required
                  placeholder="Jan Kowalski"
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <label htmlFor="inline-email" className="mb-2 block text-sm font-medium text-foreground">
                  Adres e-mail *
                </label>
                <Input
                  id="inline-email"
                  name="email"
                  type="email"
                  required
                  placeholder="jan@firma.pl"
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="inline-phone" className="mb-2 block text-sm font-medium text-foreground">
                  Numer telefonu
                </label>
                <Input
                  id="inline-phone"
                  name="phone"
                  type="tel"
                  placeholder="+48 123 456 789"
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <label htmlFor="inline-service" className="mb-2 block text-sm font-medium text-foreground">
                  Czego potrzebujesz?
                </label>
                <select
                  id="inline-service"
                  name="service"
                  className="w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Wybierz...</option>
                  <option value="Landing page">Landing page</option>
                  <option value="Strona firmowa">Strona firmowa</option>
                  <option value="Sklep internetowy">Sklep internetowy</option>
                  <option value="Chatbot AI">Chatbot AI</option>
                  <option value="Voicebot AI">Voicebot AI</option>
                  <option value="Strona + AI">Strona + AI</option>
                  <option value="Inne">Inne</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="inline-message" className="mb-2 block text-sm font-medium text-foreground">
                Opisz krótko swój projekt *
              </label>
              <Textarea
                id="inline-message"
                name="message"
                required
                rows={4}
                placeholder="Opisz krótko swój projekt lub zadaj pytanie..."
                className="bg-secondary/50 border-border resize-none"
              />
              <p className="mt-1 text-xs text-muted-foreground">Możesz odpisać w 2–3 zdaniach. Jeśli nie masz materiałów, pomogę Ci je przygotować.</p>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
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
        )}
      </div>
    </section>
  )
}
