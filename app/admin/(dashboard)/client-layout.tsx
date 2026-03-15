"use client"

import { SessionProvider } from "next-auth/react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Toaster } from "@/components/ui/sonner"

export default function AdminDashboardClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </SessionProvider>
  )
}
