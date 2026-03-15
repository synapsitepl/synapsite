import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(project)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await request.json()

  const project = await prisma.project.update({
    where: { id },
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
      sortOrder: body.sortOrder ?? 0,
      featured: body.featured ?? false,
      published: body.published ?? false,
    },
  })

  return NextResponse.json(project)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  await prisma.project.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
