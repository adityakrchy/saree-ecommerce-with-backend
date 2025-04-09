"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/CartContext"
import CartItem from "@/components/cart/CartItem"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"

export default function CartPage() {
  const { cart, totalPrice, totalItems } = useCart()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (totalItems === 0) {
    return (
      <div className="container px-4 md:px-6 py-16 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-playfair font-medium mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven't added any sarees to your cart yet. Explore our collections to find the perfect saree
          for you.
        </p>
        <Button asChild>
          <Link href="/products">
            Browse Sarees
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between py-4 text-sm font-medium">
            <span>Product</span>
            <span>Total</span>
          </div>

          <Separator />

          <div className="divide-y">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button asChild variant="outline">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{totalPrice >= 1999 ? "Free" : "₹99"}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-medium text-base pt-2">
              <span>Total</span>
              <span>₹{(totalPrice + (totalPrice >= 1999 ? 0 : 99)).toLocaleString()}</span>
            </div>
          </div>

          <Button asChild className="w-full mt-6">
            <Link href="/checkout">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <div className="mt-6 text-xs text-muted-foreground">
            <p>We accept:</p>
            <div className="flex gap-2 mt-2">
              <div className="bg-background rounded p-1">Visa</div>
              <div className="bg-background rounded p-1">Mastercard</div>
              <div className="bg-background rounded p-1">UPI</div>
              <div className="bg-background rounded p-1">COD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

