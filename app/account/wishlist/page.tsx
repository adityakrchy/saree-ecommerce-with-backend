"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { User, Package, Heart, LogOut, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart/CartContext"

// Mock data for wishlist
const wishlistItems = [
  {
    id: "silk-001",
    name: "Royal Kanjivaram Silk Saree",
    price: 15999,
    originalPrice: 18999,
    discount: 15,
    image: "/images/products/silk-001-1.jpg",
    inStock: true,
  },
  {
    id: "banarasi-001",
    name: "Traditional Banarasi Saree",
    price: 12999,
    originalPrice: 14999,
    discount: 13,
    image: "/images/products/banarasi-001-1.jpg",
    inStock: true,
  },
  {
    id: "cotton-002",
    name: "Kalamkari Cotton Saree",
    price: 3299,
    image: "/images/products/cotton-002-1.jpg",
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(wishlistItems)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    })
  }

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-4">
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-medium">Priya Sharma</h2>
            <p className="text-sm text-muted-foreground">Member since Jan 2023</p>
          </div>

          <nav className="space-y-1">
            <Link href="/account" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link href="/account/orders" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <Link
              href="/account/wishlist"
              className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-primary font-medium"
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Link>
            <Link href="/logout" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Link>
          </nav>
        </aside>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-medium">My Wishlist</h2>
            <p className="text-sm text-muted-foreground">{wishlist.length} items</p>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">Add items to your wishlist to save them for later.</p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <Link href={`/products/${item.id}`}>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {item.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        {item.discount}% OFF
                      </div>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <p className="font-medium text-destructive">Out of Stock</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <Link href={`/products/${item.id}`} className="hover:underline">
                      <h3 className="font-medium line-clamp-1">{item.name}</h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="mt-4">
                      <Button className="w-full" disabled={!item.inStock} onClick={() => handleAddToCart(item)}>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

