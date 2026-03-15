"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Ile trwa wykonanie strony internetowej?",
    answer: "Czas realizacji zależy od zakresu projektu. Prosty landing page mogę przygotować nawet w kilka dni, a bardziej rozbudowana strona firmowa zwykle powstaje w około 1 do 2 tygodni od momentu dostarczenia materiałów i akceptacji projektu.",
  },
  {
    question: "Czy mogę zobaczyć projekt przed rozpoczęciem pełnej współpracy?",
    answer: "Tak. Zaczynam od bezpłatnego projektu strony głównej, aby pokazać Ci kierunek wizualny i komunikacyjny. Dzięki temu nie kupujesz w ciemno i od początku wiesz, w jaką stronę idzie projekt.",
  },
  {
    question: "Czy strona będzie działać na telefonach?",
    answer: "Tak. Każda strona jest projektowana responsywnie, dzięki czemu dobrze wygląda i działa na smartfonach, tabletach oraz komputerach.",
  },
  {
    question: "Czy mogę samodzielnie edytować treści na stronie?",
    answer: "Tak. Otrzymujesz CMS, który pozwala wygodnie zmieniać teksty, zdjęcia i wybrane elementy strony bez konieczności ingerencji w kod.",
  },
  {
    question: "Czy pomagasz w napisaniu treści na stronę?",
    answer: "Tak. Mogę przygotować treści od zera albo przeredagować materiały, które już masz, tak aby były bardziej profesjonalne, czytelne i nastawione na konwersję.",
  },
  {
    question: "Czy strona będzie przygotowana pod SEO?",
    answer: "Tak. Dbam o techniczne podstawy SEO, strukturę nagłówków, szybkość działania, responsywność oraz logiczny układ treści, który ułatwia pozycjonowanie.",
  },
  {
    question: "Co będzie mi potrzebne do startu?",
    answer: "Na początek wystarczy krótki opis firmy, zakres usług, logo, dane kontaktowe i przykłady stron, które Ci się podobają. Jeśli nie masz gotowych materiałów, pomogę Ci uporządkować wszystko krok po kroku.",
  },
  {
    question: "Czy mogę zlecić tylko sam projekt lub tylko wdrożenie?",
    answer: "Tak. Zakres współpracy można dopasować do Twoich potrzeb. Mogę przygotować sam projekt, samo wdrożenie albo zająć się całością.",
  },
  {
    question: "Jak działa chatbot AI na stronie?",
    answer: "Chatbot AI korzysta z informacji o Twojej firmie i odpowiada klientom w czasie rzeczywistym. Może przedstawiać ofertę, odpowiadać na pytania, zbierać leady i kierować użytkownika do odpowiedniego działania.",
  },
  {
    question: "Czy chatbot AI można dopasować do mojej branży?",
    answer: "Tak. Bot jest dopasowywany do Twojej oferty, języka komunikacji i scenariuszy rozmów, dzięki czemu nie działa jak przypadkowe narzędzie, tylko jak realne wsparcie dla Twojego biznesu.",
  },
  {
    question: "Jak działa voicebot AI?",
    answer: "Voicebot AI prowadzi rozmowę głosową z klientem, odpowiada na najczęstsze pytania, może zbierać podstawowe dane, umawiać kontakt i w razie potrzeby przekierować połączenie do człowieka.",
  },
  {
    question: "Dla kogo voicebot AI ma największy sens?",
    answer: "Najczęściej korzystają z niego firmy usługowe, rejestracje, branże lokalne, sprzedaż i firmy, które odbierają dużo powtarzalnych telefonów. Jeśli połączenia zabierają Ci czas, voicebot może mocno odciążyć zespół.",
  },
  {
    question: "Czy oferujesz wsparcie po wdrożeniu?",
    answer: "Tak. Po uruchomieniu strony lub bota mogę zapewnić opiekę techniczną, aktualizacje, poprawki i dalszy rozwój rozwiązania.",
  },
  {
    question: "Ile kosztuje utrzymanie chatbotów i voicebotów?",
    answer: "Na stronie widoczny jest model z opłatą wdrożeniową oraz miesięcznym utrzymaniem dla chatbotów i voicebotów AI. Finalny zakres może zależeć od liczby funkcji, integracji i scenariuszy rozmów.",
  },
  {
    question: "Czy współpraca jest dobra także dla małych firm?",
    answer: "Tak. Dobrze zaprojektowana strona i prosta automatyzacja AI są szczególnie wartościowe dla małych firm, bo pomagają wyglądać profesjonalnie i lepiej wykorzystać czas bez rozbudowy zespołu.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Najczęstsze <span className="text-primary">pytania</span>
          </h2>
          <p className="text-muted-foreground">
            Znajdź odpowiedzi na pytania dotyczące stron internetowych, chatbotów i voicebotów AI.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border bg-card/50 px-6 backdrop-blur-sm transition-colors data-[state=open]:border-primary/30 data-[state=open]:bg-primary/5"
            >
              <AccordionTrigger className="py-4 text-left text-foreground hover:no-underline [&[data-state=open]>svg]:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
