"use client"

import { useCart } from "@/components/cart/CartContext"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function CheckoutSummary() {
  const { cart, totalPrice, totalItems } = useCart()

  return (
    <div className="bg-muted/50 rounded-lg p-6">
      <h2 className="text-xl font-medium mb-4">Order Summary</h2>

      <div className="space-y-4 max-h-[300px] overflow-auto mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative aspect-square w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-sm line-clamp-1">{item.name}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              <p className="text-sm mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{totalPrice >= 1999 ? "Free" : "₹99"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-medium text-base pt-2">
          <span>Total</span>
          <span>₹{(totalPrice + (totalPrice >= 1999 ? 0 : 99) + Math.round(totalPrice * 0.18)).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

