import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Regulamin | Synapsite",
  description: "Regulamin serwisu synapsite.pl — zasady korzystania z serwisu internetowego.",
}

export default function RegulaminPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-24">
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
          <p>Każdy użytkownik zobowiązany jest do korzystania z Serwisu w sposób zgodny z przepisami prawa, niniejszym Regulaminem oraz dobrymi obyczajami.</p>

          <h2>2. Zakres usług świadczonych drogą elektroniczną</h2>
          <p>Za pośrednictwem Serwisu świadczone są w szczególności następujące usługi:</p>
          <ul>
            <li>udostępnianie treści informacyjnych dotyczących oferty,</li>
            <li>umożliwienie skorzystania z formularza kontaktowego lub danych kontaktowych w celu złożenia zapytania.</li>
          </ul>
          <p>Zawarcie właściwej umowy na wykonanie usług następuje indywidualnie – po ustaleniu zakresu prac, harmonogramu i warunków współpracy.</p>

          <h2>3. Warunki techniczne korzystania z Serwisu</h2>
          <p>Do korzystania z Serwisu wymagane jest:</p>
          <ul>
            <li>urządzenie z dostępem do Internetu,</li>
            <li>aktualna przeglądarka internetowa obsługująca JavaScript i cookies,</li>
            <li>aktywny adres e‑mail w przypadku chęci kontaktu z Administratorem.</li>
          </ul>

          <h2>4. Zasady korzystania z Serwisu</h2>
          <p>Użytkownik zobowiązuje się w szczególności do:</p>
          <ul>
            <li>nieprzekazywania treści bezprawnych, obraźliwych lub naruszających prawa osób trzecich,</li>
            <li>niepodejmowania działań mogących zakłócić działanie Serwisu,</li>
            <li>niewykorzystywania danych kontaktowych do wysyłania niezamówionych informacji handlowych (spam).</li>
          </ul>
          <p>Administrator ma prawo czasowo ograniczyć dostęp do Serwisu ze względu na prace techniczne, konserwację lub modernizację.</p>

          <h2>5. Zawarcie umowy</h2>
          <p>Informacje prezentowane w Serwisie nie stanowią oferty w rozumieniu Kodeksu cywilnego, lecz zaproszenie do zawarcia umowy.</p>
          <p>W celu zawarcia umowy Użytkownik kontaktuje się z Administratorem (m.in. poprzez formularz, e‑mail, telefon), a następnie strony indywidualnie ustalają warunki współpracy.</p>
          <p>Szczegółowy zakres prac, terminy oraz wynagrodzenie są każdorazowo określane w korespondencji, ofercie lub umowie.</p>

          <h2>6. Odpowiedzialność</h2>
          <p>Administrator dokłada starań, aby Serwis działał w sposób ciągły i prawidłowy, ale nie gwarantuje dostępności Serwisu w każdym czasie.</p>
          <p>Administrator nie ponosi odpowiedzialności za:</p>
          <ul>
            <li>przerwy w działaniu Serwisu spowodowane siłą wyższą, awarią lub pracami technicznymi,</li>
            <li>szkody wynikłe z korzystania z Serwisu w sposób sprzeczny z prawem lub Regulaminem,</li>
            <li>treści stron trzecich, do których prowadzą linki zamieszczone w Serwisie.</li>
          </ul>

          <h2>7. Reklamacje</h2>
          <p>Użytkownik może zgłaszać reklamacje dotyczące funkcjonowania Serwisu lub współpracy na adres e‑mail: kontakt@synapsite.pl.</p>
          <p>W zgłoszeniu warto podać opis problemu oraz dane kontaktowe.</p>
          <p>Administrator rozpatruje reklamacje w terminie do 30 dni od dnia jej otrzymania i udziela odpowiedzi na wskazany adres e‑mail.</p>

          <h2>8. Prawa autorskie</h2>
          <p>Wszelkie treści opublikowane w Serwisie, w tym teksty, grafiki oraz układ strony, podlegają ochronie prawnoautorskiej.</p>
          <p>Zabronione jest kopiowanie, modyfikowanie lub rozpowszechnianie treści Serwisu bez zgody Administratora, z wyjątkiem przypadków przewidzianych przez przepisy prawa.</p>

          <h2>9. Dane osobowe</h2>
          <p>Zasady przetwarzania danych osobowych użytkowników Serwisu opisane są w{" "}
            <Link href="/polityka-prywatnosci" className="text-primary hover:underline">Polityce prywatności</Link>{" "}
            dostępnej na stronie synapsite.pl.
          </p>

          <h2>10. Postanowienia końcowe</h2>
          <p>Administrator zastrzega sobie prawo do zmiany Regulaminu, w szczególności w przypadku zmian w funkcjonowaniu Serwisu lub przepisach prawa.</p>
          <p>Zmieniony Regulamin będzie publikowany w Serwisie, a korzystanie z Serwisu po wprowadzeniu zmian oznacza akceptację nowej treści.</p>
          <p>W sprawach nieuregulowanych Regulaminem zastosowanie mają przepisy prawa polskiego.</p>
        </div>
      </div>
    </main>
  )
}
