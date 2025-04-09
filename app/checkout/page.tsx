"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import CheckoutSummary from "@/components/checkout/CheckoutSummary"
import { useAuth } from "@/components/auth/AuthContext"

export default function CheckoutPage() {
  const { clearCart, totalItems } = useCart()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if cart is empty
  if (typeof window !== "undefined" && totalItems === 0) {
    router.push("/products")
  }

  // Redirect to login if not authenticated
  if (typeof window !== "undefined" && !isAuthenticated) {
    // We'll show a toast and redirect to login
    toast({
      title: "Login required",
      description: "Please login to continue with checkout",
    })
    router.push("/auth/login")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Instead of clearing cart here, we'll do it in the confirmation page
    // to ensure the order details are available there
    router.push("/checkout/confirmation")
    setIsSubmitting(false)
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-medium mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required />
              </div>
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input id="apartment" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input id="pincode" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes (optional)</Label>
                <Textarea id="notes" placeholder="Special instructions for delivery" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-medium mb-4">Payment Method</h2>
            <RadioGroup defaultValue="card">
              <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex-1 cursor-pointer">
                  UPI
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  Cash on Delivery
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div>
          <CheckoutSummary />
          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  )
}

