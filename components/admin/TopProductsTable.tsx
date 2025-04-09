"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Mock data for top products
const topProducts = [
  {
    id: "silk-001",
    name: "Royal Kanjivaram Silk Saree",
    image: "/images/products/silk-001-1.jpg",
    category: "Silk",
    price: 15999,
    sold: 42,
    revenue: 671958,
  },
  {
    id: "banarasi-001",
    name: "Traditional Banarasi Saree",
    image: "/images/products/banarasi-001-1.jpg",
    category: "Silk",
    price: 12999,
    sold: 38,
    revenue: 493962,
  },
  {
    id: "silk-002",
    name: "Mysore Silk Saree",
    image: "/images/products/silk-002-1.jpg",
    category: "Silk",
    price: 8999,
    sold: 35,
    revenue: 314965,
  },
  {
    id: "georgette-001",
    name: "Floral Georgette Saree",
    image: "/images/products/georgette-001-1.jpg",
    category: "Georgette",
    price: 3999,
    sold: 29,
    revenue: 115971,
  },
  {
    id: "cotton-001",
    name: "Handloom Cotton Saree",
    image: "/images/products/cotton-001-1.jpg",
    category: "Cotton",
    price: 2499,
    sold: 27,
    revenue: 67473,
  },
]

export default function TopProductsTable() {
  const router = useRouter()

  const handleViewProduct = (id: string) => {
    router.push(`/admin/products/${id}/edit`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product) => (
            <TableRow
              key={product.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleViewProduct(product.id)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded">
                    <Image
                      src={product.image || "/placeholder.svg?height=40&width=40"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium line-clamp-1">{product.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{product.category}</Badge>
              </TableCell>
              <TableCell>{product.sold}</TableCell>
              <TableCell className="text-right">₹{product.revenue.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

