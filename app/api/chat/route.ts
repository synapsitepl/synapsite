import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"
import { getSystemPrompt } from "@/lib/chatbot/system-prompt"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Validate API key
    const apiKey = (process.env.OPENAI_API_KEY || "").trim()
    if (!apiKey) {
      console.error("OPENAI_API_KEY is not set or empty")
      return new Response(
        JSON.stringify({ error: "Chat configuration error: API key missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    const openai = createOpenAI({
      apiKey,
    })

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
      model: openai("gpt-4o-mini"),
      system: getSystemPrompt(),
      messages,
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
    
    // Add session ID header
    if (currentSessionId) {
      response.headers.set("X-Session-Id", currentSessionId)
    }
    
    return response
  } catch (error) {
    console.error("Chat API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return new Response(
      JSON.stringify({ error: "Chat error", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
