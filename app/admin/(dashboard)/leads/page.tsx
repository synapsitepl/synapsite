"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, Building2, Calendar } from "lucide-react"
import { toast } from "sonner"

interface Lead {
  id: string
  name: string
  company: string | null
  email: string
  phone: string | null
  serviceType: string | null
  budget: string | null
  timeline: string | null
  message: string | null
  status: string
  emailSent: boolean
  createdAt: string
}

const statusLabels: Record<string, string> = {
  NEW: "Nowy",
  CONTACTED: "Skontaktowany",
  QUALIFIED: "Zakwalifikowany",
  CLOSED: "Zamknięty",
}

const statusColors: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-400",
  CONTACTED: "bg-yellow-500/10 text-yellow-400",
  QUALIFIED: "bg-green-500/10 text-green-400",
  CLOSED: "bg-secondary text-muted-foreground",
}

const serviceLabels: Record<string, string> = {
  www: "Strona WWW",
  sklep: "Sklep internetowy",
  chatbot: "Chatbot AI",
  voicebot: "Voicebot AI",
  automatyzacja: "Automatyzacja",
  inne: "Inne",
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("ALL")

  const fetchLeads = async () => {
    const url = filter === "ALL" ? "/api/admin/leads" : `/api/admin/leads?status=${filter}`
    const res = await fetch(url)
    const data = await res.json()
    setLeads(data)
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [filter])

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })

    if (res.ok) {
      toast.success("Status zaktualizowany")
      fetchLeads()
    } else {
      toast.error("Błąd aktualizacji")
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Leady</h1>
        <p className="mt-1 text-sm text-muted-foreground">Zarządzaj zgłoszeniami z formularza kontaktowego</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["ALL", "NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setLoading(true) }}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === s
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "ALL" ? "Wszystkie" : statusLabels[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : leads.length === 0 ? (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 py-16">
          <p className="text-muted-foreground">Brak zgłoszeń</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-xl border border-border bg-card/50 p-5 transition-colors hover:bg-card/80">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground truncate">{lead.name}</h3>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                    {!lead.emailSent && (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                        Email nie wysłany
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Mail className="h-3.5 w-3.5" /> {lead.email}
                    </a>
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Phone className="h-3.5 w-3.5" /> {lead.phone}
                      </a>
                    )}
                    {lead.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" /> {lead.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {formatDate(lead.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    {lead.serviceType && (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">
                        {serviceLabels[lead.serviceType] || lead.serviceType}
                      </span>
                    )}
                    {lead.budget && (
                      <span className="rounded-full bg-secondary px-2 py-1 text-muted-foreground">
                        Budżet: {lead.budget}
                      </span>
                    )}
                    {lead.timeline && (
                      <span className="rounded-full bg-secondary px-2 py-1 text-muted-foreground">
                        Termin: {lead.timeline}
                      </span>
                    )}
                  </div>

                  {lead.message && (
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                  )}
                </div>

                {/* Status selector */}
                <div>
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="NEW">Nowy</option>
                    <option value="CONTACTED">Skontaktowany</option>
                    <option value="QUALIFIED">Zakwalifikowany</option>
                    <option value="CLOSED">Zamknięty</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
