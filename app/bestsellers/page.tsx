import ProductGrid from "@/components/products/ProductGrid"
import ProductFilters from "@/components/products/ProductFilters"
import ProductSort from "@/components/products/ProductSort"
import { Separator } from "@/components/ui/separator"
import { getProducts } from "@/lib/products"

export const metadata = {
  title: "Bestsellers | Saree Elegance",
  description: "Explore our most popular sarees loved by customers across the country.",
}

export default async function BestsellersPage() {
  // In a real app, we would filter products by sales data
  const products = await getProducts()

  // For demo purposes, we'll just use products with high ratings
  const bestsellers = products.filter((product) => product.rating >= 4.5)

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium">Bestsellers</h1>
        <p className="text-muted-foreground">Explore our most popular sarees loved by customers across the country.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block">
          <ProductFilters />
        </aside>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{bestsellers.length}</span> results
            </p>
            <ProductSort />
          </div>

          <Separator />

          <ProductGrid products={bestsellers} />
        </div>
      </div>
    </div>
  )
}

