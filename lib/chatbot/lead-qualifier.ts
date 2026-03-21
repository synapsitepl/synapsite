// lead-qualifier.ts
import COMPANY from "./company";
import {
  FlowId,
  SlotKey,
  detectFlowId,
  inferWebsitePackage,
} from "./conversation-flows";

type Answers = Partial<Record<SlotKey, string>>;

export type LeadTemperature = "cold" | "warm" | "hot";
export type LeadAction =
  | "ask_service"
  | "ask_scope"
  | "ask_goal"
  | "ask_budget"
  | "ask_timeline"
  | "offer_brief"
  | "offer_contact"
  | "offer_quote";

export interface QualifyLeadInput {
  latestMessage: string;
  messageHistory?: string[];
  answers?: Answers;
}

export interface QualifiedLead {
  flowId: FlowId;
  packageId?: string;
  packageName?: string;
  score: number;
  temperature: LeadTemperature;
  missingFields: SlotKey[];
  budgetDetectedPLN?: number | null;
  contactReady: boolean;
  urgency: "low" | "medium" | "high";
  summary: string;
  nextAction: LeadAction;
  assistantReply: string;
  crmPayload: {
    service: string;
    packageSuggestion?: string;
    summary: string;
    temperature: LeadTemperature;
    budgetDetectedPLN?: number | null;
    urgency: "low" | "medium" | "high";
    answers: Answers;
  };
}

const packageMap = Object.fromEntries(
  COMPANY.packages.map((pkg) => [pkg.id, pkg])
);

const CONTACT_REGEX =
  /(\+?\d[\d\s\-()]{6,}\d)|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i;

const HOT_WORDS = [
  "chcę",
  "potrzebuję",
  "zależy mi",
  "szukam wykonawcy",
  "ile to kosztuje",
  "wycena",
  "oferta",
  "kontakt",
  "wdrożenie",
  "projekt",
  "brief",
  "na już",
  "pilne",
];

const URGENT_WORDS = [
  "pilne",
  "na już",
  "jak najszybciej",
  "od razu",
  "ten tydzień",
  "ten miesiąc",
  "asap",
];

const COMPLEXITY_WORDS = [
  "api",
  "crm",
  "kalendarz",
  "panel klienta",
  "integracja",
  "system",
  "niestandardowe",
  "moduł",
  "rezerwacje",
  "logowanie",
  "sklep",
  "aplikacja",
];

function normalize(value = ""): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function collectText(input: QualifyLeadInput): string {
  const history = (input.messageHistory ?? []).join(" ");
  return normalize(`${history} ${input.latestMessage}`);
}

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(normalize(keyword)));
}

function extractBudgetPLN(text: string): number | null {
  const match = text.match(/(\d[\d\s]{2,})(?:\s?zł|\s?pln)?/i);
  if (!match) return null;

  const value = Number(match[1].replace(/\s/g, ""));
  if (!Number.isFinite(value)) return null;
  if (value < 300) return null;

  return value;
}

function detectUrgency(text: string): "low" | "medium" | "high" {
  if (includesAny(text, URGENT_WORDS)) return "high";
  if (text.includes("w tym") || text.includes("w ciągu")) return "medium";
  return "low";
}

function isContactReady(text: string): boolean {
  return CONTACT_REGEX.test(text);
}

function getRequiredFields(flowId: FlowId): SlotKey[] {
  switch (flowId) {
    case "website":
      return ["businessType", "goal", "currentState", "pages"];
    case "chatbot":
      return ["businessType", "goal", "currentState", "leadHandling"];
    case "voicebot":
      return ["businessType", "goal", "callVolume"];
    case "custom":
      return ["businessType", "goal", "scope"];
    default:
      return ["service", "businessType", "goal"];
  }
}

function detectPackage(flowId: FlowId, answers: Answers, text: string) {
  if (flowId === "website") {
    const packageId = inferWebsitePackage({
      ...answers,
      pages: answers.pages || text,
      scope: answers.scope || text,
      integrations: answers.integrations || text,
      goal: answers.goal || text,
    });

    return packageMap[packageId];
  }

  if (flowId === "chatbot") return packageMap["chatbot-ai"];
  if (flowId === "voicebot") return packageMap["voicebot-ai"];
  if (flowId === "custom") return packageMap["custom"];

  return undefined;
}

function detectComplexity(text: string, answers: Answers): "simple" | "medium" | "complex" {
  const source = normalize(
    [
      text,
      answers.scope,
      answers.integrations,
      answers.pages,
      answers.goal,
    ]
      .filter(Boolean)
      .join(" ")
  );

  if (includesAny(source, COMPLEXITY_WORDS)) return "complex";
  if (source.includes("kilka podstron") || source.includes("5 podstron")) return "medium";
  return "simple";
}

function countHotSignals(text: string): number {
  return HOT_WORDS.reduce((count, word) => {
    return count + (text.includes(normalize(word)) ? 1 : 0);
  }, 0);
}

function mapTemperature(score: number): LeadTemperature {
  if (score >= 75) return "hot";
  if (score >= 45) return "warm";
  return "cold";
}

function pickNextAction(flowId: FlowId, missingFields: SlotKey[], score: number, contactReady: boolean): LeadAction {
  if (flowId === "discovery" && missingFields.includes("service")) return "ask_service";
  if (missingFields.includes("goal")) return "ask_goal";
  if (missingFields.includes("scope") || missingFields.includes("pages") || missingFields.includes("leadHandling")) {
    return "ask_scope";
  }
  if (missingFields.includes("budget")) return "ask_budget";
  if (missingFields.includes("timeline")) return "ask_timeline";
  if (contactReady && score >= 75) return "offer_contact";
  if (score >= 60) return "offer_brief";
  return "offer_quote";
}

function buildSummary(flowId: FlowId, pkgName: string | undefined, answers: Answers): string {
  const parts = [
    flowId !== "discovery" ? `Usługa: ${flowId}` : undefined,
    pkgName ? `Sugestia: ${pkgName}` : undefined,
    answers.businessType ? `Branża: ${answers.businessType}` : undefined,
    answers.goal ? `Cel: ${answers.goal}` : undefined,
    answers.currentState ? `Stan obecny: ${answers.currentState}` : undefined,
    answers.pages ? `Zakres strony: ${answers.pages}` : undefined,
    answers.scope ? `Zakres custom: ${answers.scope}` : undefined,
    answers.integrations ? `Integracje: ${answers.integrations}` : undefined,
    answers.timeline ? `Termin: ${answers.timeline}` : undefined,
    answers.budget ? `Budżet: ${answers.budget}` : undefined,
  ].filter(Boolean);

  return parts.join(" | ");
}

function buildAssistantReply(params: {
  flowId: FlowId;
  pkgName?: string;
  priceLabel?: string;
  nextAction: LeadAction;
  answers: Answers;
  missingFields: SlotKey[];
}): string {
  const { flowId, pkgName, priceLabel, nextAction, answers, missingFields } = params;

  if (flowId === "discovery") {
    return "Żeby dobrze Ci doradzić, napisz proszę, czy chodzi o stronę internetową, chatbota AI, voicebota AI czy rozwiązanie custom.";
  }

  if (nextAction === "ask_goal") {
    return "Jaki jest główny cel tego wdrożenia: więcej zapytań, lepszy wizerunek, odciążenie obsługi czy coś innego?";
  }

  if (nextAction === "ask_scope") {
    if (flowId === "website") {
      return "Napisz proszę, czy potrzebujesz one page, kilku podstron czy bardziej rozbudowanego rozwiązania z dodatkowymi funkcjami.";
    }
    if (flowId === "chatbot") {
      return "Opisz proszę, jakie pytania klienci zadają najczęściej i czy bot ma głównie odpowiadać, zbierać leady czy kwalifikować zapytania.";
    }
    if (flowId === "voicebot") {
      return "Napisz proszę, jakie połączenia powtarzają się najczęściej i czy bot ma odbierać, umawiać terminy czy przekierowywać klientów.";
    }
    return "Opisz proszę dokładniej zakres funkcji i integracji, żebym mógł sensownie to zakwalifikować.";
  }

  if (nextAction === "ask_budget") {
    return `Najbliżej temu obecnie do ${pkgName ?? "odpowiedniego wariantu"}${priceLabel ? ` (${priceLabel})` : ""}. Jeśli chcesz, podaj orientacyjny budżet, a doprecyzuję najlepszy kierunek.`;
  }

  if (nextAction === "ask_timeline") {
    return `Wygląda to sensownie pod ${pkgName ?? "to wdrożenie"}${priceLabel ? ` (${priceLabel})` : ""}. Napisz jeszcze, na kiedy chcesz wystartować, a wskażę najlepszy kolejny krok.`;
  }

  if (nextAction === "offer_contact") {
    return `To wygląda na gotowe zapytanie pod ${pkgName ?? "wdrożenie"}${priceLabel ? ` (${priceLabel})` : ""}. Możemy przejść do krótkiego briefu i kontaktu, żeby dopiąć zakres.`;
  }

  if (nextAction === "offer_brief") {
    return `Najbliżej temu do ${pkgName ?? "tego rozwiązania"}${priceLabel ? ` (${priceLabel})` : ""}. Podeślij krótki brief: branża, cel, zakres i ewentualne integracje, a przygotuję konkretny następny krok.`;
  }

  const missing = missingFields.slice(0, 2).join(", ");
  return `Mogę to dobrze dopasować. Uzupełnij proszę jeszcze: ${missing || "kilka szczegółów o zakresie"}, a doprecyzuję rekomendację.`;
}

function buildPriceLabel(packageId?: string): string | undefined {
  if (!packageId) return undefined;
  const pkg = packageMap[packageId];
  if (!pkg) return undefined;

  if (pkg.pricingNote) return pkg.pricingNote;

  const start = typeof pkg.pricePLN === "number" ? `${pkg.pricePLN} zł` : "";
  const monthly =
    typeof pkg.monthlyMaintenancePLN === "number"
      ? ` + ${pkg.monthlyMaintenancePLN} zł/mc`
      : "";

  return `${start}${monthly}`.trim() || undefined;
}

export function qualifyLead(input: QualifyLeadInput): QualifiedLead {
  const answers = input.answers ?? {};
  const text = collectText(input);
  const flowId = detectFlowId(`${answers.service || ""} ${text}`);
  const requiredFields = getRequiredFields(flowId);

  const missingRequired = requiredFields.filter((field) => !(answers[field] || "").trim());
  const missingOptional = (["budget", "timeline", "integrations"] as SlotKey[]).filter(
    (field) => !answers[field]?.trim()
  );
  const missingFields = [...missingRequired, ...missingOptional];

  const budgetDetectedPLN = extractBudgetPLN(text);
  const contactReady = isContactReady(text);
  const urgency = detectUrgency(text);
  const hotSignals = countHotSignals(text);
  const complexity = detectComplexity(text, answers);
  const pkg = detectPackage(flowId, answers, text);

  let score = 0;
  if (flowId !== "discovery") score += 20;
  if (answers.businessType) score += 10;
  if (answers.goal) score += 15;
  if (answers.currentState || answers.scope || answers.pages || answers.leadHandling || answers.callVolume) {
    score += 15;
  }
  if (answers.integrations) score += 5;
  if (answers.timeline) score += 10;
  if (answers.budget || budgetDetectedPLN) score += 10;
  if (contactReady) score += 10;
  if (urgency === "high") score += 10;
  if (hotSignals >= 2) score += 10;
  if (complexity === "complex") score += 5;
  if (missingRequired.length > 0) score -= missingRequired.length * 8;

  const normalizedScore = Math.max(0, Math.min(100, score));
  const temperature = mapTemperature(normalizedScore);
  const nextAction = pickNextAction(flowId, missingFields, normalizedScore, contactReady);
  const packageId = pkg?.id;
  const packageName = pkg?.name;
  const priceLabel = buildPriceLabel(packageId);
  const summary = buildSummary(flowId, packageName, answers);

  const assistantReply = buildAssistantReply({
    flowId,
    pkgName: packageName,
    priceLabel,
    nextAction,
    answers,
    missingFields,
  });

  return {
    flowId,
    packageId,
    packageName,
    score: normalizedScore,
    temperature,
    missingFields,
    budgetDetectedPLN,
    contactReady,
    urgency,
    summary,
    nextAction,
    assistantReply,
    crmPayload: {
      service: flowId,
      packageSuggestion: packageName,
      summary,
      temperature,
      budgetDetectedPLN,
      urgency,
      answers,
    },
  };
}
