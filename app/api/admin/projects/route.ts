import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  })

  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()

  // Generate slug from title if not provided
  if (!body.slug) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, (c: string) => {
        const map: Record<string, string> = {
          ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
        }
        return map[c] || c
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const project = await prisma.project.create({
    data: {
      title: body.title,
      slug: body.slug,
      shortDescription: body.shortDescription || null,
      fullDescription: body.fullDescription || null,
      category: body.category || null,
      techStack: body.techStack || [],
      featuredImage: body.featuredImage || null,
      galleryImages: body.galleryImages || [],
      liveUrl: body.liveUrl || null,
      githubUrl: body.githubUrl || null,
      sortOrder: body.sortOrder || 0,
      featured: body.featured || false,
      published: body.published || false,
    },
  })

  return NextResponse.json(project, { status: 201 })
}
