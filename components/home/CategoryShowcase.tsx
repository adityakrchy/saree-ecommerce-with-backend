import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    name: "Silk Sarees",
    description: "Luxurious silk sarees for special occasions",
    image: "/images/categories/silk.jpg",
    href: "/collections/silk",
  },
  {
    name: "Cotton Sarees",
    description: "Comfortable and elegant cotton sarees",
    image: "/images/categories/cotton.jpg",
    href: "/collections/cotton",
  },
  {
    name: "Wedding Collection",
    description: "Exquisite sarees for your special day",
    image: "/images/categories/wedding.jpg",
    href: "/collections/wedding",
  },
  {
    name: "Festive Collection",
    description: "Celebrate festivals with our vibrant collection",
    image: "/images/categories/festive.jpg",
    href: "/collections/festive",
  },
]

export default function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="group relative overflow-hidden rounded-lg aspect-[4/5]"
        >
          <Image
            src={category.image || "/placeholder.svg?height=500&width=400"}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-medium mb-1">{category.name}</h3>
            <p className="text-sm text-white/80">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

