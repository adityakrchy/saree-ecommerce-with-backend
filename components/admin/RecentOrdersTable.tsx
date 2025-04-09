"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Truck, Clock, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    date: "2023-11-15",
    total: 12999,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Ananya Patel",
    date: "2023-11-12",
    total: 8499,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Meera Reddy",
    date: "2023-11-10",
    total: 15999,
    status: "Processing",
    items: 3,
  },
  {
    id: "ORD-004",
    customer: "Kavita Iyer",
    date: "2023-11-08",
    total: 5999,
    status: "Cancelled",
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Rajesh Kumar",
    date: "2023-11-05",
    total: 9999,
    status: "Delivered",
    items: 2,
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

export default function RecentOrdersTable() {
  const router = useRouter()

  const handleViewOrder = (id: string) => {
    router.push(`/admin/orders/${id}`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order.id)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

