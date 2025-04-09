"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Mail, MoreHorizontal, Loader2 } from "lucide-react"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Mock data for customers
const customers = [
  {
    id: "CUST-001",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    orders: 5,
    totalSpent: 32499,
    status: "active",
    joinDate: "2023-05-15",
  },
  {
    id: "CUST-002",
    name: "Ananya Patel",
    email: "ananya.patel@example.com",
    phone: "+91 87654 32109",
    orders: 3,
    totalSpent: 18999,
    status: "active",
    joinDate: "2023-06-22",
  },
  {
    id: "CUST-003",
    name: "Meera Reddy",
    email: "meera.reddy@example.com",
    phone: "+91 76543 21098",
    orders: 7,
    totalSpent: 45999,
    status: "active",
    joinDate: "2023-03-10",
  },
  {
    id: "CUST-004",
    name: "Kavita Iyer",
    email: "kavita.iyer@example.com",
    phone: "+91 65432 10987",
    orders: 2,
    totalSpent: 12999,
    status: "inactive",
    joinDate: "2023-07-05",
  },
  {
    id: "CUST-005",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 54321 09876",
    orders: 4,
    totalSpent: 28999,
    status: "active",
    joinDate: "2023-04-18",
  },
  {
    id: "CUST-006",
    name: "Sunita Verma",
    email: "sunita.verma@example.com",
    phone: "+91 43210 98765",
    orders: 1,
    totalSpent: 7499,
    status: "active",
    joinDate: "2023-08-30",
  },
  {
    id: "CUST-007",
    name: "Amit Singh",
    email: "amit.singh@example.com",
    phone: "+91 32109 87654",
    orders: 6,
    totalSpent: 39999,
    status: "active",
    joinDate: "2023-02-12",
  },
  {
    id: "CUST-008",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 21098 76543",
    orders: 0,
    totalSpent: 0,
    status: "inactive",
    joinDate: "2023-09-08",
  },
]

export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [filteredCustomers, setFilteredCustomers] = useState(customers)
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
    // Filter and sort customers
    let result = [...customers]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((customer) => customer.status === statusFilter)
    }

    // Apply sorting
    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime())
        break
      case "orders":
        result.sort((a, b) => b.orders - a.orders)
        break
      case "spent":
        result.sort((a, b) => b.totalSpent - a.totalSpent)
        break
    }

    setFilteredCustomers(result)
  }, [searchTerm, statusFilter, sortOrder])

  const handleEmailAll = () => {
    toast({
      title: "Email sent",
      description: "Email has been sent to all customers.",
    })
  }

  const handleViewDetails = (id: string) => {
    router.push(`/admin/customers/${id}`)
  }

  const handleViewOrders = (id: string) => {
    router.push(`/admin/customers/${id}?tab=orders`)
  }

  const handleSendEmail = (email: string) => {
    toast({
      title: "Email action",
      description: `Email action triggered for ${email}`,
    })
  }

  const handleDeleteCustomer = (id: string) => {
    toast({
      title: "Customer deleted",
      description: `Customer ${id} has been deleted.`,
      variant: "destructive",
    })

    // Remove from filtered list
    setFilteredCustomers((prev) => prev.filter((customer) => customer.id !== id))
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
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database.</p>
        </div>
        <Button onClick={handleEmailAll}>
          <Mail className="h-4 w-4 mr-2" />
          Email All
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="orders">Most Orders</SelectItem>
                  <SelectItem value="spent">Highest Spent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No customers found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{customer.email}</span>
                          <span className="text-xs text-muted-foreground">{customer.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>₹{customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={customer.status === "active" ? "default" : "outline"}
                          className={customer.status === "active" ? "bg-green-500" : ""}
                        >
                          {customer.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(customer.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewOrders(customer.id)}>
                              View Orders
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendEmail(customer.email)}>
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

