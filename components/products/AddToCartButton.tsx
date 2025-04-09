"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart/CartContext"
import type { Product } from "@/lib/types"
import { Minus, Plus, ShoppingBag } from "lucide-react"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-r-none"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>

        <div className="flex h-9 w-12 items-center justify-center border-y">{quantity}</div>

        <Button variant="outline" size="icon" className="h-9 w-9 rounded-l-none" onClick={increaseQuantity}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>

      <Button onClick={handleAddToCart} className="w-full">
        <ShoppingBag className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  )
}

