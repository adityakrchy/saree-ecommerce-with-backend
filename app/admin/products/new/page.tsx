import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
      </div>

      <form className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="silk">Silk</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="georgette">Georgette</SelectItem>
                    <SelectItem value="linen">Linen</SelectItem>
                    <SelectItem value="chiffon">Chiffon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter product description" rows={4} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input id="originalPrice" type="number" placeholder="0.00" />
                <p className="text-xs text-muted-foreground">Leave blank if there's no discount</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input id="discount" type="number" placeholder="0" />
                <p className="text-xs text-muted-foreground">Will be calculated automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fabric">Fabric</Label>
                <Input id="fabric" placeholder="e.g. Kanjivaram Silk" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Select>
                  <SelectTrigger id="occasion">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="festive">Festive</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="party">Party</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input id="color" placeholder="e.g. Maroon" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length (meters)</Label>
                <Input id="length" type="number" step="0.1" placeholder="5.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 hover:bg-muted/50">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">Drag & drop or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                  <Input type="file" className="hidden" accept="image/*" multiple />
                </div>
                <div className="relative h-40 rounded-md border">
                  <div className="absolute right-2 top-2">
                    <Button variant="destructive" size="icon" className="h-6 w-6 rounded-full">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">Preview image</p>
                  </div>
                </div>
                <Button variant="outline" className="h-40 flex flex-col gap-2 border-dashed">
                  <Plus className="h-6 w-6" />
                  <span>Add More</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">The first image will be used as the product thumbnail</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="inStock" defaultChecked />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </div>
  )
}

