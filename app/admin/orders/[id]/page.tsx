import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Printer,
  Mail,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  Package,
  User,
  MapPin,
  CreditCard,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data for a specific order
const order = {
  id: "ORD-001",
  customer: {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
  },
  date: "2023-11-15",
  total: 12999,
  status: "Delivered",
  items: [
    {
      id: "silk-001",
      name: "Royal Kanjivaram Silk Saree",
      price: 8999,
      quantity: 1,
      image: "/images/products/silk-001-1.jpg",
    },
    {
      id: "cotton-001",
      name: "Handloom Cotton Saree",
      price: 3999,
      quantity: 1,
      image: "/images/products/cotton-001-1.jpg",
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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Order {params.id}</h1>
            <p className="text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button>Update Order</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Status</span>
                {getStatusBadge(order.status)}
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{Math.round(order.total * 0.18).toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{(order.total + Math.round(order.total * 0.18)).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">{order.customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                  <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Shipping Address</h3>
                  <p className="text-sm text-muted-foreground">{order.shipping.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}
                  </p>
                  <p className="text-sm text-muted-foreground">{order.shipping.country}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Payment Information</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.payment.method} {order.payment.cardLast4 ? `(**** ${order.payment.cardLast4})` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">{order.payment.status}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 py-3">
                <div className="relative h-16 w-16 overflow-hidden rounded border">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-muted">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Update Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue={order.status.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea placeholder="Add notes about this order" />
              </div>
              <Button className="w-full">Update Status</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

