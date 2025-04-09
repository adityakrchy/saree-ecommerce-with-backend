import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

// Mock data for featured products
const featuredProducts = [
  {
    id: "silk-001",
    name: "Royal Kanjivaram Silk Saree",
    description:
      "Handcrafted pure silk Kanjivaram saree with intricate gold zari work. Perfect for weddings and special occasions.",
    price: 15999,
    originalPrice: 18999,
    discount: 15,
    rating: 4.8,
    reviewCount: 124,
    images: ["/images/products/silk-001-1.jpg"],
    category: "Silk",
    fabric: "Kanjivaram Silk",
    occasion: "Wedding",
    color: "Maroon",
    length: 6.3,
    featured: true,
  },
  {
    id: "cotton-001",
    name: "Handloom Cotton Saree",
    description:
      "Lightweight handloom cotton saree with traditional block prints. Perfect for everyday wear and casual occasions.",
    price: 2499,
    originalPrice: 2999,
    discount: 16,
    rating: 4.5,
    reviewCount: 89,
    images: ["/images/products/cotton-001-1.jpg"],
    category: "Cotton",
    fabric: "Handloom Cotton",
    occasion: "Casual",
    color: "Blue",
    length: 5.5,
    featured: true,
  },
  {
    id: "banarasi-001",
    name: "Traditional Banarasi Saree",
    description: "Exquisite Banarasi silk saree with intricate zari work. Perfect for weddings and festive occasions.",
    price: 12999,
    originalPrice: 14999,
    discount: 13,
    rating: 4.9,
    reviewCount: 112,
    images: ["/images/products/banarasi-001-1.jpg"],
    category: "Silk",
    fabric: "Banarasi Silk",
    occasion: "Wedding",
    color: "Gold",
    length: 6.0,
    featured: true,
  },
  {
    id: "silk-002",
    name: "Mysore Silk Saree",
    description: "Traditional Mysore silk saree with golden border. Lightweight and perfect for festive occasions.",
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    rating: 4.6,
    reviewCount: 78,
    images: ["/images/products/silk-002-1.jpg"],
    category: "Silk",
    fabric: "Mysore Silk",
    occasion: "Festive",
    color: "Green",
    length: 5.8,
    featured: true,
  },
]

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group block overflow-hidden rounded-lg border hover:shadow-md transition-shadow"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg?height=400&width=400"}
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
            <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>

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
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>

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

