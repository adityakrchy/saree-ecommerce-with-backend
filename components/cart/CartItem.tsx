"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart, type CartItem as CartItemType } from "./CartContext"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity === item.quantity) return

    setIsUpdating(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    updateQuantity(item.id, newQuantity)
    setIsUpdating(false)
  }

  const handleRemove = async () => {
    setIsUpdating(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    removeFromCart(item.id)
  }

  return (
    <div className="py-6 flex flex-col sm:flex-row gap-4">
      <div className="relative aspect-square w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col sm:flex-row flex-1 gap-4 justify-between">
        <div className="space-y-1">
          <Link href={`/products/${item.id}`} className="font-medium hover:underline">
            {item.name}
          </Link>
          <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString()} each</p>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>

            <div className="flex h-8 w-10 items-center justify-center border-y text-sm">
              {isUpdating ? "..." : item.quantity}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={handleRemove}
              disabled={isUpdating}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>

            <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

