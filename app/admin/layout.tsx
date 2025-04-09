import type React from "react"
import type { Metadata } from "next"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminAuthCheck from "@/components/admin/AdminAuthCheck"

export const metadata: Metadata = {
  title: "Admin Dashboard | Saree Elegance",
  description: "Admin dashboard for Saree Elegance e-commerce store",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-muted/30">
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
          </div>
        </div>
      </div>
    </AdminAuthCheck>
  )
}

