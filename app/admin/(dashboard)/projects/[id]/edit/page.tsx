"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Project {
  id: string
  title: string
  slug: string
  shortDescription: string | null
  fullDescription: string | null
  category: string | null
  techStack: string[]
  featuredImage: string | null
  galleryImages: string[]
  liveUrl: string | null
  githubUrl: string | null
  sortOrder: number
  featured: boolean
  published: boolean
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then(res => res.json())
      .then(data => { setProject(data); setLoading(false) })
      .catch(() => { toast.error("Błąd ładowania projektu"); setLoading(false) })
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get("title") as string,
      slug: form.get("slug") as string,
      shortDescription: form.get("shortDescription") as string,
      fullDescription: form.get("fullDescription") as string,
      category: form.get("category") as string,
      techStack: ((form.get("techStack") as string) || "").split(",").map(s => s.trim()).filter(Boolean),
      featuredImage: form.get("featuredImage") as string,
      galleryImages: ((form.get("galleryImages") as string) || "").split(",").map(s => s.trim()).filter(Boolean),
      liveUrl: form.get("liveUrl") as string,
      githubUrl: form.get("githubUrl") as string,
      sortOrder: parseInt(form.get("sortOrder") as string) || 0,
      featured: form.get("featured") === "on",
      published: form.get("published") === "on",
    }

    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      toast.success("Projekt zaktualizowany")
      router.push("/admin/projects")
    } else {
      toast.error("Błąd zapisu")
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!project) {
    return <div className="py-16 text-center text-muted-foreground">Projekt nie znaleziony</div>
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/projects" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Powrót do listy
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Edytuj: {project.title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-border bg-card/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Informacje podstawowe</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Tytuł *</label>
              <Input name="title" required defaultValue={project.title} className="bg-secondary/50 border-border" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Slug *</label>
              <Input name="slug" required defaultValue={project.slug} className="bg-secondary/50 border-border" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Krótki opis</label>
            <Input name="shortDescription" defaultValue={project.shortDescription || ""} className="bg-secondary/50 border-border" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Pełny opis</label>
            <Textarea name="fullDescription" rows={5} defaultValue={project.fullDescription || ""} className="bg-secondary/50 border-border resize-none" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Kategoria</label>
              <select name="category" defaultValue={project.category || ""} className="w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Wybierz kategorię...</option>
                <option value="Strona WWW">Strona WWW</option>
                <option value="Sklep internetowy">Sklep internetowy</option>
                <option value="Chatbot AI">Chatbot AI</option>
                <option value="Voicebot AI">Voicebot AI</option>
                <option value="Automatyzacja">Automatyzacja</option>
                <option value="Aplikacja webowa">Aplikacja webowa</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Tech Stack</label>
              <Input name="techStack" defaultValue={project.techStack.join(", ")} className="bg-secondary/50 border-border" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Media i linki</h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Obraz główny (URL)</label>
            <Input name="featuredImage" type="url" defaultValue={project.featuredImage || ""} className="bg-secondary/50 border-border" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Galeria (URLe)</label>
            <Input name="galleryImages" defaultValue={project.galleryImages.join(", ")} className="bg-secondary/50 border-border" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">URL strony</label>
              <Input name="liveUrl" type="url" defaultValue={project.liveUrl || ""} className="bg-secondary/50 border-border" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">GitHub URL</label>
              <Input name="githubUrl" type="url" defaultValue={project.githubUrl || ""} className="bg-secondary/50 border-border" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Ustawienia</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Kolejność sortowania</label>
              <Input name="sortOrder" type="number" defaultValue={project.sortOrder} className="bg-secondary/50 border-border" />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" name="featured" id="featured" defaultChecked={project.featured} className="h-4 w-4 rounded border-border accent-primary" />
              <label htmlFor="featured" className="text-sm font-medium text-foreground">Wyróżniony</label>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" name="published" id="published" defaultChecked={project.published} className="h-4 w-4 rounded border-border accent-primary" />
              <label htmlFor="published" className="text-sm font-medium text-foreground">Opublikowany</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/projects">
            <Button type="button" variant="outline">Anuluj</Button>
          </Link>
          <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {saving ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Zapisywanie...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" />Zapisz zmiany</>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
