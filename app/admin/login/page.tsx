// Prevent static prerendering for admin login
export const dynamic = "force-dynamic"

import AdminLoginClient from "./client-page"

export default function AdminLoginPage() {
  return <AdminLoginClient />
}
