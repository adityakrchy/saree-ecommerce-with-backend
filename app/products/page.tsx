import { Suspense } from "react"
import ProductGrid from "@/components/products/ProductGrid"
import ProductFilters from "@/components/products/ProductFilters"
import ProductSort from "@/components/products/ProductSort"
import { Separator } from "@/components/ui/separator"
import ProductsLoading from "./loading"
import { getProducts } from "@/lib/products"

export const metadata = {
  title: "Shop All Sarees | Saree Elegance",
  description: "Browse our complete collection of traditional and designer sarees for every occasion.",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const products = await getProducts(searchParams)

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium">All Sarees</h1>
        <p className="text-muted-foreground">Browse our complete collection of sarees</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block">
          <ProductFilters />
        </aside>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{products.length}</span> results
            </p>
            <ProductSort />
          </div>

          <Separator />

          <Suspense fallback={<ProductsLoading />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

