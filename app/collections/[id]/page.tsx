import { notFound } from "next/navigation"
import ProductGrid from "@/components/products/ProductGrid"
import ProductFilters from "@/components/products/ProductFilters"
import ProductSort from "@/components/products/ProductSort"
import { Separator } from "@/components/ui/separator"
import { getProducts } from "@/lib/products"
import type { Metadata } from "next"

interface CollectionPageProps {
  params: {
    id: string
  }
}

// Collection data
const collections = {
  silk: {
    name: "Silk Sarees",
    description:
      "Discover our exquisite collection of silk sarees, including Kanjivaram, Banarasi, and Mysore silk varieties. Perfect for weddings, festivals, and special occasions.",
  },
  cotton: {
    name: "Cotton Sarees",
    description:
      "Explore our comfortable and elegant cotton sarees, including handloom, Kalamkari, and block-printed designs. Ideal for everyday wear and casual occasions.",
  },
  wedding: {
    name: "Wedding Collection",
    description:
      "Make your special day even more memorable with our stunning wedding sarees. From traditional reds to contemporary designs, find the perfect saree for your wedding.",
  },
  festive: {
    name: "Festive Collection",
    description:
      "Celebrate festivals in style with our vibrant festive collection. Featuring rich colors, intricate embroidery, and traditional motifs for all your festive occasions.",
  },
  casual: {
    name: "Casual Wear",
    description:
      "Stay comfortable without compromising on style with our casual wear sarees. Perfect for office, daily wear, and informal gatherings.",
  },
  designer: {
    name: "Designer Collection",
    description:
      "Experience the perfect blend of tradition and contemporary fashion with our designer sarees. Unique patterns, innovative designs, and premium craftsmanship.",
  },
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = collections[params.id as keyof typeof collections]

  if (!collection) {
    return {
      title: "Collection Not Found | Saree Elegance",
    }
  }

  return {
    title: `${collection.name} | Saree Elegance`,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = collections[params.id as keyof typeof collections]

  if (!collection) {
    notFound()
  }

  // In a real app, we would filter products by collection
  const products = await getProducts()
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === params.id || product.occasion.toLowerCase() === params.id,
  )

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium">{collection.name}</h1>
        <p className="text-muted-foreground">{collection.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block">
          <ProductFilters />
        </aside>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> results
            </p>
            <ProductSort />
          </div>

          <Separator />

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}

