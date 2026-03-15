"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { FolderKanban, Users, LogOut, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Projekty", href: "/admin/projects", icon: FolderKanban },
  { label: "Leady", href: "/admin/leads", icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-card/50">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h1 className="text-lg font-bold">
          <span className="text-white">SYNAP</span>
          <span className="text-primary">SITE</span>
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">Panel administracyjny</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname.startsWith(item.href)
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          Strona główna
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Wyloguj się
        </button>
      </div>
    </aside>
  )
}
