// lead-session-store.ts
import { detectFlowId, type FlowId } from "./conversation-flows";
import type { ChatSessionState, ChatTurn, LeadAnswers, LeadContact, LeadTemperature } from "./types";

export interface SessionStore {
  get(sessionId: string): Promise<ChatSessionState | null>;
  upsert(session: ChatSessionState): Promise<ChatSessionState>;
  appendTurn(sessionId: string, turn: ChatTurn): Promise<ChatSessionState>;
  patch(sessionId: string, patch: Partial<ChatSessionState>): Promise<ChatSessionState>;
  getOrCreate(sessionId?: string): Promise<ChatSessionState>;
}

function nowIso(): string {
  return new Date().toISOString();
}

function normalize(value = ""): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function unique(items: string[]): string[] {
  return [...new Set(items.filter(Boolean))];
}

function createEmptySession(sessionId = crypto.randomUUID()): ChatSessionState {
  const now = nowIso();

  return {
    sessionId,
    flowId: "discovery",
    answers: {},
    contact: {},
    notes: [],
    tags: [],
    history: [],
    createdAt: now,
    updatedAt: now,
  };
}

class MemorySessionStore implements SessionStore {
  private store = new Map<string, ChatSessionState>();

  async get(sessionId: string): Promise<ChatSessionState | null> {
    return this.store.get(sessionId) ?? null;
  }

  async upsert(session: ChatSessionState): Promise<ChatSessionState> {
    const next: ChatSessionState = {
      ...session,
      updatedAt: nowIso(),
    };
    this.store.set(next.sessionId, next);
    return next;
  }

  async patch(sessionId: string, patch: Partial<ChatSessionState>): Promise<ChatSessionState> {
    const current = (await this.get(sessionId)) ?? createEmptySession(sessionId);
    const next: ChatSessionState = {
      ...current,
      ...patch,
      answers: {
        ...current.answers,
        ...(patch.answers ?? {}),
      },
      contact: {
        ...current.contact,
        ...(patch.contact ?? {}),
      },
      tags: unique([...(current.tags ?? []), ...(patch.tags ?? [])]),
      notes: [...(current.notes ?? []), ...(patch.notes ?? [])],
      history: patch.history ?? current.history,
      updatedAt: nowIso(),
    };

    this.store.set(sessionId, next);
    return next;
  }

  async appendTurn(sessionId: string, turn: ChatTurn): Promise<ChatSessionState> {
    const current = (await this.get(sessionId)) ?? createEmptySession(sessionId);
    const next: ChatSessionState = {
      ...current,
      history: [...current.history, turn].slice(-40),
      updatedAt: nowIso(),
    };

    this.store.set(sessionId, next);
    return next;
  }

  async getOrCreate(sessionId?: string): Promise<ChatSessionState> {
    if (sessionId) {
      const existing = await this.get(sessionId);
      if (existing) return existing;
      const created = createEmptySession(sessionId);
      this.store.set(sessionId, created);
      return created;
    }

    const created = createEmptySession();
    this.store.set(created.sessionId, created);
    return created;
  }
}

export const sessionStore = new MemorySessionStore();

const EMAIL_REGEX = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i;
const PHONE_REGEX = /(\+?\d[\d\s\-()]{6,}\d)/;
const BUDGET_REGEX = /(\d[\d\s]{2,})(?:\s?(?:zł|pln))?/i;

function extractEmail(text: string): string | undefined {
  return text.match(EMAIL_REGEX)?.[1];
}

function extractPhone(text: string): string | undefined {
  return text.match(PHONE_REGEX)?.[1];
}

function extractBudget(text: string): string | undefined {
  const match = text.match(BUDGET_REGEX);
  if (!match) return undefined;

  const raw = match[1].replace(/\s/g, "");
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 300) return undefined;

  return `${value} zł`;
}

function detectService(text: string): LeadAnswers["service"] | undefined {
  const source = normalize(text);

  if (
    source.includes("voicebot") ||
    source.includes("bot głosowy") ||
    source.includes("odbieranie telefonów")
  ) {
    return "voicebot";
  }

  if (source.includes("chatbot") || source.includes("czat") || source.includes("bot ai")) {
    return "chatbot";
  }

  if (
    source.includes("sklep") ||
    source.includes("aplikacja") ||
    source.includes("panel klienta") ||
    source.includes("api") ||
    source.includes("integracja") ||
    source.includes("custom")
  ) {
    return "custom";
  }

  if (
    source.includes("strona") ||
    source.includes("landing") ||
    source.includes("one page") ||
    source.includes("www") ||
    source.includes("witryna")
  ) {
    return "website";
  }

  return undefined;
}

function detectGoal(text: string): string | undefined {
  const source = normalize(text);

  if (source.includes("leady") || source.includes("zapytania")) return "więcej zapytań / leadów";
  if (source.includes("sprzedaż")) return "wsparcie sprzedaży";
  if (source.includes("wizerunek")) return "lepszy wizerunek online";
  if (source.includes("telefony") || source.includes("połączenia")) return "odciążenie obsługi telefonicznej";
  if (source.includes("obsługa") || source.includes("pytania")) return "odciążenie obsługi klienta";

  return undefined;
}

function detectCurrentState(text: string): string | undefined {
  const source = normalize(text);

  if (source.includes("mam już stronę") || source.includes("strona już jest")) {
    return "przebudowa / rozbudowa istniejącej strony";
  }

  if (source.includes("nowa strona") || source.includes("potrzebuję strony od zera")) {
    return "nowa strona";
  }

  if (source.includes("do istniejącej strony")) {
    return "wdrożenie do istniejącej strony";
  }

  return undefined;
}

function detectPages(text: string): string | undefined {
  const source = normalize(text);

  if (source.includes("one page") || source.includes("landing") || source.includes("jedna strona")) {
    return "one page / landing page";
  }

  if (source.includes("5 podstron") || source.includes("kilka podstron")) {
    return "kilka podstron";
  }

  return undefined;
}

function detectScope(text: string): string | undefined {
  const source = normalize(text);
  const scopes: string[] = [];

  if (source.includes("sklep")) scopes.push("sklep internetowy");
  if (source.includes("aplikacja")) scopes.push("aplikacja webowa");
  if (source.includes("panel klienta")) scopes.push("panel klienta");
  if (source.includes("api")) scopes.push("integracje API");
  if (source.includes("moduł")) scopes.push("niestandardowy moduł");
  if (source.includes("rezerwac")) scopes.push("rezerwacje / terminy");

  return scopes.length ? scopes.join(", ") : undefined;
}

function detectIntegrations(text: string): string | undefined {
  const source = normalize(text);
  const items: string[] = [];

  if (source.includes("crm")) items.push("CRM");
  if (source.includes("api")) items.push("API");
  if (source.includes("kalendarz")) items.push("kalendarz");
  if (source.includes("analityka")) items.push("analityka");
  if (source.includes("formularz")) items.push("formularz");
  if (source.includes("rezerwac")) items.push("system rezerwacji");

  return items.length ? items.join(", ") : undefined;
}

function detectLeadHandling(text: string): string | undefined {
  const source = normalize(text);
  const items: string[] = [];

  if (source.includes("najczęstsze pytania") || source.includes("pytania")) {
    items.push("odpowiadanie na najczęstsze pytania");
  }
  if (source.includes("lead")) items.push("zbieranie leadów");
  if (source.includes("kwalifik")) items.push("kwalifikacja zapytań");
  if (source.includes("ofert")) items.push("przedstawianie oferty");

  return items.length ? items.join(", ") : undefined;
}

function detectCallVolume(text: string): string | undefined {
  const source = normalize(text);

  if (source.includes("dużo połączeń") || source.includes("sporo telefonów")) {
    return "duża liczba powtarzalnych połączeń";
  }

  const match = source.match(/(\d+)\s*(telefon|połącze)/);
  if (match) return match[0];

  return undefined;
}

function detectTimeline(text: string): string | undefined {
  const source = normalize(text);

  if (source.includes("na już") || source.includes("jak najszybciej") || source.includes("pilne")) {
    return "pilne / jak najszybciej";
  }

  if (source.includes("w tym miesiącu")) return "w tym miesiącu";
  if (source.includes("w tym tygodniu")) return "w tym tygodniu";
  if (source.includes("w przyszłym miesiącu")) return "w przyszłym miesiącu";

  return undefined;
}

function detectTags(text: string): string[] {
  const source = normalize(text);
  const tags: string[] = [];

  if (source.includes("cena") || source.includes("koszt")) tags.push("price-sensitive");
  if (source.includes("pilne") || source.includes("na już")) tags.push("urgent");
  if (source.includes("crm") || source.includes("api")) tags.push("integration");
  if (source.includes("lead")) tags.push("lead-capture");
  if (source.includes("telefon") || source.includes("połączenia")) tags.push("phone-automation");

  return unique(tags);
}

export function extractSignalsFromMessage(text: string): {
  answers: LeadAnswers;
  contact: LeadContact;
  tags: string[];
  flowId: FlowId;
} {
  const service = detectService(text);
  const answers: LeadAnswers = {
    service,
    goal: detectGoal(text),
    currentState: detectCurrentState(text),
    pages: detectPages(text),
    scope: detectScope(text),
    integrations: detectIntegrations(text),
    leadHandling: detectLeadHandling(text),
    callVolume: detectCallVolume(text),
    timeline: detectTimeline(text),
    budget: extractBudget(text),
  };

  const compactAnswers = Object.fromEntries(
    Object.entries(answers).filter(([, value]) => Boolean(value))
  ) as LeadAnswers;

  const flowId = detectFlowId(`${service ?? ""} ${text}`);

  return {
    answers: compactAnswers,
    contact: {
      email: extractEmail(text),
      phone: extractPhone(text),
    },
    tags: detectTags(text),
    flowId,
  };
}

export function mergeAnswers(current: LeadAnswers, incoming: LeadAnswers): LeadAnswers {
  return {
    ...current,
    ...Object.fromEntries(
      Object.entries(incoming).filter(([, value]) => Boolean(value))
    ),
  };
}

export function mergeContact(current: LeadContact, incoming: LeadContact): LeadContact {
  return {
    ...current,
    ...Object.fromEntries(
      Object.entries(incoming).filter(([, value]) => Boolean(value))
    ),
  };
}

export async function updateSessionFromUserMessage(
  sessionId: string,
  text: string
): Promise<ChatSessionState> {
  const session = await sessionStore.getOrCreate(sessionId);
  const extracted = extractSignalsFromMessage(text);

  const next = await sessionStore.patch(session.sessionId, {
    flowId: extracted.flowId,
    answers: mergeAnswers(session.answers, extracted.answers),
    contact: mergeContact(session.contact, extracted.contact),
    tags: unique([...(session.tags ?? []), ...extracted.tags]),
  });

  return next;
}

export async function appendUserTurn(sessionId: string, content: string) {
  return sessionStore.appendTurn(sessionId, {
    role: "user",
    content,
    createdAt: nowIso(),
  });
}

export async function appendAssistantTurn(sessionId: string, content: string) {
  return sessionStore.appendTurn(sessionId, {
    role: "assistant",
    content,
    createdAt: nowIso(),
  });
}

export async function updateSessionLeadMeta(
  sessionId: string,
  meta: {
    temperature?: LeadTemperature;
    urgency?: "low" | "medium" | "high";
    recommendation?: {
      packageId?: string;
      packageName?: string;
      priceLabel?: string;
    };
    note?: string;
  }
) {
  const session = await sessionStore.getOrCreate(sessionId);

  return sessionStore.patch(sessionId, {
    temperature: meta.temperature ?? session.temperature,
    urgency: meta.urgency ?? session.urgency,
    lastRecommendation: meta.recommendation ?? session.lastRecommendation,
    notes: meta.note ? [meta.note] : [],
  });
}
