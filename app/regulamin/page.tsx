import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Regulamin | Synapsite",
  description: "Regulamin serwisu synapsite.pl — zasady korzystania z serwisu internetowego.",
}

export default function RegulaminPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Wróć do strony
          </Link>

          <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
            Regulamin serwisu synapsite.pl
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground [&>h2]:text-foreground [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1">

            <h2>1. Postanowienia ogólne</h2>
            <p>Regulamin określa zasady korzystania z serwisu internetowego synapsite.pl, prowadzonego przez:<br />
            <strong className="text-foreground">Kacper Drozd</strong><br />
            Lublin<br />
            E-mail: kontakt@synapsite.pl</p>
            <p>Serwis służy prezentacji oferty usług tworzenia stron internetowych oraz chatbotów i voicebotów AI oraz umożliwia kontakt z Administratorem.</p>

            <h2>2. Zakres usług</h2>
            <ul>
              <li>udostępnianie treści informacyjnych dotyczących oferty,</li>
              <li>umożliwienie skorzystania z formularza kontaktowego w celu złożenia zapytania.</li>
            </ul>
            <p>Zawarcie umowy na wykonanie usług następuje indywidualnie po ustaleniu zakresu prac.</p>

            <h2>3. Warunki techniczne</h2>
            <ul>
              <li>urządzenie z dostępem do Internetu,</li>
              <li>aktualna przeglądarka obsługująca JavaScript i cookies,</li>
              <li>aktywny adres e‑mail w przypadku chęci kontaktu.</li>
            </ul>

            <h2>4. Zasady korzystania</h2>
            <ul>
              <li>nieprzekazywania treści bezprawnych lub obraźliwych,</li>
              <li>niepodejmowania działań zakłócających działanie Serwisu,</li>
              <li>niewykorzystywania danych kontaktowych do spamu.</li>
            </ul>

            <h2>5. Zawarcie umowy</h2>
            <p>Informacje w Serwisie nie stanowią oferty w rozumieniu KC, lecz zaproszenie do zawarcia umowy. Warunki ustalane są indywidualnie.</p>

            <h2>6. Odpowiedzialność</h2>
            <p>Administrator nie ponosi odpowiedzialności za przerwy spowodowane siłą wyższą, szkody z korzystania niezgodnego z prawem ani treści stron trzecich.</p>

            <h2>7. Reklamacje</h2>
            <p>Reklamacje na adres: kontakt@synapsite.pl. Rozpatrzenie w ciągu 30 dni.</p>

            <h2>8. Prawa autorskie</h2>
            <p>Treści Serwisu podlegają ochronie prawnoautorskiej. Kopiowanie bez zgody jest zabronione.</p>

            <h2>9. Dane osobowe</h2>
            <p>Zasady przetwarzania danych opisane są w{" "}
              <Link href="/polityka-prywatnosci" className="text-primary hover:underline">Polityce prywatności</Link>.
            </p>

            <h2>10. Postanowienia końcowe</h2>
            <p>Administrator zastrzega prawo do zmian Regulaminu. Korzystanie z Serwisu po zmianach oznacza akceptację nowej treści. W sprawach nieuregulowanych stosuje się prawo polskie.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
