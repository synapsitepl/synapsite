export const companyKnowledge = {
  name: "Synapsite",
  tagline: "Agencja Web & AI",
  description:
    "Synapsite to polska agencja technologiczna specjalizująca się w tworzeniu nowoczesnych stron internetowych, sklepów online, chatbotów AI, voicebotów AI oraz automatyzacji procesów biznesowych. Łączymy świat web developmentu z najnowszymi technologiami sztucznej inteligencji.",
  location: "Warszawa, Polska",
  contact: {
    email: "kontakt@synapsite.pl",
    phone: "+48 123 456 789",
  },
  values: [
    "Profesjonalizm i terminowość",
    "Nowoczesne technologie (Next.js, React, AI)",
    "Przejrzysty proces współpracy",
    "Wsparcie po wdrożeniu",
    "Indywidualne podejście do każdego klienta",
  ],
}

export const servicesKnowledge = {
  websites: {
    name: "Strony WWW",
    packages: [
      {
        name: "One-Pager / Landing",
        price: "od 999 zł netto",
        timeline: "7 dni",
        features: [
          "1 responsywna podstrona",
          "Formularz kontaktowy",
          "Panel CMS",
          "Certyfikat SSL",
        ],
      },
      {
        name: "Elite Performance",
        price: "od 2 899 zł netto",
        timeline: "14 dni",
        features: [
          "Do 5 podstron",
          "Zaawansowana analityka (GA4, GTM)",
          "Pełne SEO techniczne",
          "Optymalizacja Core Web Vitals",
          "Integracja z social media",
        ],
        bestseller: true,
      },
      {
        name: "Custom App / Sklep",
        price: "wycena indywidualna",
        timeline: "4-8 tygodni",
        features: [
          "Systemy E-commerce (Next.js)",
          "Animacje GSAP/Three.js",
          "Integracje API",
          "Panel administracyjny",
          "Dedykowany opiekun projektu",
        ],
      },
    ],
  },
  chatbot: {
    name: "Chatbot AI",
    price: "od 1 999 zł netto (wdrożenie) + 200 zł/mc utrzymanie",
    features: [
      "Trening na danych firmy klienta",
      "Automatyczna kwalifikacja leadów",
      "Integracja ze stroną WWW",
      "Panel do zarządzania konwersacjami",
      "Raporty i statystyki",
      "Obsługa 24/7",
    ],
  },
  voicebot: {
    name: "Voicebot AI",
    price: "od 4 499 zł netto (wdrożenie) + 450 zł/mc utrzymanie",
    features: [
      "Naturalna synteza mowy po polsku",
      "Rezerwacje spotkań przez telefon",
      "Obsługa setek połączeń jednocześnie",
      "Integracja z kalendarzem",
      "Przekierowanie do konsultanta",
    ],
  },
}

export const processKnowledge = {
  steps: [
    {
      step: 1,
      name: "Projekt Graficzny",
      description:
        "Po zamówieniu i dostarczeniu materiałów wykonujemy projekt graficzny (statyczny) strony głównej — za darmo, bez zobowiązań.",
    },
    {
      step: 2,
      name: "Twoja Decyzja",
      description:
        "Po zapoznaniu się z projektem i ewentualnych poprawkach, klient decyduje czy rozpoczynamy współpracę.",
    },
    {
      step: 3,
      name: "Realizacja i Kodowanie",
      description:
        "Rozpoczynamy kodowanie i w trakcie realizacji podsyłamy zrealizowane podstrony do oceny i poprawek.",
    },
    {
      step: 4,
      name: "Wdrożenie",
      description:
        "Po akceptacji wdrażamy stronę na serwer klienta.",
    },
  ],
  payments: {
    model: "50% / 50%",
    details: [
      "Projekt graficzny: bezpłatny",
      "Zaliczka 50% po akceptacji projektu (faktura proforma)",
      "Pozostałe 50% po wdrożeniu (faktura proforma)",
      "Możliwa płatność 100% z góry",
    ],
  },
}

export const faqKnowledge = [
  {
    question: "Ile kosztuje stworzenie strony internetowej?",
    answer:
      "Ceny zaczynają się od 999 zł netto za stronę one-page. Strona firmowa Elite Performance to koszt od 2 899 zł netto. Sklepy i aplikacje wyceniamy indywidualnie.",
  },
  {
    question: "Jak długo trwa realizacja?",
    answer:
      "One-page: 7 dni. Elite Performance: 14 dni. Custom/sklep: 4-8 tygodni w zależności od złożoności.",
  },
  {
    question: "Czy chatbot rozumie język polski?",
    answer:
      "Tak, nasze chatboty są trenowane na najnowszych modelach AI, które doskonale radzą sobie z językiem polskim — rozumieją kontekst, odmianę i potoczne wyrażenia.",
  },
  {
    question: "Dlaczego jest abonament za chatbota/voicebota?",
    answer:
      "Abonament pokrywa koszty infrastruktury serwerowej, mocy obliczeniowej AI, aktualizacji modeli i bieżącego wsparcia technicznego.",
  },
  {
    question: "Czy mogę samodzielnie edytować treści?",
    answer:
      "Tak, każda strona zawiera panel CMS. Przeprowadzamy też szkolenie z obsługi.",
  },
  {
    question: "Co jeśli chatbot nie zna odpowiedzi?",
    answer:
      "Chatbot przekieruje rozmowę do konsultanta lub poprosi o dane kontaktowe. Nigdy nie wymyśla odpowiedzi.",
  },
]

export const objectionHandling = [
  {
    objection: "Za drogo",
    response:
      "Nasze ceny odzwierciedlają jakość — używamy najnowszych technologii (Next.js, React), zapewniamy szybkość, SEO i wsparcie. Inwestycja w profesjonalną stronę zwraca się przez generowanie leadów i budowanie wiarygodności.",
  },
  {
    objection: "Mogę zrobić sam / tańszy freelancer",
    response:
      "Oczywiście! Jednak oferujemy kompleksową usługę: projekt graficzny, kodowanie, SEO, wdrożenie i wsparcie w jednym miejscu. Oszczędzasz czas i masz pewność jakości.",
  },
  {
    objection: "Nie potrzebuję chatbota",
    response:
      "Chatbot działa 24/7 i może kwalifikować leady nawet gdy śpisz. Firmy, które wdrożyły chatbota, odnotowują średnio 30-40% więcej zapytań od potencjalnych klientów.",
  },
  {
    objection: "Muszę się zastanowić",
    response:
      "Oczywiście! Projekt graficzny strony głównej jest u nas bezpłatny i bez zobowiązań — możesz ocenić jakość naszej pracy przed podjęciem decyzji.",
  },
]

export function getFullKnowledgeText(): string {
  const sections = [
    `# O firmie Synapsite\n${companyKnowledge.description}\nLokalizacja: ${companyKnowledge.location}\nKontakt: ${companyKnowledge.contact.email}, ${companyKnowledge.contact.phone}`,

    `# Usługi — Strony WWW\n${servicesKnowledge.websites.packages
      .map(
        (p) =>
          `## ${p.name}\nCena: ${p.price}\nRealizacja: ${p.timeline}\nZawiera: ${p.features.join(", ")}`
      )
      .join("\n\n")}`,

    `# Usługi — Chatbot AI\nCena: ${servicesKnowledge.chatbot.price}\nFunkcje: ${servicesKnowledge.chatbot.features.join(", ")}`,

    `# Usługi — Voicebot AI\nCena: ${servicesKnowledge.voicebot.price}\nFunkcje: ${servicesKnowledge.voicebot.features.join(", ")}`,

    `# Proces współpracy\n${processKnowledge.steps
      .map((s) => `${s.step}. ${s.name}: ${s.description}`)
      .join("\n")}`,

    `# Płatności\nModel: ${processKnowledge.payments.model}\n${processKnowledge.payments.details.join("\n")}`,

    `# FAQ\n${faqKnowledge.map((f) => `P: ${f.question}\nO: ${f.answer}`).join("\n\n")}`,

    `# Obsługa obiekcji\n${objectionHandling
      .map((o) => `Obiekcja: "${o.objection}"\nOdpowiedź: ${o.response}`)
      .join("\n\n")}`,
  ]

  return sections.join("\n\n---\n\n")
}
