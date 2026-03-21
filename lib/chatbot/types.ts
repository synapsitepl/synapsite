// types.ts
import type { FlowId, SlotKey } from "./conversation-flows";

export type LeadTemperature = "cold" | "warm" | "hot";
export type LeadAnswers = Partial<Record<SlotKey, string>>;

export interface LeadContact {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

export interface ChatTurn {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

export interface SessionRecommendation {
  packageId?: string;
  packageName?: string;
  priceLabel?: string;
}

export interface ChatSessionState {
  sessionId: string;
  flowId: FlowId;
  answers: LeadAnswers;
  contact: LeadContact;
  notes: string[];
  tags: string[];
  temperature?: LeadTemperature;
  urgency?: "low" | "medium" | "high";
  lastRecommendation?: SessionRecommendation;
  history: ChatTurn[];
  createdAt: string;
  updatedAt: string;
}
