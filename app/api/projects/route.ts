import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      category: true,
      techStack: true,
      featuredImage: true,
      liveUrl: true,
      featured: true,
    },
  })

  return NextResponse.json(projects)
}
