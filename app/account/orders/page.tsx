"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Package, Heart, LogOut, Eye, CheckCircle, Truck, Clock, XCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Mock data for orders
const orders = [
  {
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
  },
  {
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
  },
  {
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
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "Shipped":
      return <Truck className="h-5 w-5 text-blue-500" />
    case "Processing":
      return <Clock className="h-5 w-5 text-yellow-500" />
    case "Cancelled":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <Package className="h-5 w-5" />
  }
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

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-4">
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-medium">Priya Sharma</h2>
            <p className="text-sm text-muted-foreground">Member since Jan 2023</p>
          </div>

          <nav className="space-y-1">
            <Link href="/account" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/account/orders"
              className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-primary font-medium"
            >
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <Link href="/account/wishlist" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Link>
            <Link href="/logout" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Link>
          </nav>
        </aside>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-medium">My Orders</h2>
            <div className="relative">
              <Input placeholder="Search orders..." className="w-full sm:w-[250px]" />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <Button asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders
                  .filter((order) => activeTab === "all" || order.status.toLowerCase() === activeTab)
                  .map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">Order #{order.id}</h3>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">₹{order.total.toLocaleString()}</p>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/account/orders/${order.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="space-y-4">
                          {order.products.map((product) => (
                            <div key={product.id} className="flex items-center gap-4">
                              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
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
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

