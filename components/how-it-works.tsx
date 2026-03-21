import {
  Award,
  Bot,
  Briefcase,
  Building,
  Code,
  Eye,
  FileText,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  MessageSquare,
  Pencil,
  Rocket,
  Search,
  Settings,
  Shield,
  Smartphone,
  Target,
  User,
  Users,
} from "lucide-react"

const trustPoints = [
  { icon: Eye, text: "estetyczny, profesjonalny design" },
  { icon: MessageSquare, text: "czytelny przekaz sprzedażowy" },
  { icon: Search, text: "techniczne przygotowanie pod SEO" },
  { icon: Bot, text: "automatyzację obsługi dzięki AI" },
  { icon: Settings, text: "wygodne zarządzanie treścią" },
]

const benefits = [
  { icon: Award, text: "Profesjonalny wizerunek marki od pierwszego wejścia na stronę" },
  { icon: MessageSquare, text: "Większą liczbę zapytań dzięki lepiej zaprojektowanej komunikacji" },
  { icon: Smartphone, text: "Szybką i responsywną stronę dopasowaną do telefonów i komputerów" },
  { icon: HelpCircle, text: "Mniej powtarzalnych pytań dzięki chatbotowi lub voicebotowi AI" },
  { icon: Target, text: "Rozwiązanie dopasowane do Twojej branży, celu i budżetu" },
]

const processSteps = [
  { number: "01", title: "Brief", description: "Wysyłasz brief lub krótki opis swojej firmy.", icon: FileText },
  { number: "02", title: "Bezpłatny projekt", description: "Analizuję potrzeby i przygotowuję bezpłatny projekt strony głównej.", icon: Pencil },
  { number: "03", title: "Konsultacja", description: "Omawiamy uwagi i dopracowujemy kierunek.", icon: MessageCircle },
  { number: "04", title: "Realizacja", description: "Realizuję stronę lub wdrożenie AI.", icon: Code },
  { number: "05", title: "Publikacja", description: "Publikujemy gotowe rozwiązanie i przekazuję je do dalszego użycia.", icon: Rocket },
]

const targetAudience = [
  { icon: Building, text: "małymi i średnimi firmami" },
  { icon: Users, text: "lokalnymi usługami" },
  { icon: User, text: "markami osobistymi" },
  { icon: Lightbulb, text: "startupami" },
  { icon: Briefcase, text: "firmami, które chcą zautomatyzować kontakt z klientem" },
]

export function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="relative px-4 py-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-32">
        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Strona internetowa to dopiero <span className="text-primary">początek</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Dobra strona nie ma tylko wyglądać nowocześnie. Ma wzbudzać zaufanie, jasno komunikować ofertę i prowadzić klienta do kontaktu lub zakupu.
            </p>
          </div>

          <div className="mb-8 text-center">
            <p className="text-lg font-medium text-foreground">Dlatego tworzę rozwiązania, które łączą:</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <point.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{point.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Co zyskujesz dzięki <span className="text-primary">współpracy</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-muted-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Prosty proces, bez chaosu i bez <span className="text-primary">przepalania budżetu</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl font-bold text-primary/30">{step.number}</span>
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>

                {index < processSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center italic text-muted-foreground">
            Nie kupujesz w ciemno. Najpierw widzisz koncepcję, potem podejmujesz decyzję.
          </p>
        </div>

        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Dla kogo jest ta <span className="text-primary">oferta</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Współpracuję z:</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {targetAudience.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-muted-foreground">
              Jeśli potrzebujesz strony, która wygląda profesjonalnie i realnie wspiera sprzedaż, albo chcesz wdrożyć AI do obsługi klientów - <span className="font-semibold text-foreground">ta oferta jest dla Ciebie.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
