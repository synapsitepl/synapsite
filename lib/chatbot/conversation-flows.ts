// conversation-flows.ts
import COMPANY from "./company";

export type FlowId =
  | "discovery"
  | "website"
  | "chatbot"
  | "voicebot"
  | "custom";

export type SlotKey =
  | "service"
  | "businessType"
  | "goal"
  | "currentState"
  | "scope"
  | "pages"
  | "integrations"
  | "contentReady"
  | "leadHandling"
  | "callVolume"
  | "timeline"
  | "budget"
  | "language";

export interface FlowQuestion {
  key: SlotKey;
  question: string;
  required: boolean;
}

export interface FlowDefinition {
  id: FlowId;
  label: string;
  opening: string;
  intentKeywords: string[];
  qualificationQuestions: FlowQuestion[];
  softCTAs: string[];
}

export interface Recommendation {
  flowId: FlowId;
  packageId?: string;
  packageName?: string;
  priceLabel?: string;
  rationale: string;
  nextStep: string;
}

type Answers = Partial<Record<SlotKey, string>>;

const packageMap = Object.fromEntries(
  COMPANY.packages.map((pkg) => [pkg.id, pkg])
);

export const CONVERSATION_FLOWS: Record<FlowId, FlowDefinition> = {
  discovery: {
    id: "discovery",
    label: "Wstępne rozpoznanie",
    opening:
      "Mogę pomóc dobrać najlepsze rozwiązanie. Napisz proszę, czy chodzi o stronę internetową, chatbota AI, voicebota AI czy rozwiązanie custom.",
    intentKeywords: [],
    qualificationQuestions: [
      {
        key: "service",
        question:
          "Która opcja Cię interesuje najbardziej: strona, chatbot AI, voicebot AI czy rozwiązanie custom?",
        required: true,
      },
      {
        key: "businessType",
        question: "Jaką firmę lub branżę reprezentujesz?",
        required: true,
      },
      {
        key: "goal",
        question:
          "Jaki jest główny cel: więcej zapytań, lepszy wizerunek, odciążenie obsługi czy coś innego?",
        required: true,
      },
    ],
    softCTAs: [
      "Opisz krótko firmę i cel, a wskażę najlepszy kierunek.",
      "Napisz, czego dokładnie potrzebujesz, a rozbiję to na konkretny zakres.",
    ],
  },

  website: {
    id: "website",
    label: "Strona internetowa",
    opening:
      "Jasne — pomogę dobrać odpowiedni wariant strony. Żeby nie strzelać, potrzebuję kilku krótkich informacji o zakresie.",
    intentKeywords: [
      "strona",
      "www",
      "landing",
      "landing page",
      "one page",
      "witryna",
      "serwis",
      "redesign",
      "projekt strony",
      "nowa strona",
    ],
    qualificationQuestions: [
      {
        key: "businessType",
        question: "W jakiej branży działa Twoja firma?",
        required: true,
      },
      {
        key: "goal",
        question:
          "Jaki ma być główny cel strony: wizerunek, leady, sprzedaż, prezentacja oferty?",
        required: true,
      },
      {
        key: "currentState",
        question:
          "To nowa strona czy przebudowa obecnej?",
        required: true,
      },
      {
        key: "pages",
        question:
          "Potrzebujesz jednej strony typu one page czy kilku podstron?",
        required: true,
      },
      {
        key: "integrations",
        question:
          "Czy potrzebne są formularze, analityka, integracje kontaktowe albo API?",
        required: false,
      },
      {
        key: "contentReady",
        question:
          "Masz już gotowe treści i zdjęcia, czy to też trzeba uwzględnić?",
        required: false,
      },
      {
        key: "timeline",
        question: "Na kiedy chcesz wystartować?",
        required: false,
      },
      {
        key: "budget",
        question:
          "Jaki budżet chcesz przeznaczyć, żebym dobrał sensowny wariant?",
        required: false,
      },
    ],
    softCTAs: [
      "Jeśli podasz zakres i cel strony, wskażę najbliższy pakiet.",
      "Mogę od razu powiedzieć, czy bliżej temu do Start, Business czy Custom.",
    ],
  },

  chatbot: {
    id: "chatbot",
    label: "Chatbot AI",
    opening:
      "Super — sprawdźmy, czy chatbot AI będzie u Ciebie dobrym ruchem i jak powinien działać, żeby realnie odciążał obsługę oraz zbierał leady.",
    intentKeywords: [
      "chatbot",
      "bot ai",
      "czat",
      "asystent ai",
      "widget",
      "lead bot",
    ],
    qualificationQuestions: [
      {
        key: "businessType",
        question: "W jakiej branży działa firma?",
        required: true,
      },
      {
        key: "goal",
        question:
          "Czy główny cel to odpowiadanie na pytania, prezentacja oferty, zbieranie leadów czy kwalifikacja zapytań?",
        required: true,
      },
      {
        key: "currentState",
        question:
          "Czy bot ma działać na istniejącej stronie, czy razem z nową stroną?",
        required: true,
      },
      {
        key: "leadHandling",
        question:
          "Jakie pytania klienci zadają najczęściej albo co dziś najbardziej zabiera czas zespołowi?",
        required: true,
      },
      {
        key: "integrations",
        question:
          "Czy potrzebna jest integracja z formularzem, CRM, kalendarzem lub innym systemem?",
        required: false,
      },
      {
        key: "language",
        question: "W jakim języku lub językach bot ma rozmawiać?",
        required: false,
      },
      {
        key: "timeline",
        question: "Na kiedy chcesz to wdrożyć?",
        required: false,
      },
    ],
    softCTAs: [
      "Jeśli opiszesz najczęstsze pytania klientów, wskażę sensowny zakres bota.",
      "Mogę pomóc ocenić, czy wystarczy prosty bot ofertowy, czy lepiej iść w szersze wdrożenie.",
    ],
  },

  voicebot: {
    id: "voicebot",
    label: "Voicebot AI",
    opening:
      "Jasne — voicebot ma sens wtedy, gdy w firmie powtarza się dużo podobnych połączeń. Sprawdźmy, jak duży jest ruch i co bot miałby przejąć.",
    intentKeywords: [
      "voicebot",
      "telefon",
      "połączenia",
      "odbieranie telefonów",
      "bot głosowy",
      "infolinia",
      "rozmowy",
    ],
    qualificationQuestions: [
      {
        key: "businessType",
        question: "W jakiej branży działa firma?",
        required: true,
      },
      {
        key: "goal",
        question:
          "Co voicebot ma robić przede wszystkim: odbierać telefony, umawiać terminy, kwalifikować rozmowy czy przekierowywać klientów?",
        required: true,
      },
      {
        key: "callVolume",
        question:
          "Ile mniej więcej połączeń odbieracie i jakie sprawy powtarzają się najczęściej?",
        required: true,
      },
      {
        key: "integrations",
        question:
          "Czy bot ma łączyć się z kalendarzem, CRM albo innym narzędziem?",
        required: false,
      },
      {
        key: "timeline",
        question: "Na kiedy planujesz wdrożenie?",
        required: false,
      },
      {
        key: "budget",
        question:
          "Czy masz założony budżet, czy mam dobrać wariant od potrzeb?",
        required: false,
      },
    ],
    softCTAs: [
      "Napisz, jak wyglądają połączenia w firmie, a ocenię, czy voicebot będzie opłacalny.",
      "Mogę rozpisać, które rozmowy warto oddać botowi, a które zostawić zespołowi.",
    ],
  },

  custom: {
    id: "custom",
    label: "Rozwiązanie custom",
    opening:
      "Jasne — przy rozwiązaniach custom najważniejsze jest dobre rozpoznanie procesu i funkcji, bo tutaj zakres decyduje o wycenie.",
    intentKeywords: [
      "custom",
      "aplikacja",
      "sklep",
      "panel klienta",
      "api",
      "integracja",
      "moduł",
      "system",
      "niestandardowe",
    ],
    qualificationQuestions: [
      {
        key: "businessType",
        question: "Czym zajmuje się Twoja firma?",
        required: true,
      },
      {
        key: "goal",
        question:
          "Jaki problem biznesowy ma rozwiązać to wdrożenie?",
        required: true,
      },
      {
        key: "scope",
        question:
          "Czy chodzi o sklep, aplikację webową, panel klienta, integracje API czy inny moduł?",
        required: true,
      },
      {
        key: "integrations",
        question:
          "Z jakimi systemami trzeba to połączyć?",
        required: false,
      },
      {
        key: "timeline",
        question: "Na kiedy potrzebujesz wdrożenia?",
        required: false,
      },
      {
        key: "budget",
        question:
          "Czy masz orientacyjny budżet lub przedział, od którego startujemy?",
        required: false,
      },
    ],
    softCTAs: [
      "Im krócej opiszesz proces i funkcje, tym szybciej da się ocenić zakres.",
      "Przy customie mogę pomóc rozpisać brief tak, żeby wycena była sensowna i konkretna.",
    ],
  },
};

const WEBSITE_START_HINTS = [
  "one page",
  "landing",
  "landing page",
  "prosta strona",
  "wizytówka",
  "jedna strona",
  "szybki start",
];

const WEBSITE_CUSTOM_HINTS = [
  "sklep",
  "e-commerce",
  "panel klienta",
  "api",
  "aplikacja",
  "rezerwacje",
  "logowanie",
  "niestandardowe",
  "system",
  "moduł",
];

function normalize(value = ""): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text: string, keywords: string[]): boolean {
  const source = normalize(text);
  return keywords.some((keyword) => source.includes(normalize(keyword)));
}

export function detectFlowId(message: string): FlowId {
  const text = normalize(message);

  if (hasAny(text, CONVERSATION_FLOWS.custom.intentKeywords)) return "custom";
  if (hasAny(text, CONVERSATION_FLOWS.voicebot.intentKeywords)) return "voicebot";
  if (hasAny(text, CONVERSATION_FLOWS.chatbot.intentKeywords)) return "chatbot";
  if (hasAny(text, CONVERSATION_FLOWS.website.intentKeywords)) return "website";

  return "discovery";
}

export function getFlow(flowId: FlowId): FlowDefinition {
  return CONVERSATION_FLOWS[flowId];
}

export function getMissingQuestions(flowId: FlowId, answers: Answers): FlowQuestion[] {
  return CONVERSATION_FLOWS[flowId].qualificationQuestions.filter((question) => {
    const value = answers[question.key];
    return !value || !value.trim();
  });
}

export function getNextBestQuestion(
  flowId: FlowId,
  answers: Answers
): FlowQuestion | null {
  const questions = CONVERSATION_FLOWS[flowId].qualificationQuestions;

  const requiredMissing = questions.find(
    (question) => question.required && !(answers[question.key] || "").trim()
  );
  if (requiredMissing) return requiredMissing;

  const optionalMissing = questions.find(
    (question) => !question.required && !(answers[question.key] || "").trim()
  );
  return optionalMissing ?? null;
}

export function inferWebsitePackage(answers: Answers): "start" | "business" | "custom" {
  const pages = normalize(answers.pages);
  const scope = normalize(answers.scope);
  const integrations = normalize(answers.integrations);
  const goal = normalize(answers.goal);
  const merged = [pages, scope, integrations, goal].join(" ");

  if (hasAny(merged, WEBSITE_CUSTOM_HINTS)) return "custom";
  if (hasAny(merged, WEBSITE_START_HINTS)) return "start";
  if (pages.includes("1") || pages.includes("jedna")) return "start";
  if (pages.includes("kilka") || pages.includes("5")) return "business";

  return "business";
}

function formatPriceLabel(packageId?: string): string | undefined {
  if (!packageId) return undefined;
  const pkg = packageMap[packageId];
  if (!pkg) return undefined;

  if (pkg.pricingNote) return pkg.pricingNote;

  const setup = typeof pkg.pricePLN === "number" ? `${pkg.pricePLN} zł` : undefined;
  const monthly =
    typeof pkg.monthlyMaintenancePLN === "number"
      ? ` + ${pkg.monthlyMaintenancePLN} zł/mc utrzymanie`
      : "";

  return setup ? `${setup}${monthly}` : undefined;
}

export function buildRecommendation(flowId: FlowId, answers: Answers): Recommendation {
  if (flowId === "website") {
    const packageId = inferWebsitePackage(answers);
    const pkg = packageMap[packageId];

    return {
      flowId,
      packageId,
      packageName: pkg.name,
      priceLabel: formatPriceLabel(packageId),
      rationale:
        packageId === "start"
          ? "To wygląda na prostszy wariant strony nastawionej na szybki start i zbieranie zapytań."
          : packageId === "business"
          ? "To wygląda na pełniejszą stronę firmową z większym zakresem i lepszą bazą pod rozwój."
          : "Zakres wskazuje na wdrożenie wykraczające poza standardową stronę, więc najbliżej temu do rozwiązania custom.",
      nextStep:
        packageId === "custom"
          ? "Najlepszy kolejny krok to krótki brief funkcji i integracji do indywidualnej wyceny."
          : "Najlepszy kolejny krok to krótki brief, żebym doprecyzował zakres i potwierdził wariant.",
    };
  }

  if (flowId === "chatbot") {
    const pkg = packageMap["chatbot-ai"];

    return {
      flowId,
      packageId: pkg.id,
      packageName: pkg.name,
      priceLabel: formatPriceLabel(pkg.id),
      rationale:
        "To pasuje do firm, które chcą odpowiadać klientom 24/7, przedstawiać ofertę i zbierać leady bez angażowania zespołu w każde powtarzalne pytanie.",
      nextStep:
        "Najlepszy kolejny krok to opis najczęstszych pytań klientów i miejsc, w których bot ma zbierać dane.",
    };
  }

  if (flowId === "voicebot") {
    const pkg = packageMap["voicebot-ai"];

    return {
      flowId,
      packageId: pkg.id,
      packageName: pkg.name,
      priceLabel: formatPriceLabel(pkg.id),
      rationale:
        "To pasuje do firm, które chcą przejąć powtarzalne połączenia, umawianie terminów i podstawową kwalifikację rozmów.",
      nextStep:
        "Najlepszy kolejny krok to opis typów połączeń, godzin działania i ewentualnych integracji.",
    };
  }

  if (flowId === "custom") {
    const pkg = packageMap["custom"];

    return {
      flowId,
      packageId: pkg.id,
      packageName: pkg.name,
      priceLabel: formatPriceLabel(pkg.id),
      rationale:
        "Tutaj kluczowe są funkcje, logika procesu i integracje, dlatego sensowna jest indywidualna wycena zamiast strzelania zakresem.",
      nextStep:
        "Najlepszy kolejny krok to krótki opis procesu, użytkowników i funkcji potrzebnych w systemie.",
    };
  }

  return {
    flowId: "discovery",
    rationale:
      "Na tym etapie najważniejsze jest określenie, która usługa najlepiej odpowiada na potrzebę użytkownika.",
    nextStep:
      "Najlepszy kolejny krok to wybór głównego obszaru: strona, chatbot AI, voicebot AI lub custom.",
  };
}

export function buildAssistantPromptBlock(flowId: FlowId, answers: Answers): string {
  const flow = getFlow(flowId);
  const recommendation = buildRecommendation(flowId, answers);
  const missing = getMissingQuestions(flowId, answers)
    .slice(0, 3)
    .map((item) => `- ${item.key}: ${item.question}`)
    .join("\n");

  return [
    `AKTYWNY FLOW: ${flow.label}`,
    `OPENING: ${flow.opening}`,
    recommendation.packageName ? `REKOMENDACJA: ${recommendation.packageName}` : "",
    recommendation.priceLabel ? `CENA: ${recommendation.priceLabel}` : "",
    `UZASADNIENIE: ${recommendation.rationale}`,
    `KOLEJNY KROK: ${recommendation.nextStep}`,
    missing ? `BRAKUJĄCE PYTANIA:\n${missing}` : "BRAKUJĄCE PYTANIA: brak",
  ]
    .filter(Boolean)
    .join("\n");
}
