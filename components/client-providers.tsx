"use client"

import dynamic from "next/dynamic"

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
      <ChatbotWidget />
      <ToasterComponent />
    </>
  )
}
