"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink, Star } from "lucide-react"

interface Project {
  id: string
  title: string
  slug: string
  shortDescription: string | null
  category: string | null
  techStack: string[]
  featuredImage: string | null
  liveUrl: string | null
  featured: boolean
}

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => { setProjects(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="portfolio" className="relative py-24 px-4">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Portfolio
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Nasze najnowsze realizacje
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/30">
            <p className="text-muted-foreground">
              Tutaj pojawią się projekty portfolio
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                    <Star className="h-3 w-3" /> Wyróżniony
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  {project.featuredImage ? (
                    <Image
                      src={project.featuredImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {project.category && (
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {project.category}
                    </span>
                  )}

                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>

                  {project.shortDescription && (
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {project.shortDescription}
                    </p>
                  )}

                  {/* Tech stack */}
                  {project.techStack.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Link */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
                    >
                      Zobacz projekt <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
