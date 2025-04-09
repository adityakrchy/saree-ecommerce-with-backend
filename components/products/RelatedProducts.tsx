import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-playfair font-medium mb-6">You May Also Like</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            </div>

            <div className="p-3">
              <h3 className="font-medium line-clamp-1 text-sm group-hover:text-primary transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-semibold text-sm">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

