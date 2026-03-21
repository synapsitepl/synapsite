"use client"

import dynamic from "next/dynamic"

const GlowCursor = dynamic(
  () => import("@/components/glow-cursor").then((mod) => ({ default: mod.GlowCursor })),
  { ssr: false }
)

const ChatbotWidget = dynamic(
  () => import("@/components/chatbot").then((mod) => ({ default: mod.ChatbotWidget })),
  { ssr: false }
)

const ToasterComponent = dynamic(
  () => import("@/components/ui/toaster").then((mod) => ({ default: mod.Toaster })),
  { ssr: false }
)

export function ClientProviders() {
  return (
    <>
      <GlowCursor />
      <ChatbotWidget />
      <ToasterComponent />
    </>
  )
}
