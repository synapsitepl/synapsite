import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Polityka prywatności | Synapsite",
  description: "Polityka prywatności serwisu synapsite.pl — zasady przetwarzania danych osobowych.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Wróć do strony
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
          Polityka prywatności – synapsite.pl
        </h1>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground [&>h2]:text-foreground [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-foreground [&>h3]:font-medium [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1">

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
            <li>Udzielenie odpowiedzi na zapytania przesłane za pośrednictwem formularza kontaktowego lub bezpośrednio na adres e‑mail – art. 6 ust. 1 lit. b lub f RODO.</li>
            <li>Zawarcie i realizacja umowy o świadczenie usług (m.in. wykonanie strony internetowej, wdrożenie chatbota/voicebota) – art. 6 ust. 1 lit. b RODO.</li>
            <li>Prowadzenie rozliczeń, archiwizacji dokumentów, ewentualne ustalenie, dochodzenie lub obrona roszczeń – art. 6 ust. 1 lit. c i f RODO.</li>
            <li>Prowadzenie działań marketingowych własnych usług – art. 6 ust. 1 lit. f RODO lub art. 6 ust. 1 lit. a RODO w przypadku zgody.</li>
            <li>Zapewnienie bezpieczeństwa Serwisu oraz tworzenie statystyk korzystania z Serwisu – art. 6 ust. 1 lit. f RODO.</li>
          </ul>

          <h2>4. Odbiorcy danych</h2>
          <p>Dane osobowe mogą być przekazywane podmiotom współpracującym przy obsłudze Serwisu i świadczeniu usług, w szczególności dostawcom hostingu, narzędzi analitycznych, usług IT, księgowych, prawnych i marketingowych.</p>
          <p>Dane mogą być przekazywane organom publicznym w zakresie wymaganym przez przepisy prawa.</p>

          <h2>5. Okres przechowywania danych</h2>
          <ul>
            <li>Dane przetwarzane w celu udzielenia odpowiedzi na zapytanie będą przechowywane przez okres konieczny do obsługi korespondencji, a następnie przez czas przedawnienia ewentualnych roszczeń.</li>
            <li>Dane przetwarzane w związku z realizacją umowy będą przechowywane przez czas trwania umowy oraz przez okres wymagany przez przepisy o rachunkowości i przedawnieniu roszczeń.</li>
            <li>Dane przetwarzane na podstawie zgody będą przechowywane do momentu jej wycofania, a po tym czasie przez okres przedawnienia roszczeń.</li>
          </ul>

          <h2>6. Prawa osób, których dane dotyczą</h2>
          <p>Użytkownikowi przysługuje:</p>
          <ul>
            <li>prawo dostępu do danych,</li>
            <li>prawo do ich sprostowania,</li>
            <li>prawo do usunięcia danych,</li>
            <li>prawo do ograniczenia przetwarzania,</li>
            <li>prawo do przenoszenia danych,</li>
            <li>prawo sprzeciwu wobec przetwarzania,</li>
            <li>prawo do wycofania zgody,</li>
            <li>prawo wniesienia skargi do Prezesa UODO.</li>
          </ul>

          <h2>7. Pliki cookies i narzędzia analityczne</h2>
          <p>Serwis wykorzystuje pliki cookies w celu prawidłowego działania, dopasowania treści do preferencji użytkownika oraz prowadzenia anonimowych statystyk.</p>
          <p>Użytkownik może zarządzać plikami cookies w ustawieniach swojej przeglądarki.</p>
          <p>Serwis może korzystać z narzędzi analitycznych (np. Google Analytics), które zbierają anonimowe dane statystyczne na temat korzystania z Serwisu.</p>

          <h2>8. Dobrowolność podania danych</h2>
          <p>Podanie danych osobowych jest dobrowolne, ale może być konieczne do udzielenia odpowiedzi na zapytanie, przygotowania oferty lub zawarcia umowy.</p>

          <h2>9. Zmiany polityki prywatności</h2>
          <p>Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce prywatności.</p>
          <p>Aktualna treść Polityki publikowana jest w Serwisie.</p>
        </div>
      </div>
    </main>
  )
}
