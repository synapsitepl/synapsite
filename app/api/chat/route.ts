import { createOpenAI } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, UIMessage } from "ai"
import { getSystemPrompt } from "@/lib/chatbot/system-prompt"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const maxDuration = 30
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
const DEFAULT_OPENROUTER_MODEL = "deepseek/deepseek-v3.2"

// Rate limiting per IP — max 10 messages per 10 minutes
const chatRateLimit = new Map<string, { count: number; resetAt: number }>()
const CHAT_RATE_MAX = 10
const CHAT_RATE_WINDOW = 10 * 60 * 1000

// Global daily counter
let dailyCount = 0
let dailyResetAt = Date.now() + 24 * 60 * 60 * 1000

function checkRateLimit(ip: string): string | null {
  const now = Date.now()

  // Daily global limit
  if (now > dailyResetAt) {
    dailyCount = 0
    dailyResetAt = now + 24 * 60 * 60 * 1000
  }
  if (dailyCount >= 1200) {
    return "Limit dzienny wyczerpany. Spróbuj jutro."
  }

  // Per-IP limit
  const entry = chatRateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    chatRateLimit.set(ip, { count: 1, resetAt: now + CHAT_RATE_WINDOW })
  } else if (entry.count >= CHAT_RATE_MAX) {
    return "Zbyt wiele wiadomości. Poczekaj kilka minut."
  } else {
    entry.count++
  }

  dailyCount++
  return null
}

export async function POST(req: Request) {
  try {
    // Validate API key
    const apiKey = (process.env.OPENROUTER_API_KEY || "").trim()
    const model = (process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_MODEL).trim()
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not set")
      return new Response(
        JSON.stringify({ error: "Chatbot nie jest skonfigurowany." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"

    const rateLimitMsg = checkRateLimit(ip)
    if (rateLimitMsg) {
      return new Response(
        JSON.stringify({ error: rateLimitMsg }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      )
    }

    // Create OpenRouter client (OpenAI-compatible API)
    const openrouter = createOpenAI({
      apiKey,
      baseURL: OPENROUTER_BASE_URL,
      headers: {
        "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
        "X-Title": "Synapsite",
      },
    })

    const { messages }: { messages: UIMessage[] } = await req.json()

    // Extract text from the last user message for DB saving
    const lastMessage = messages[messages.length - 1]
    const lastUserText = lastMessage?.role === "user"
      ? lastMessage.parts
          ?.filter((p: { type: string }) => p.type === "text")
          .map((p: { type: string; text?: string }) => p.text)
          .join("") || lastMessage.content || ""
      : ""

    // Save user message to DB
    let currentSessionId: string | null = null
    try {
      const session = await prisma.chatSession.create({ data: {} })
      currentSessionId = session.id

      if (lastUserText) {
        await prisma.chatMessage.create({
          data: {
            sessionId: currentSessionId,
            role: "user",
            content: lastUserText,
          },
        })
      }
    } catch (error) {
      console.error("Failed to save chat message:", error)
    }

    const result = streamText({
      model: openrouter(model),
      system: getSystemPrompt(),
      messages: await convertToModelMessages(messages),
      maxTokens: 500,
      temperature: 0.7,
      onFinish: async ({ text }) => {
        try {
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
          console.error("Failed to save assistant message:", error)
        }
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return new Response(
      JSON.stringify({ error: "Błąd chatbota", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
