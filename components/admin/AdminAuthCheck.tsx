"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface AdminAuthCheckProps {
  children: React.ReactNode
}

export default function AdminAuthCheck({ children }: AdminAuthCheckProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated as admin
    const checkAuth = () => {
      const adminSession = localStorage.getItem("adminSession")

      if (!adminSession && pathname !== "/admin/login") {
        toast({
          title: "Authentication required",
          description: "Please login to access the admin dashboard",
        })
        router.push("/admin/login")
        return
      }

      if (adminSession) {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router, toast])

  // Show nothing while checking authentication
  if (isLoading) {
    return null
  }

  // If on login page and authenticated, redirect to dashboard
  if (pathname === "/admin/login" && isAuthenticated) {
    router.push("/admin/dashboard")
    return null
  }

  // If on login page and not authenticated, show login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // If authenticated, show the admin content
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Otherwise, show nothing (will redirect to login)
  return null
}

