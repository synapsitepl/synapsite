// objection-handlers.ts
export interface ObjectionHandler {
  id: string;
  patterns: string[];
  reply: string;
  followUp: string;
}

const OBJECTION_HANDLERS: ObjectionHandler[] = [
  {
    id: "too-expensive",
    patterns: ["za drogo", "drogo", "za wysoka cena", "nie mam takiego budżetu"],
    reply:
      "Rozumiem. W takiej sytuacji najlepiej dobrać minimalny sensowny zakres zamiast przepłacać za funkcje, których nie potrzebujesz od startu. Przy stronach często da się zacząć od prostszego wariantu i rozbudować go później.",
    followUp:
      "Napisz, jaki masz budżet i czy chodzi o stronę, chatbota, voicebota czy coś custom.",
  },
  {
    id: "need-time",
    patterns: ["muszę się zastanowić", "pomyślę", "wrócę później", "na razie się rozglądam"],
    reply:
      "Jasne, to normalne. Najczęściej najlepiej działa doprecyzowanie zakresu i celu, bo wtedy łatwiej porównać opcje bez zgadywania.",
    followUp:
      "Mogę Ci krótko rozpisać, który wariant będzie u Ciebie najbardziej sensowny.",
  },
  {
    id: "already-have-website",
    patterns: ["mam już stronę", "posiadam stronę", "strona już jest", "już mam witrynę"],
    reply:
      "To nie wyklucza współpracy. W takiej sytuacji zwykle chodzi o redesign, poprawę komunikacji, rozbudowę funkcji albo dołożenie chatbota AI do istniejącej strony.",
    followUp:
      "Chcesz poprawić obecną stronę, czy bardziej dołożyć do niej funkcję AI?",
  },
  {
    id: "no-content",
    patterns: ["nie mam treści", "nie mam tekstów", "nie mam zdjęć", "brak materiałów"],
    reply:
      "To da się uporządkować na etapie briefu. Najważniejsze jest najpierw ustalenie celu strony lub wdrożenia, a dopiero potem dopinanie materiałów i zakresu.",
    followUp:
      "Napisz proszę, jaka jest branża i jaki efekt ma dać to wdrożenie.",
  },
  {
    id: "not-sure-ai",
    patterns: ["nie wiem czy chatbot ma sens", "nie wiem czy ai ma sens", "czy voicebot ma sens", "czy to się opłaca"],
    reply:
      "To zależy głównie od rodzaju kontaktu z klientami. Chatbot ma sens przy powtarzalnych pytaniach na stronie, a voicebot przy dużej liczbie podobnych połączeń telefonicznych.",
    followUp:
      "Co dziś bardziej obciąża firmę: pytania na stronie czy telefony?",
  },
  {
    id: "want-fast",
    patterns: ["szybko", "na już", "jak najszybciej", "pilne", "asap"],
    reply:
      "W takiej sytuacji kluczowe jest zawężenie zakresu do najważniejszych funkcji. Im prostszy i lepiej określony start, tym łatwiej szybciej przejść do konkretu.",
    followUp:
      "Napisz proszę, co jest absolutnie konieczne w pierwszej wersji.",
  },
  {
    id: "only-price",
    patterns: ["podaj samą cenę", "tylko cena", "bez szczegółów", "ile i tyle"],
    reply:
      "Mogę podać cenę startową, ale najlepszy wariant zależy od zakresu. Przy prostym one page najbliżej zwykle do Pakietu Start, przy pełniejszej stronie firmowej do Business, a przy funkcjach niestandardowych do Custom.",
    followUp:
      "Chodzi Ci o jedną stronę, kilka podstron czy bardziej rozbudowane rozwiązanie?",
  },
];

function normalize(value = ""): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

export function findObjectionHandler(message: string): ObjectionHandler | null {
  const source = normalize(message);

  const match = OBJECTION_HANDLERS.find((handler) =>
    handler.patterns.some((pattern) => source.includes(normalize(pattern)))
  );

  return match ?? null;
}

export { OBJECTION_HANDLERS };
