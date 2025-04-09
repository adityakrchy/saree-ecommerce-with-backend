import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "About Us | Saree Elegance",
  description: "Learn about our journey, values, and commitment to preserving the art of traditional sarees.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero Section */}
      <section className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-medium mb-4">Our Story</h1>
            <p className="text-muted-foreground mb-6">
              For over three decades, Saree Elegance has been curating the finest sarees from across India. What started
              as a small family shop has now grown into a beloved brand, trusted by generations of women for their most
              special occasions.
            </p>
            <p className="text-muted-foreground">
              Each saree in our collection tells a story - of the artisans who created it, the traditions it represents,
              and the moments it will be part of in your life.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg">
            <Image src="/images/about-image.jpg" alt="Our story" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-primary/5 py-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-4">Our Mission</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            At Saree Elegance, our mission is to preserve and promote the rich heritage of Indian sarees while making
            them accessible to women everywhere. We believe that every saree tells a story, and we're committed to
            sharing these stories with the world.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Quality Craftsmanship</h3>
              <p className="text-muted-foreground">
                We work directly with skilled artisans and weavers to bring you sarees of exceptional quality and
                craftsmanship.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Cultural Heritage</h3>
              <p className="text-muted-foreground">
                We're dedicated to preserving traditional weaving techniques and designs that have been passed down
                through generations.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Customer Satisfaction</h3>
              <p className="text-muted-foreground">
                We strive to provide an exceptional shopping experience with personalized service and attention to
                detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our passionate team brings together expertise in textiles, fashion, and customer service to provide you with
            the best saree shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
              <Image src="/images/team/founder.jpg" alt="Founder" fill className="object-cover" />
            </div>
            <h3 className="font-medium text-lg">Rajesh Sharma</h3>
            <p className="text-primary text-sm mb-2">Founder & CEO</p>
            <p className="text-muted-foreground text-sm">
              With over 35 years in the textile industry, Rajesh brings unparalleled expertise and passion.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
              <Image src="/images/team/creative-director.jpg" alt="Creative Director" fill className="object-cover" />
            </div>
            <h3 className="font-medium text-lg">Priya Sharma</h3>
            <p className="text-primary text-sm mb-2">Creative Director</p>
            <p className="text-muted-foreground text-sm">
              Priya's eye for design and color brings our collections to life with contemporary elegance.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
              <Image src="/images/team/textile-expert.jpg" alt="Textile Expert" fill className="object-cover" />
            </div>
            <h3 className="font-medium text-lg">Ananya Patel</h3>
            <p className="text-primary text-sm mb-2">Textile Expert</p>
            <p className="text-muted-foreground text-sm">
              Ananya works closely with artisans across India to source the finest fabrics and designs.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
              <Image
                src="/images/team/customer-service.jpg"
                alt="Customer Service Manager"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-medium text-lg">Vikram Singh</h3>
            <p className="text-primary text-sm mb-2">Customer Service Manager</p>
            <p className="text-muted-foreground text-sm">
              Vikram ensures that every customer receives personalized attention and support.
            </p>
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section className="bg-muted/30 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-4">Supporting Artisans</h2>
              <p className="text-muted-foreground mb-4">
                We believe in fair trade and supporting the artisans who create our beautiful sarees. By working
                directly with weavers and craftspeople, we ensure they receive fair compensation for their exceptional
                work.
              </p>
              <p className="text-muted-foreground mb-6">
                Our partnerships with artisan communities across India help preserve traditional weaving techniques and
                provide sustainable livelihoods for skilled craftspeople.
              </p>
              <Button asChild className="group">
                <Link href="/collections">
                  Explore Our Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src="/images/artisans/artisan1.jpg" alt="Artisan weaving" fill className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/images/artisans/artisan2.jpg"
                  alt="Artisan creating designs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src="/images/artisans/artisan3.jpg" alt="Artisan dyeing fabric" fill className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src="/images/artisans/artisan4.jpg" alt="Finished saree" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6 text-center py-8">
        <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-4">Experience the Elegance</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover our exquisite collection of sarees and be part of our journey to preserve and celebrate the rich
          textile heritage of India.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="group">
            <Link href="/products">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

