"use client"

import { useState } from "react"
import { X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      serviceType: formData.get("service") as string,
      budget: formData.get("budget") as string,
      timeline: formData.get("timeline") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string, // honeypot
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.errors) {
          setErrors(result.errors)
        }
        toast({
          title: "Błąd",
          description: result.error || "Wystąpił błąd. Spróbuj ponownie.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
      }, 3000)
    } catch {
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać wiadomości. Sprawdź połączenie.",
        variant: "destructive",
      })
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
                Wiadomość wysłana!
              </h3>
              <p className="text-muted-foreground">
                Odezwiemy się najszybciej jak to możliwe.
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Skontaktuj się z nami
              </h2>
              <p className="mb-6 text-muted-foreground">
                Opisz swój projekt, a my odezwiemy się w ciągu 24h.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot - hidden from users, visible to bots */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      Imię i nazwisko *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Jan Kowalski"
                      className="bg-secondary/50 border-border"
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name[0]}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                      Firma
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Nazwa firmy"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jan@firma.pl"
                      className="bg-secondary/50 border-border"
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email[0]}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+48 123 456 789"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-foreground">
                    Czym jesteś zainteresowany? *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Wybierz usługę...</option>
                    <option value="www">Strona WWW</option>
                    <option value="sklep">Sklep internetowy</option>
                    <option value="chatbot">Chatbot AI</option>
                    <option value="voicebot">Voicebot AI</option>
                    <option value="automatyzacja">Automatyzacja procesów</option>
                    <option value="inne">Inne</option>
                  </select>
                  {errors.serviceType && <p className="mt-1 text-xs text-destructive">{errors.serviceType[0]}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className="mb-2 block text-sm font-medium text-foreground">
                      Budżet
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Wybierz zakres...</option>
                      <option value="do-2000">Do 2 000 zł</option>
                      <option value="2000-5000">2 000 - 5 000 zł</option>
                      <option value="5000-10000">5 000 - 10 000 zł</option>
                      <option value="10000-20000">10 000 - 20 000 zł</option>
                      <option value="powyzej-20000">Powyżej 20 000 zł</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="mb-2 block text-sm font-medium text-foreground">
                      Termin realizacji
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Wybierz termin...</option>
                      <option value="asap">Jak najszybciej</option>
                      <option value="1-miesiac">W ciągu miesiąca</option>
                      <option value="1-3-miesiace">1-3 miesiące</option>
                      <option value="3-6-miesiecy">3-6 miesięcy</option>
                      <option value="brak-presji">Bez pośpiechu</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    Wiadomość *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Opisz swój projekt lub zadaj pytanie..."
                    className="bg-secondary/50 border-border resize-none"
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message[0]}</p>}
                </div>

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
