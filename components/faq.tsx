"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Ile kosztuje stworzenie strony internetowej?",
    answer:
      "Ceny zaczynają się od 999 zł za prostą stronę one-page. Strona firmowa z kilkoma podstronami to koszt od 2 899 zł. Sklepy internetowe i zaawansowane aplikacje webowe wyceniamy indywidualnie po analizie wymagań. Wszystkie ceny są cenami netto.",
  },
  {
    question: "Jak długo trwa realizacja projektu strony WWW?",
    answer:
      "Proste strony one-page realizujemy w 7 dni roboczych. Rozbudowane strony firmowe z pakietu Elite Performance dostarczamy w ciągu 14 dni. Projekty custom, jak sklepy czy aplikacje, wymagają 4-8 tygodni w zależności od złożoności.",
  },
  {
    question: "Czy chatbot AI faktycznie rozumie język polski?",
    answer:
      "Tak, nasze chatboty są trenowane na najnowszych modelach językowych, które doskonale radzą sobie z językiem polskim - rozumieją kontekst, odmianę wyrazów i potoczne wyrażenia. Dodatkowo trenujemy je na danych specyficznych dla Twojej branży.",
  },
  {
    question: "Dlaczego muszę płacić abonament za chatbota lub voicebota?",
    answer:
      "Abonament pokrywa koszty infrastruktury serwerowej, mocy obliczeniowej AI, aktualizacji modeli językowych oraz bieżącego wsparcia technicznego. Dzięki temu Twój bot działa stabilnie 24/7 i jest stale ulepszany bez dodatkowych kosztów po Twojej stronie.",
  },
  {
    question: "Ile rozmów może obsłużyć voicebot jednocześnie?",
    answer:
      "Nasz voicebot może prowadzić setki rozmów jednocześnie - nie ma kolejek ani czasu oczekiwania. To rozwiązanie skaluje się automatycznie w zależności od obciążenia, więc nawet w szczycie sezonu Twoi klienci nie czekają na połączenie.",
  },
  {
    question: "Czy mogę samodzielnie edytować treści na stronie?",
    answer:
      "Oczywiście. Każda strona z naszej oferty zawiera intuicyjny panel CMS, dzięki któremu możesz samodzielnie edytować teksty, zdjęcia i dodawać nowe treści. Przeprowadzamy też krótkie szkolenie z obsługi panelu.",
  },
  {
    question: "Co jeśli chatbot nie zna odpowiedzi na pytanie?",
    answer:
      "Chatbot jest przeszkolony, aby w sytuacji niepewności przekierować rozmowę do żywego konsultanta lub poprosić o dane kontaktowe, byś mógł oddzwonić. Nigdy nie wymyśla odpowiedzi - priorytetem jest profesjonalna obsługa klienta.",
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
            Często zadawane <span className="text-primary">pytania</span>
          </h2>
          <p className="text-muted-foreground">
            Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług.
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
