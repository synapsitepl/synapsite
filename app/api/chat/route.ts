import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai"
import { getSystemPrompt } from "@/lib/chatbot/system-prompt"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const maxDuration = 30

// Rate limiting per IP — max 10 messages per 10 minutes
const chatRateLimit = new Map<string, { count: number; resetAt: number }>()
const CHAT_RATE_MAX = 10
const CHAT_RATE_WINDOW = 10 * 60 * 1000

// Global daily counter — stop at 1200 to stay safely under 1500 free RPD
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
    const apiKey = (process.env.GOOGLE_GENERATIVE_AI_API_KEY || "").trim()
    if (!apiKey) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY is not set")
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

    const google = createGoogleGenerativeAI({ apiKey })

    const { messages, sessionId } = await req.json()

    // Save user message to DB
    let currentSessionId = sessionId
    try {
      if (!currentSessionId) {
        const session = await prisma.chatSession.create({ data: {} })
        currentSessionId = session.id
      }

      const lastMessage = messages[messages.length - 1]
      if (lastMessage?.role === "user" && lastMessage?.content) {
        await prisma.chatMessage.create({
          data: {
            sessionId: currentSessionId,
            role: "user",
            content: lastMessage.content,
          },
        })
      }
    } catch (error) {
      console.error("Failed to save chat message:", error)
    }

    const result = streamText({
      model: google("gemini-2.0-flash"),
      system: getSystemPrompt(),
      messages,
      maxTokens: 500, // Keep responses short to save quota
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

    const response = result.toUIMessageStreamResponse()

    if (currentSessionId) {
      response.headers.set("X-Session-Id", currentSessionId)
    }

    return response
  } catch (error) {
    console.error("Chat API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return new Response(
      JSON.stringify({ error: "Błąd chatbota", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
