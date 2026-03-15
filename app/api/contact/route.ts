import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

// Rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true

  entry.count++
  return false
}

const contactSchema = z.object({
  name: z.string().min(2, "Imię jest wymagane").max(100),
  company: z.string().max(100).optional().default(""),
  email: z.string().email("Nieprawidłowy adres email"),
  phone: z.string().max(20).optional().default(""),
  serviceType: z.string().max(100).optional().default(""),
  budget: z.string().max(100).optional().default(""),
  timeline: z.string().max(100).optional().default(""),
  message: z.string().min(1, "Wiadomość jest wymagana").max(5000),
  website: z.string().max(0, "Bot detected").optional().default(""),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Zbyt wiele zapytań. Spróbuj ponownie za kilka minut." },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate with Zod
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json({ error: "Błąd walidacji", errors }, { status: 400 })
    }

    const data = result.data

    // Honeypot check
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true })
    }

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        company: data.company || null,
        email: data.email,
        phone: data.phone || null,
        serviceType: data.serviceType || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        message: data.message,
        status: "NEW",
        emailSent: true, // Web3Forms handles email
      },
    })

    return NextResponse.json({ success: true, id: lead.id })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Wystąpił błąd. Spróbuj ponownie." },
      { status: 500 }
    )
  }
}
