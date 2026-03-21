import { createOpenAI } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { buildRuntimeBundle } from "@/lib/chatbot/prompt-runtime"
import {
  appendAssistantTurn,
  extractSignalsFromMessage,
  mergeAnswers,
  mergeContact,
  sessionStore,
  updateSessionLeadMeta,
} from "@/lib/chatbot/lead-session-store"
import type { ChatSessionState } from "@/lib/chatbot/types"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const maxDuration = 30

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
const DEFAULT_OPENROUTER_MODEL = "deepseek/deepseek-v3.2"

const chatRateLimit = new Map<string, { count: number; resetAt: number }>()
const CHAT_RATE_MAX = 10
const CHAT_RATE_WINDOW = 10 * 60 * 1000

let dailyCount = 0
let dailyResetAt = Date.now() + 24 * 60 * 60 * 1000

interface ChatRequestBody {
  messages: UIMessage[]
  sessionId?: string
}

function getTextFromParts(message: UIMessage): string {
  return (
    message.parts
      ?.filter((part): part is Extract<UIMessage["parts"][number], { type: "text" }> => part.type === "text")
      .map((part) => part.text)
      .join("") || ""
  )
}

function nowIso(): string {
  return new Date().toISOString()
}

function checkRateLimit(ip: string): string | null {
  const now = Date.now()

  if (now > dailyResetAt) {
    dailyCount = 0
    dailyResetAt = now + 24 * 60 * 60 * 1000
  }

  if (dailyCount >= 1200) {
    return "Limit dzienny wyczerpany. Spróbuj jutro."
  }

  const entry = chatRateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    chatRateLimit.set(ip, { count: 1, resetAt: now + CHAT_RATE_WINDOW })
  } else if (entry.count >= CHAT_RATE_MAX) {
    return "Zbyt wiele wiadomości. Poczekaj kilka minut."
  } else {
    entry.count += 1
  }

  dailyCount += 1
  return null
}

async function buildSessionState(messages: UIMessage[], requestedSessionId?: string): Promise<ChatSessionState> {
  const initialSession = await sessionStore.getOrCreate(requestedSessionId)

  let answers = initialSession.answers
  let contact = initialSession.contact
  let tags = [...(initialSession.tags ?? [])]

  const history = messages
    .map((message) => {
      const content = getTextFromParts(message).trim()
      return content
        ? {
            role: message.role,
            content,
            createdAt: nowIso(),
          }
        : null
    })
    .filter((turn): turn is NonNullable<typeof turn> => Boolean(turn))

  for (const turn of history) {
    if (turn.role !== "user") continue
    const extracted = extractSignalsFromMessage(turn.content)
    answers = mergeAnswers(answers, extracted.answers)
    contact = mergeContact(contact, extracted.contact)
    tags = [...new Set([...tags, ...extracted.tags])]
  }

  const latestUserMessage =
    [...history].reverse().find((turn) => turn.role === "user")?.content ?? ""

  const flowId = latestUserMessage
    ? extractSignalsFromMessage(latestUserMessage).flowId
    : initialSession.flowId

  return sessionStore.patch(initialSession.sessionId, {
    flowId,
    answers,
    contact,
    tags,
    history,
  })
}

export async function POST(req: Request) {
  try {
    const apiKey = (process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || "").trim()
    const model = (
      process.env.OPENROUTER_MODEL ||
      process.env.OPENAI_MODEL ||
      DEFAULT_OPENROUTER_MODEL
    ).trim()

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY / OPENAI_API_KEY is not set")
      return new Response(JSON.stringify({ error: "Chatbot nie jest skonfigurowany." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"

    const rateLimitMsg = checkRateLimit(ip)
    if (rateLimitMsg) {
      return new Response(JSON.stringify({ error: rateLimitMsg }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      })
    }

    const openrouter = createOpenAI({
      apiKey,
      baseURL: OPENROUTER_BASE_URL,
      headers: {
        "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
        "X-Title": "Synapsite",
      },
    })

    const { messages, sessionId }: ChatRequestBody = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Brak wiadomości do przetworzenia." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const session = await buildSessionState(messages, sessionId)
    const latestUserMessage =
      [...session.history].reverse().find((turn) => turn.role === "user")?.content?.trim() || ""

    if (!latestUserMessage) {
      return new Response(JSON.stringify({ error: "Nie znaleziono wiadomości użytkownika." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const runtime = buildRuntimeBundle({
      latestMessage: latestUserMessage,
      session,
    })

    let currentSessionId: string | null = null

    try {
      const dbSession = await prisma.chatSession.create({ data: {} })
      currentSessionId = dbSession.id

      await prisma.chatMessage.create({
        data: {
          sessionId: currentSessionId,
          role: "user",
          content: latestUserMessage,
        },
      })
    } catch (error) {
      console.error("Failed to save user chat message:", error)
    }

    await updateSessionLeadMeta(session.sessionId, {
      temperature: runtime.lead.temperature,
      urgency: runtime.lead.urgency,
      recommendation: {
        packageId: runtime.lead.packageId,
        packageName: runtime.lead.packageName,
        priceLabel: session.lastRecommendation?.priceLabel,
      },
      note: runtime.lead.summary || undefined,
    })

    const result = streamText({
      model: openrouter(model),
      system: runtime.system,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 500,
      temperature: 0.7,
      onFinish: async ({ text }) => {
        try {
          await appendAssistantTurn(session.sessionId, text)
          await updateSessionLeadMeta(session.sessionId, {
            temperature: runtime.lead.temperature,
            urgency: runtime.lead.urgency,
            recommendation: {
              packageId: runtime.lead.packageId,
              packageName: runtime.lead.packageName,
              priceLabel:
                runtime.lead.packageId && runtime.lead.packageName
                  ? session.lastRecommendation?.priceLabel
                  : undefined,
            },
          })

          if (currentSessionId) {
            await prisma.chatMessage.create({
              data: {
                sessionId: currentSessionId,
                role: "assistant",
                content: text,
              },
            })
          }
        } catch (error) {
          console.error("Failed to save assistant chat message:", error)
        }
      },
    })

    return result.toUIMessageStreamResponse({
      headers: {
        "X-Chat-Session-Id": session.sessionId,
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    return new Response(JSON.stringify({ error: "Błąd chatbota", details: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
