import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Polityka prywatności | Synapsite",
  description: "Polityka prywatności serwisu synapsite.pl — zasady przetwarzania danych osobowych.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Wróć do strony
          </Link>

          <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
            Polityka prywatności – synapsite.pl
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground [&>h2]:text-foreground [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1">

            <h2>1. Informacje ogólne</h2>
            <p>Polityka prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu internetowego synapsite.pl (dalej: „Serwis").</p>
            <p>Administratorem danych osobowych jest:<br />
            <strong className="text-foreground">Kacper Drozd</strong><br />
            Lublin<br />
            E-mail: kontakt@synapsite.pl</p>
            <p>Dane osobowe użytkowników są przetwarzane zgodnie z obowiązującymi przepisami prawa, w szczególności z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 („RODO") oraz ustawą o świadczeniu usług drogą elektroniczną.</p>

            <h2>2. Zakres przetwarzanych danych</h2>
            <p>Administrator może przetwarzać w szczególności następujące dane:</p>
            <ul>
              <li>imię i nazwisko lub nazwa firmy,</li>
              <li>adres e-mail,</li>
              <li>numer telefonu,</li>
              <li>dane przekazane w treści wiadomości kontaktowej,</li>
              <li>dane techniczne związane z korzystaniem z Serwisu (adres IP, typ przeglądarki, dane o urządzeniu, pliki cookies).</li>
            </ul>

            <h2>3. Cele i podstawy przetwarzania</h2>
            <p>Dane osobowe mogą być przetwarzane w następujących celach:</p>
            <ul>
              <li>Udzielenie odpowiedzi na zapytania – art. 6 ust. 1 lit. b lub f RODO.</li>
              <li>Zawarcie i realizacja umowy o świadczenie usług – art. 6 ust. 1 lit. b RODO.</li>
              <li>Prowadzenie rozliczeń i archiwizacji – art. 6 ust. 1 lit. c i f RODO.</li>
              <li>Działania marketingowe własnych usług – art. 6 ust. 1 lit. f lub a RODO.</li>
              <li>Zapewnienie bezpieczeństwa Serwisu – art. 6 ust. 1 lit. f RODO.</li>
            </ul>

            <h2>4. Odbiorcy danych</h2>
            <p>Dane osobowe mogą być przekazywane podmiotom współpracującym przy obsłudze Serwisu, w szczególności dostawcom hostingu, narzędzi analitycznych, usług IT, księgowych, prawnych i marketingowych.</p>

            <h2>5. Okres przechowywania danych</h2>
            <ul>
              <li>Dane do obsługi zapytań – przez okres korespondencji i przedawnienia roszczeń.</li>
              <li>Dane umowne – przez czas umowy i okres wymagany przepisami.</li>
              <li>Dane na podstawie zgody – do momentu jej wycofania.</li>
            </ul>

            <h2>6. Prawa osób, których dane dotyczą</h2>
            <p>Użytkownikowi przysługuje prawo dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, sprzeciwu, wycofania zgody oraz wniesienia skargi do Prezesa UODO.</p>

            <h2>7. Pliki cookies</h2>
            <p>Serwis wykorzystuje pliki cookies. Użytkownik może zarządzać nimi w ustawieniach przeglądarki. Serwis może korzystać z narzędzi analitycznych zbierających anonimowe dane statystyczne.</p>

            <h2>8. Dobrowolność podania danych</h2>
            <p>Podanie danych jest dobrowolne, ale może być konieczne do udzielenia odpowiedzi, przygotowania oferty lub zawarcia umowy.</p>

            <h2>9. Zmiany polityki prywatności</h2>
            <p>Administrator zastrzega sobie prawo do zmian. Aktualna treść publikowana jest w Serwisie.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
