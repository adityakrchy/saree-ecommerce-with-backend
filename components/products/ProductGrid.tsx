import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">No products found</h2>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group block overflow-hidden rounded-lg border hover:shadow-md transition-shadow"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {product.discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs">{product.rating}</span>
              </div>
            </div>

            <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-semibold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

