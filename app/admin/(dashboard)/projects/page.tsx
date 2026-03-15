"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Project {
  id: string
  title: string
  slug: string
  category: string | null
  published: boolean
  featured: boolean
  sortOrder: number
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    const res = await fetch("/api/admin/projects")
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Czy na pewno chcesz usunąć projekt "${title}"?`)) return

    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Projekt usunięty")
      fetchProjects()
    } else {
      toast.error("Błąd podczas usuwania projektu")
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projekty</h1>
          <p className="mt-1 text-sm text-muted-foreground">Zarządzaj projektami portfolio</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nowy projekt
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 py-16">
          <p className="mb-4 text-muted-foreground">Brak projektów</p>
          <Link href="/admin/projects/new">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Dodaj pierwszy projekt
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Projekt</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Kategoria</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Wyróżniony</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Kolejność</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-card/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{project.title}</div>
                    <div className="text-xs text-muted-foreground">/{project.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {project.category || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {project.published ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                        <Eye className="h-3 w-3" /> Opublikowany
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                        <EyeOff className="h-3 w-3" /> Szkic
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {project.featured && <Star className="mx-auto h-4 w-4 text-yellow-400" />}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                    {project.sortOrder}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(project.id, project.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
