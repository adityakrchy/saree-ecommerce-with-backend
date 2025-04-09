"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, Printer, Calendar, MapPin, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/CartContext"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const { cart, totalPrice, clearCart } = useCart()
  const [orderId, setOrderId] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Generate a random order ID
    const randomOrderId = "SE" + Math.floor(10000000 + Math.random() * 90000000)
    setOrderId(randomOrderId)

    // Clear cart after confirmation
    return () => {
      clearCart()
    }
  }, [clearCart])

  // Redirect if no items in cart and page is mounted
  useEffect(() => {
    if (mounted && cart.length === 0) {
      router.push("/products")
    }
  }, [mounted, cart, router])

  if (!mounted) return null

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <div className="container px-4 md:px-6 py-16 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-playfair font-medium mb-2">Thank You for Your Order!</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your order has been placed successfully. We've sent a confirmation email with all the details.
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="font-medium text-lg">Order #{orderId}</h2>
              <p className="text-sm text-muted-foreground">Placed on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="mr-2">
                <Printer className="h-4 w-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-1">
              <div className="flex items-center text-sm font-medium">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                Estimated Delivery
              </div>
              <p className="text-sm">{estimatedDelivery.toLocaleDateString()}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm font-medium">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                Shipping Address
              </div>
              <p className="text-sm">123 Main Street, Bangalore, Karnataka, 560001</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm font-medium">
                <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                Shipping Method
              </div>
              <p className="text-sm">Standard Delivery</p>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="font-medium mb-4">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={item.image || "/placeholder.svg?height=64&width=64"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{totalPrice >= 1999 ? "Free" : "₹99"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>
                ₹{(totalPrice + (totalPrice >= 1999 ? 0 : 99) + Math.round(totalPrice * 0.18)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/account/orders">Track Order</Link>
          </Button>
          <Button asChild>
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

