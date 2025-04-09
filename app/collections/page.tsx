import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Collections | Saree Elegance",
  description: "Explore our curated collections of traditional and designer sarees for every occasion.",
}

const collections = [
  {
    id: "silk",
    name: "Silk Sarees",
    description: "Luxurious silk sarees for special occasions",
    image: "/images/categories/silk.jpg",
    items: 42,
  },
  {
    id: "cotton",
    name: "Cotton Sarees",
    description: "Comfortable and elegant cotton sarees",
    image: "/images/categories/cotton.jpg",
    items: 38,
  },
  {
    id: "wedding",
    name: "Wedding Collection",
    description: "Exquisite sarees for your special day",
    image: "/images/categories/wedding.jpg",
    items: 25,
  },
  {
    id: "festive",
    name: "Festive Collection",
    description: "Celebrate festivals with our vibrant collection",
    image: "/images/categories/festive.jpg",
    items: 30,
  },
  {
    id: "casual",
    name: "Casual Wear",
    description: "Everyday sarees for comfort and style",
    image: "/images/categories/casual.jpg",
    items: 35,
  },
  {
    id: "designer",
    name: "Designer Collection",
    description: "Contemporary designs with traditional craftsmanship",
    image: "/images/categories/designer.jpg",
    items: 28,
  },
]

export default function CollectionsPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium">Our Collections</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collections of traditional and designer sarees for every occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group overflow-hidden rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-xl font-medium mb-1">{collection.name}</h2>
                <p className="text-sm text-white/80 mb-2">{collection.description}</p>
                <p className="text-sm font-medium">{collection.items} Products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-playfair font-medium mb-4">Looking for Something Specific?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Browse our complete collection of sarees or use our advanced filters to find exactly what you're looking for.
        </p>
        <Button asChild className="group">
          <Link href="/products">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

