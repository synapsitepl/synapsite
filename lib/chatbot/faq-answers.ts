// faq-answers.ts
export interface FAQAnswer {
  id: string;
  category:
    | "pricing"
    | "process"
    | "website"
    | "chatbot"
    | "voicebot"
    | "custom"
    | "general";
  patterns: string[];
  answer: string;
  followUp?: string;
  priority?: number;
}

const FAQ_ANSWERS: FAQAnswer[] = [
  {
    id: "website-pricing",
    category: "pricing",
    priority: 10,
    patterns: ["ile kosztuje strona", "cena strony", "koszt strony", "pakiet start", "pakiet business"],
    answer:
      "W ofercie strony internetowej mamy trzy główne kierunki: Pakiet Start od 999 zł, Pakiet Business od 2 899 zł oraz Pakiet Custom z indywidualną wyceną. Jeśli napiszesz, czy potrzebujesz one page, kilku podstron czy bardziej rozbudowanego rozwiązania, wskażę najbliższy wariant.",
    followUp:
      "Chodzi Ci o prosty landing page, stronę firmową czy coś bardziej rozbudowanego?",
  },
  {
    id: "chatbot-pricing",
    category: "pricing",
    priority: 10,
    patterns: ["ile kosztuje chatbot", "cena chatbota", "koszt chatbota"],
    answer:
      "Chatbot AI startuje od 1 999 zł, a utrzymanie od 200 zł miesięcznie. To rozwiązanie sprawdza się szczególnie wtedy, gdy chcesz odpowiadać klientom 24/7, przedstawiać ofertę i zbierać leady.",
    followUp:
      "Czy bot ma głównie odpowiadać na pytania, zbierać leady czy kwalifikować zapytania?",
  },
  {
    id: "voicebot-pricing",
    category: "pricing",
    priority: 10,
    patterns: ["ile kosztuje voicebot", "cena voicebota", "koszt voicebota", "bot głosowy cena"],
    answer:
      "Voicebot AI startuje od 4 499 zł, a utrzymanie od 450 zł miesięcznie. Najczęściej ma sens tam, gdzie firma odbiera dużo podobnych połączeń i chce odciążyć zespół.",
    followUp:
      "Czy u Ciebie chodzi bardziej o odbieranie połączeń, umawianie terminów czy przekierowywanie klientów?",
  },
  {
    id: "custom-pricing",
    category: "custom",
    patterns: ["custom cena", "ile kosztuje custom", "wycena indywidualna", "aplikacja cena", "sklep cena"],
    answer:
      "Przy rozwiązaniach custom wycena jest indywidualna, bo zakres zależy od funkcji, integracji i logiki procesu. Jeśli opiszesz, czy chodzi o sklep, aplikację webową, panel klienta, API albo niestandardowy moduł, pomogę uporządkować brief.",
    followUp:
      "Jaki dokładnie problem ma rozwiązać to wdrożenie i z czym trzeba je połączyć?",
  },
  {
    id: "process",
    category: "process",
    priority: 9,
    patterns: ["jak wygląda współpraca", "proces", "jak pracujecie", "etapy", "jak to wygląda"],
    answer:
      "Proces współpracy jest prosty: najpierw brief lub krótki opis firmy, potem bezpłatny projekt strony głównej, następnie konsultacja, realizacja i publikacja. Dzięki temu nie kupujesz w ciemno, tylko najpierw widzisz kierunek.",
    followUp:
      "Jeśli chcesz, możemy od razu przejść do krótkiego briefu i dopasowania zakresu.",
  },
  {
    id: "free-concept",
    category: "process",
    priority: 9,
    patterns: ["czy najpierw zobaczę projekt", "bezpłatny projekt", "darmowy projekt", "nie kupować w ciemno"],
    answer:
      "Tak, proces zakłada bezpłatny projekt strony głównej przed decyzją o dalszej realizacji. To pomaga ocenić kierunek, zanim przejdziesz dalej.",
    followUp:
      "Chcesz opisać firmę i cel projektu, żebym dobrał najbliższy wariant?",
  },
  {
    id: "cms-editing",
    category: "website",
    patterns: ["cms", "edycja treści", "czy mogę sam edytować", "samodzielna edycja"],
    answer:
      "W Pakiecie Start i Pakiecie Business przewidziany jest CMS do samodzielnej edycji treści. Jeśli planujesz częste zmiany na stronie, warto od razu uwzględnić to przy doborze wariantu.",
    followUp:
      "Czy zależy Ci na prostym one page, czy na stronie z kilkoma sekcjami lub podstronami?",
  },
  {
    id: "seo",
    category: "website",
    patterns: ["seo", "pozycjonowanie", "techniczne seo", "czy robicie seo"],
    answer:
      "W Pakiecie Business jest techniczne SEO i optymalizacja szybkości. Przy innych wariantach zakres zależy od rozwiązania, więc najlepiej doprecyzować, czy chodzi o prostą stronę, czy o większe wdrożenie.",
    followUp:
      "Czy interesuje Cię głównie strona firmowa, czy bardziej rozbudowane rozwiązanie?",
  },
  {
    id: "chatbot-vs-voicebot",
    category: "general",
    priority: 9,
    patterns: ["chatbot czy voicebot", "różnica", "czym się różni chatbot od voicebota"],
    answer:
      "Chatbot AI działa na stronie i pomaga odpowiadać klientom, przedstawiać ofertę oraz zbierać leady. Voicebot AI obsługuje połączenia telefoniczne, może przekazywać podstawowe informacje, umawiać terminy i kwalifikować rozmowy.",
    followUp:
      "U Ciebie większym problemem są pytania na stronie czy telefony do firmy?",
  },
  {
    id: "for-whom",
    category: "general",
    patterns: ["dla kogo", "czy to dla mnie", "jakie firmy", "kto może skorzystać"],
    answer:
      "Oferta jest kierowana do małych i średnich firm, lokalnych usług, marek osobistych, startupów oraz firm, które chcą usprawnić kontakt z klientem. Najważniejsze jest to, czy potrzebujesz lepszej prezentacji oferty, większej liczby zapytań albo odciążenia obsługi.",
    followUp:
      "Napisz proszę, czym zajmuje się Twoja firma i jaki masz główny cel.",
  },
  {
    id: "combined-solution",
    category: "general",
    patterns: ["strona i chatbot", "komplet", "pełne rozwiązanie", "strona plus bot"],
    answer:
      "Tak, można połączyć stronę internetową z chatbotem AI albo voicebotem AI, jeśli tego wymaga proces obsługi klienta. Najlepszy wariant zależy od tego, czy chcesz głównie zbierać leady na stronie, czy także automatyzować kontakt telefoniczny.",
    followUp:
      "Czy interesuje Cię bardziej nowa strona z botem, czy bot do już istniejącej strony?",
  },
  {
    id: "timeline-unknown",
    category: "process",
    patterns: ["ile trwa realizacja", "termin realizacji", "na kiedy będzie gotowe"],
    answer:
      "Termin realizacji zależy od zakresu, liczby funkcji i ewentualnych integracji, dlatego nie podajemy go w ciemno. Najszybciej da się to ocenić po krótkim briefie.",
    followUp:
      "Napisz proszę, czego dokładnie potrzebujesz i na kiedy planujesz start.",
  },
  {
    id: "hosting-support-unknown",
    category: "general",
    patterns: ["hosting", "opieka", "support", "utrzymanie strony", "serwer"],
    answer:
      "Takie szczegóły zależą od zakresu wdrożenia i ustaleń projektowych, dlatego najlepiej doprecyzować potrzeby. Mogę pomóc to uporządkować i wskazać, co warto ustalić już na etapie briefu.",
    followUp:
      "Chodzi Ci o samą stronę, chatbota, voicebota czy pełne wdrożenie?",
  },
];

function normalize(value = ""): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function scoreEntry(query: string, entry: FAQAnswer): number {
  const source = normalize(query);
  let score = entry.priority ?? 0;

  for (const pattern of entry.patterns) {
    if (source.includes(normalize(pattern))) score += 5;
  }

  return score;
}

export function findFaqAnswers(query: string, limit = 3): FAQAnswer[] {
  const scored = FAQ_ANSWERS.map((entry) => ({
    entry,
    score: scoreEntry(query, entry),
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.entry);

  return scored;
}

export function getPrimaryFaqAnswer(query: string): FAQAnswer | null {
  return findFaqAnswers(query, 1)[0] ?? null;
}

export { FAQ_ANSWERS };
