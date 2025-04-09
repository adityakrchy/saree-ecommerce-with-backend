import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import HeroBanner from "@/components/home/HeroBanner"
import Newsletter from "@/components/home/Newsletter"
import { Suspense } from "react"
import CategoryShowcase from "@/components/home/CategoryShowcase"
import Testimonials from "@/components/home/Testimonials"
import FeaturedProducts from "@/components/home/FeaturedProducts"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroBanner />

      {/* Collections */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium">Our Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked collections for every occasion, crafted with love and tradition
          </p>
        </div>

        <CategoryShowcase />

        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" className="group">
            <Link href="/collections">
              View All Collections
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium">Featured Sarees</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular designs, loved by customers across the country
          </p>
        </div>

        <Suspense fallback={<div className="h-[400px] w-full bg-muted/20 animate-pulse rounded-lg"></div>}>
          <FeaturedProducts />
        </Suspense>

        <div className="flex justify-center mt-8">
          <Button asChild className="group">
            <Link href="/products">
              Shop All Sarees
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-primary/5 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg">
              <Image src="/images/about-image.jpg" alt="Our story" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-playfair font-medium">Our Story</h2>
              <p className="text-muted-foreground">
                For over three decades, we've been curating the finest sarees from across India. What started as a small
                family shop has now grown into a beloved brand, trusted by generations of women for their most special
                occasions.
              </p>
              <p className="text-muted-foreground">
                Each saree in our collection tells a story - of the artisans who created it, the traditions it
                represents, and the moments it will be part of in your life.
              </p>
              <Button asChild variant="outline" className="w-fit group">
                <Link href="/about">
                  Read More About Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium">Customer Love</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What our customers say about their experience with us
          </p>
        </div>

        <Testimonials />
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

