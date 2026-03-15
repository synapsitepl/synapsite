import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const leads = await prisma.lead.findMany({
    where: status && status !== "ALL" ? { status: status as any } : undefined,
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(leads)
}
