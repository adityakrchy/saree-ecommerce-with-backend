"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: ShoppingBag,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: Package,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  return (
    <div
      className={`relative flex flex-col border-r bg-card transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-2 font-semibold ${collapsed ? "justify-center" : ""}`}
        >
          {collapsed ? (
            <span className="text-xl font-bold">SE</span>
          ) : (
            <span className="text-xl font-bold">Saree Elegance</span>
          )}
        </Link>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border bg-background"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Back to Store</span>}
          </Link>
          <Button
            variant="ghost"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-100 hover:text-red-600 ${
              collapsed ? "justify-center" : ""
            }`}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}

