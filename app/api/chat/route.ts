import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { getSystemPrompt } from "@/lib/chatbot/system-prompt"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const maxDuration = 30

export async function POST(req: Request) {
  try {
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

    const response = result.toDataStreamResponse()
    
    // Add session ID header
    if (currentSessionId) {
      response.headers.set("X-Session-Id", currentSessionId)
    }
    
    return response
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "Chat error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
