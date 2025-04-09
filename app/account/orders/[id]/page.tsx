"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, CheckCircle, Truck, Clock, XCircle, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Mock data for a specific order
const orderData = {
  SE12345678: {
    id: "SE12345678",
    date: "2023-11-15",
    total: 12999,
    status: "Delivered",
    items: 2,
    products: [
      {
        id: "silk-001",
        name: "Royal Kanjivaram Silk Saree",
        price: 8999,
        image: "/images/products/silk-001-1.jpg",
        quantity: 1,
      },
      {
        id: "cotton-001",
        name: "Handloom Cotton Saree",
        price: 3999,
        image: "/images/products/cotton-001-1.jpg",
        quantity: 1,
      },
    ],
    shipping: {
      address: "123 Main Street, Apartment 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "4242",
      status: "Paid",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "2023-11-15 10:30 AM",
      },
      {
        status: "Payment Confirmed",
        date: "2023-11-15 10:35 AM",
      },
      {
        status: "Processing",
        date: "2023-11-16 09:15 AM",
      },
      {
        status: "Shipped",
        date: "2023-11-17 02:45 PM",
      },
      {
        status: "Delivered",
        date: "2023-11-19 11:20 AM",
      },
    ],
    canCancel: false,
  },
  SE12345679: {
    id: "SE12345679",
    date: "2023-10-28",
    total: 8499,
    status: "Shipped",
    items: 1,
    products: [
      {
        id: "georgette-001",
        name: "Floral Georgette Saree",
        price: 8499,
        image: "/images/products/georgette-001-1.jpg",
        quantity: 1,
      },
    ],
    shipping: {
      address: "456 Park Avenue, Tower B, Flat 302",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
    },
    payment: {
      method: "UPI",
      status: "Paid",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "2023-10-28 15:45 PM",
      },
      {
        status: "Payment Confirmed",
        date: "2023-10-28 15:46 PM",
      },
      {
        status: "Processing",
        date: "2023-10-29 11:30 AM",
      },
      {
        status: "Shipped",
        date: "2023-10-30 14:20 PM",
      },
    ],
    canCancel: false,
  },
  SE12345680: {
    id: "SE12345680",
    date: "2023-09-05",
    total: 15999,
    status: "Processing",
    items: 3,
    products: [
      {
        id: "banarasi-001",
        name: "Traditional Banarasi Saree",
        price: 12999,
        image: "/images/products/banarasi-001-1.jpg",
        quantity: 1,
      },
      {
        id: "cotton-002",
        name: "Kalamkari Cotton Saree",
        price: 3000,
        image: "/images/products/cotton-002-1.jpg",
        quantity: 1,
      },
    ],
    shipping: {
      address: "789 Garden Road",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
      status: "Paid",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "2023-09-05 09:20 AM",
      },
      {
        status: "Payment Confirmed",
        date: "2023-09-05 09:25 AM",
      },
      {
        status: "Processing",
        date: "2023-09-06 10:15 AM",
      },
    ],
    canCancel: true,
  },
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Delivered":
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="h-3 w-3 mr-1" /> {status}
        </Badge>
      )
    case "Shipped":
      return (
        <Badge className="bg-blue-500">
          <Truck className="h-3 w-3 mr-1" /> {status}
        </Badge>
      )
    case "Processing":
      return (
        <Badge className="bg-yellow-500">
          <Clock className="h-3 w-3 mr-1" /> {status}
        </Badge>
      )
    case "Cancelled":
      return (
        <Badge className="bg-red-500">
          <XCircle className="h-3 w-3 mr-1" /> {status}
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = orderData[params.id as keyof typeof orderData]
  const [isCancelling, setIsCancelling] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleCancelOrder = async () => {
    setIsCancelling(true)

    // TODO: Replace with actual API call when integrating with backend
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Order cancelled",
      description: `Order #${params.id} has been cancelled successfully.`,
    })

    setDialogOpen(false)
    setIsCancelling(false)

    // In a real app, we would update the order status
    // For now, we'll just redirect to the orders page
    window.location.href = "/account/orders"
  }

  if (!order) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/account/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-medium">Order Details</h1>
        </div>

        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">Order not found</h2>
          <p className="text-muted-foreground mb-6">
            The order you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button asChild>
            <Link href="/account/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/account/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-medium">Order #{order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4 flex justify-between items-center">
              <h2 className="font-medium">Order Status</h2>
              {getStatusBadge(order.status)}
            </div>
            <div className="p-4">
              <ol className="relative border-l border-muted ml-3">
                {order.timeline.map((event, index) => (
                  <li key={index} className="mb-6 ml-6">
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Package className="h-3 w-3" />
                    </span>
                    <h3 className="font-medium">{event.status}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4">
              <h2 className="font-medium">Order Items</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {order.products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={product.image || "/placeholder.svg?height=80&width=80"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Link href={`/products/${product.id}`} className="font-medium hover:underline">
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Qty: {product.quantity} × ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(product.price * product.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4">
              <h2 className="font-medium">Order Summary</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.total >= 1999 ? "Free" : "₹99"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{Math.round(order.total * 0.18).toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    ₹{(order.total + (order.total >= 1999 ? 0 : 99) + Math.round(order.total * 0.18)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4">
              <h2 className="font-medium">Shipping Address</h2>
            </div>
            <div className="p-4">
              <p className="text-sm">
                {order.shipping.address}
                <br />
                {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}
                <br />
                {order.shipping.country}
              </p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4">
              <h2 className="font-medium">Payment Information</h2>
            </div>
            <div className="p-4">
              <p className="text-sm">
                Method: {order.payment.method}
                <br />
                {order.payment.cardLast4 && `Card ending in: ${order.payment.cardLast4}`}
                <br />
                Status: {order.payment.status}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {order.canCancel && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Cancel Order
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Order</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel this order? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <p className="text-sm">Cancellation is only available for orders that haven't been shipped yet.</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Keep Order
                    </Button>
                    <Button variant="destructive" onClick={handleCancelOrder} disabled={isCancelling}>
                      {isCancelling ? "Cancelling..." : "Yes, Cancel Order"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/contact">Need Help?</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

