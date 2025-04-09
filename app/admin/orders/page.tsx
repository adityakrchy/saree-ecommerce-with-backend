"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Filter, CheckCircle, Truck, Clock, XCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock data for orders
const orders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    date: "2023-11-15",
    total: 12999,
    status: "Delivered",
    items: 2,
    payment: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Ananya Patel",
    date: "2023-11-12",
    total: 8499,
    status: "Shipped",
    items: 1,
    payment: "UPI",
  },
  {
    id: "ORD-003",
    customer: "Meera Reddy",
    date: "2023-11-10",
    total: 15999,
    status: "Processing",
    items: 3,
    payment: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Kavita Iyer",
    date: "2023-11-08",
    total: 5999,
    status: "Cancelled",
    items: 1,
    payment: "COD",
  },
  {
    id: "ORD-005",
    customer: "Rajesh Kumar",
    date: "2023-11-05",
    total: 9999,
    status: "Delivered",
    items: 2,
    payment: "UPI",
  },
  {
    id: "ORD-006",
    customer: "Sunita Verma",
    date: "2023-11-03",
    total: 7499,
    status: "Delivered",
    items: 1,
    payment: "Credit Card",
  },
  {
    id: "ORD-007",
    customer: "Amit Singh",
    date: "2023-11-01",
    total: 11999,
    status: "Shipped",
    items: 2,
    payment: "UPI",
  },
  {
    id: "ORD-008",
    customer: "Neha Gupta",
    date: "2023-10-28",
    total: 6499,
    status: "Processing",
    items: 1,
    payment: "COD",
  },
]

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
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if admin is authenticated
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [router])

  useEffect(() => {
    // Filter and sort orders
    let result = [...orders]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status.toLowerCase() === statusFilter)
    }

    // Apply sorting
    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "highest":
        result.sort((a, b) => b.total - a.total)
        break
      case "lowest":
        result.sort((a, b) => a.total - b.total)
        break
    }

    setFilteredOrders(result)
  }, [searchTerm, statusFilter, sortOrder])

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your orders data is being exported.",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and process customer orders.</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Amount</SelectItem>
                  <SelectItem value="lowest">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No orders found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.payment}</TableCell>
                      <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/orders/${order.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

