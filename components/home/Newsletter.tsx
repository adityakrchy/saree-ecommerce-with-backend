"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Thank you for subscribing!",
      description: "You've been added to our newsletter list.",
    })

    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section className="bg-primary/5 py-16">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-4">Join Our Newsletter</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Subscribe to receive updates on new arrivals, special offers and other discount information.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
          <Button type="submit" disabled={isSubmitting} className="h-12">
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  )
}

