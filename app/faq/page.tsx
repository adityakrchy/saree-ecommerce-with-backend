import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "FAQ | Saree Elegance",
  description: "Find answers to frequently asked questions about our products, ordering, shipping, and more.",
}

export default function FAQPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to commonly asked questions about our products, ordering, shipping, and more.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search for answers..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div>
          <h2 className="text-xl font-medium mb-4">Products & Ordering</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I know which size to order?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Most of our sarees are standard 5.5-6.3 meters in length, which fits most women. The width is
                  typically around 45-48 inches. For specific measurements of each saree, please check the product
                  description. If you need assistance with sizing, please contact our customer service team.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Are the colors accurate in the product photos?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We make every effort to display the colors of our products as accurately as possible. However, colors
                  may appear slightly different on different screens. If you have specific color requirements, please
                  contact our customer service team for assistance.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer blouse pieces with the sarees?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, most of our sarees come with a matching blouse piece (typically 0.8-1 meter). The product
                  description will specify if a blouse piece is included. We do not offer stitched blouses at this time,
                  only the fabric.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I care for my saree?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Care instructions vary depending on the fabric and work of the saree. Generally, we recommend dry
                  cleaning for silk sarees and hand washing for cotton sarees in cold water with mild detergent.
                  Specific care instructions are included with each saree and in the product description.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I customize my order?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We offer limited customization options for bulk orders. If you have specific requirements, please
                  contact our customer service team to discuss your needs. Please note that customized orders may take
                  longer to process and cannot be returned unless defective.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">Shipping & Returns</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long will it take to receive my order?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Standard shipping typically takes 3-5 business days within India. Express shipping is available for
                  1-2 business day delivery. International shipping times vary by location, generally taking 7-14
                  business days. You will receive tracking information once your order ships.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, we offer free standard shipping on all orders above ₹1,999 within India. For orders below this
                  amount, a shipping fee of ₹99 applies. Express shipping is available for an additional charge of ₹299.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We accept returns within 30 days of delivery, provided the item is unused, unworn, and in its original
                  condition with all tags and packaging intact. Custom-made or personalized items cannot be returned
                  unless they are defective. Please visit our{" "}
                  <Link href="/shipping" className="text-primary hover:underline">
                    Shipping & Returns
                  </Link>{" "}
                  page for more details.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I track my order?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Once your order ships, you will receive a tracking number via email and SMS. You can track your order
                  by logging into your account and going to the "My Orders" section, or by clicking the tracking link in
                  your shipping confirmation email.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, we ship to select international destinations including the USA, UK, Canada, Australia, UAE,
                  Singapore, and Malaysia. International shipping costs and delivery times vary by location. Please
                  contact our customer service team for more information about international shipping options and rates.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-medium mb-4">Still have questions?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          If you couldn't find the answer to your question, please don't hesitate to contact our customer service team.
          We're here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="mailto:support@sareeelegance.com">Email Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

