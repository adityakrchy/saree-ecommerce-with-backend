import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Order Confirmation | Saree Elegance",
}

export default function OrderSuccessPage() {
  return (
    <div className="container px-4 md:px-6 py-16 flex flex-col items-center justify-center text-center">
      <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-3xl font-playfair font-medium mb-2">Thank You for Your Order!</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Your order has been placed successfully. We've sent a confirmation email with all the details.
      </p>

      <div className="bg-muted/50 rounded-lg p-6 w-full max-w-md mb-8">
        <h2 className="font-medium mb-4">Order Summary</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-medium">#SE12345678</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <span>Credit Card</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping Method</span>
            <span>Standard Delivery</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline">
          <Link href="/account/orders">Track Order</Link>
        </Button>
        <Button asChild>
          <Link href="/products">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

