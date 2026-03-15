import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import { buildContactEmail } from "@/lib/email-template"

// Rate limiting: in-memory store (resets on server restart, fine for Vercel serverless)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
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
  serviceType: z.string().min(1, "Wybierz usługę"),
  budget: z.string().max(50).optional().default(""),
  timeline: z.string().max(50).optional().default(""),
  message: z.string().min(10, "Wiadomość musi mieć min. 10 znaków").max(5000),
  // Honeypot field - must be empty
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
      // Silently reject bots - return success to not reveal detection
      return NextResponse.json({ success: true })
    }

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        company: data.company || null,
        email: data.email,
        phone: data.phone || null,
        serviceType: data.serviceType,
        budget: data.budget || null,
        timeline: data.timeline || null,
        message: data.message,
        status: "NEW",
      },
    })

    // Send email via Resend
    let emailSent = false
    let emailError: string | null = null

    try {
      const resendApiKey = process.env.RESEND_API_KEY
      const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL
      const fromEmail = process.env.EMAIL_FROM || "Synapsite <noreply@synapsite.pl>"

      if (resendApiKey && receiverEmail) {
        const resend = new Resend(resendApiKey)

        await resend.emails.send({
          from: fromEmail,
          to: receiverEmail,
          replyTo: data.email,
          subject: `Nowe zapytanie: ${data.name} - ${data.serviceType}`,
          html: buildContactEmail({
            name: data.name,
            company: data.company,
            email: data.email,
            phone: data.phone,
            serviceType: data.serviceType,
            budget: data.budget,
            timeline: data.timeline,
            message: data.message,
          }),
        })

        emailSent = true
      } else {
        emailError = "Email not configured: missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL"
        console.warn(emailError)
      }
    } catch (e) {
      emailError = e instanceof Error ? e.message : "Unknown email error"
      console.error("Email sending failed:", emailError)
    }

    // Update lead with email status
    await prisma.lead.update({
      where: { id: lead.id },
      data: { emailSent, emailError },
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
