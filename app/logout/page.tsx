"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would handle the logout process
    // For now, we'll just redirect after a short delay
    const timer = setTimeout(() => {
      router.push("/")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="container px-4 md:px-6 py-16 flex flex-col items-center justify-center text-center">
      <LogOut className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-3xl font-playfair font-medium mb-2">Logging Out</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        You are being logged out of your account. You will be redirected to the homepage shortly.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/account">Back to Account</Link>
        </Button>
      </div>
    </div>
  )
}

