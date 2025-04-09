import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, Package, MapPin, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Shipping & Returns | Saree Elegance",
  description: "Learn about our shipping policies, delivery times, and return process.",
}

export default function ShippingPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium">Shipping & Returns</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about our shipping policies, delivery times, and return process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Truck className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-lg font-medium mb-2">Free Shipping</h2>
            <p className="text-sm text-muted-foreground">Free shipping on all orders above ₹1,999 across India.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Clock className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-lg font-medium mb-2">Fast Delivery</h2>
            <p className="text-sm text-muted-foreground">
              3-5 business days for standard shipping, 1-2 days for express.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Package className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-lg font-medium mb-2">Easy Returns</h2>
            <p className="text-sm text-muted-foreground">
              30-day easy return policy for unused items in original packaging.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <MapPin className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-lg font-medium mb-2">Pan India Delivery</h2>
            <p className="text-sm text-muted-foreground">
              We deliver to all major cities and remote locations across India.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-playfair font-medium mb-6">Shipping Information</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Shipping Methods & Costs</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">We offer the following shipping methods:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Standard Shipping:</span> ₹99 (Free for orders above
                    ₹1,999)
                    <br />
                    <span className="text-sm">Delivery in 3-5 business days</span>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Express Shipping:</span> ₹299
                    <br />
                    <span className="text-sm">Delivery in 1-2 business days</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Delivery Timeframes</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Delivery times vary based on your location and the shipping method selected:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Metro Cities:</span> 2-3 business days (Standard), 1
                    business day (Express)
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Tier 2 Cities:</span> 3-4 business days (Standard),
                    1-2 business days (Express)
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Other Locations:</span> 4-5 business days (Standard),
                    2 business days (Express)
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Please note that delivery times may be longer during peak seasons and sale periods.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Order Tracking</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Once your order is shipped, you will receive a tracking number via email and SMS. You can track your
                  order in the following ways:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Log in to your account and go to the "My Orders" section</li>
                  <li>Click on the "Track Order" button in your shipping confirmation email</li>
                  <li>Contact our customer service team with your order number</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>International Shipping</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We currently ship to select international destinations including the USA, UK, Canada, Australia, UAE,
                  Singapore, and Malaysia. International shipping costs and delivery times vary by location. Please
                  contact our customer service team for more information about international shipping options and rates.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h2 className="text-2xl font-playfair font-medium mb-6">Returns & Exchanges</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  We accept returns within 30 days of delivery, provided that:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>The item is unused, unworn, and in its original condition</li>
                  <li>All tags and packaging are intact</li>
                  <li>You have the original receipt or proof of purchase</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Custom-made or personalized items cannot be returned unless they are defective.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How to Return</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">To initiate a return, please follow these steps:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Log in to your account and go to the "My Orders" section</li>
                  <li>Select the order and item you wish to return</li>
                  <li>Choose a reason for the return</li>
                  <li>Select whether you want a refund or exchange</li>
                  <li>Print the return shipping label (if applicable)</li>
                  <li>Pack the item securely in its original packaging</li>
                  <li>Attach the return shipping label and send the package</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Refund Process</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Once we receive and inspect your return, we will process your refund:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Credit/Debit Card:</span> 5-7 business days
                  </li>
                  <li>
                    <span className="font-medium text-foreground">UPI:</span> 3-5 business days
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Store Credit:</span> Immediate
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Shipping charges are non-refundable unless the return is due to our error.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Exchanges</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  If you wish to exchange an item for a different size, color, or design, please follow the return
                  process and select "Exchange" instead of "Refund." Once we receive your return, we will ship the
                  replacement item to you. Please note that exchanges are subject to availability, and if the requested
                  item is unavailable, we will issue a refund instead.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

