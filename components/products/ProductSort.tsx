"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sort, setSort] = useState(searchParams.get("sort") || "featured")

  const handleSortChange = (value: string) => {
    setSort(value)

    // In a real app, this would update the URL with sort param
    // and trigger a new data fetch
    console.log("Sorting by:", value)
  }

  return (
    <Select value={sort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
      </SelectContent>
    </Select>
  )
}

