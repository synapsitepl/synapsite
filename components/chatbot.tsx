"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, UIMessage } from "ai"
import { Bot, Loader2, MessageCircle, Send, User, X } from "lucide-react"

const welcomeText =
  "Cześć! Jestem asystentem Synapsite. Chętnie odpowiem na pytania dotyczące naszych usług - stron WWW, chatbotów AI, voicebotów AI i automatyzacji. W czym mogę pomóc?"

const CHATBOT_SESSION_STORAGE_KEY = "synapsite-chat-session-id"

function getChatSessionId(): string {
  if (typeof window === "undefined") {
    return "server-session"
  }

  const existing = window.localStorage.getItem(CHATBOT_SESSION_STORAGE_KEY)
  if (existing) return existing

  const next = window.crypto?.randomUUID?.() ?? `chat-${Date.now()}`
  window.localStorage.setItem(CHATBOT_SESSION_STORAGE_KEY, next)
  return next
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error, clearError } = useChat<UIMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({
        api,
        body,
        credentials,
        headers,
        id,
        messageId,
        messages,
        trigger,
      }) => ({
        api,
        headers,
        credentials,
        body: {
          ...body,
          id,
          messageId,
          messages,
          trigger,
          sessionId: getChatSessionId(),
        },
      }),
    }),
  })

  const isLoading = status === "submitted" || status === "streaming"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, error])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    clearError()
    const messageText = input
    setInput("")
    await sendMessage({ text: messageText })
  }

  function getMessageText(msg: UIMessage): string {
    return msg.parts
      .filter(
        (part): part is Extract<UIMessage["parts"][number], { type: "text" }> =>
          part.type === "text"
      )
      .map((part) => part.text)
      .join("")
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "rotate-0 bg-secondary text-foreground"
            : "bg-primary text-primary-foreground hover:scale-110 hover:bg-primary/90"
        }`}
        aria-label={isOpen ? "Zamknij czat" : "Otwórz czat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 h-14 w-14 animate-pulse rounded-full bg-primary/30 blur-xl" />
      )}

      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-[520px] max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Asystent Synapsite</h3>
              <p className="text-xs text-muted-foreground">Zwykle odpowiadamy natychmiast</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Bot className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-secondary px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                  <div
                    className="prose prose-sm prose-invert max-w-none [&>li]:text-sm [&>ol]:mb-2 [&>p:last-child]:mb-0 [&>p]:mb-2 [&>ul]:mb-2"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdown(welcomeText),
                    }}
                  />
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user" ? "bg-primary/10" : "bg-accent/10"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Bot className="h-3.5 w-3.5 text-accent" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-secondary text-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div
                      className="prose prose-sm prose-invert max-w-none [&>li]:text-sm [&>ol]:mb-2 [&>p:last-child]:mb-0 [&>p]:mb-2 [&>ul]:mb-2"
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdown(getMessageText(msg)),
                      }}
                    />
                  ) : (
                    getMessageText(msg)
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Bot className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-secondary px-3.5 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                  <Bot className="h-3.5 w-3.5 text-destructive" />
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-destructive/20 bg-destructive/10 px-3.5 py-2.5 text-sm text-foreground">
                  Nie udało się uzyskać odpowiedzi czatbota. Spróbuj ponownie za chwilę.
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleFormSubmit} className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Napisz wiadomość..."
                className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    .replace(/<p><\/p>/g, "")
}
