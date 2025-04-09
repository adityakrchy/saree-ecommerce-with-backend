import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Star, Truck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import AddToCartButton from "@/components/products/AddToCartButton"
import ProductImageGallery from "@/components/products/ProductImageGallery"
import RelatedProducts from "@/components/products/RelatedProducts"
import ProductReviews from "@/components/products/ProductReviews"
import { getProductById, getRelatedProducts } from "@/lib/products"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found | Saree Elegance",
    }
  }

  return {
    title: `${product.name} | Saree Elegance`,
    description: product.description,
    openGraph: {
      images: [{ url: product.images[0], width: 1200, height: 630 }],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id)

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Link href="/products" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all sarees
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageGallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-primary font-medium mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-semibold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount && (
                <span className="text-sm font-medium text-green-600">({product.discount}% off)</span>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="font-medium">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Fabric</span>
                <span className="font-medium">{product.fabric}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Occasion</span>
                <span className="font-medium">{product.occasion}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Color</span>
                <span className="font-medium">{product.color}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Length</span>
                <span className="font-medium">{product.length} meters</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <span className="text-sm">In Stock</span>
            </div>

            <AddToCartButton product={product} />

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders above ₹1,999</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-16" />

      <ProductReviews productId={product.id} reviews={product.reviews} />

      <Separator className="my-16" />

      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

