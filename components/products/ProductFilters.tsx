"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 50000])

  const categories = [
    { id: "silk", label: "Silk Sarees" },
    { id: "cotton", label: "Cotton Sarees" },
    { id: "linen", label: "Linen Sarees" },
    { id: "georgette", label: "Georgette Sarees" },
    { id: "chiffon", label: "Chiffon Sarees" },
  ]

  const occasions = [
    { id: "wedding", label: "Wedding" },
    { id: "festive", label: "Festive" },
    { id: "casual", label: "Casual" },
    { id: "party", label: "Party Wear" },
    { id: "office", label: "Office Wear" },
  ]

  const colors = [
    { id: "red", label: "Red" },
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
    { id: "yellow", label: "Yellow" },
    { id: "pink", label: "Pink" },
    { id: "purple", label: "Purple" },
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
  ]

  const handleFilter = () => {
    // In a real app, this would update the URL with filter params
    // and trigger a new data fetch
    console.log("Filtering with:", { priceRange })
  }

  const handleReset = () => {
    setPriceRange([0, 50000])
    // Reset other filters
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Filters</h3>
        <Button variant="outline" size="sm" onClick={handleReset} className="w-full">
          Reset All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "category", "occasion"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[0, 50000]}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">₹{priceRange[0].toLocaleString()}</span>
                <span className="text-sm">₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.id}`} />
                  <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="occasion">
          <AccordionTrigger>Occasion</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {occasions.map((occasion) => (
                <div key={occasion.id} className="flex items-center space-x-2">
                  <Checkbox id={`occasion-${occasion.id}`} />
                  <Label htmlFor={`occasion-${occasion.id}`} className="text-sm cursor-pointer">
                    {occasion.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <div key={color.id} className="flex flex-col items-center gap-1">
                  <button
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color.id }}
                    aria-label={`Filter by ${color.label}`}
                  />
                  <span className="text-xs">{color.label}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={handleFilter} className="w-full">
        Apply Filters
      </Button>
    </div>
  )
}

