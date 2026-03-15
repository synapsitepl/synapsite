// Force all admin dashboard pages to be dynamically rendered (no static prerendering)
export const dynamic = "force-dynamic"

import AdminDashboardClient from "./client-layout"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminDashboardClient>{children}</AdminDashboardClient>
}
