import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { adminMiddleware } from "@/lib/auth"

// Get all products with optional filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "newest"

    // Build filter object
    const filter: any = {}

    if (category) {
      filter.category = {
        name: category,
      }
    }

    if (featured) {
      filter.featured = true
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {}
      if (minPrice !== undefined) filter.price.gte = minPrice
      if (maxPrice !== undefined) filter.price.lte = maxPrice
    }

    if (search) {
      filter.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    // Determine sort order
    let orderBy: any = { createdAt: "desc" } // default to newest

    switch (sort) {
      case "price-low":
        orderBy = { price: "asc" }
        break
      case "price-high":
        orderBy = { price: "desc" }
        break
      case "popular":
        orderBy = { reviewCount: "desc" }
        break
      case "rating":
        orderBy = { rating: "desc" }
        break
    }

    // Get products
    const products = await prisma.product.findMany({
      where: filter,
      orderBy,
      include: {
        category: true,
        reviews: {
          take: 2,
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// Create a new product (admin only)
export async function POST(request: Request) {
  try {
    const user = await adminMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.price || !data.categoryId) {
      return NextResponse.json({ error: "Name, price, and category are required" }, { status: 400 })
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || "",
        price: Number.parseFloat(data.price),
        originalPrice: data.originalPrice ? Number.parseFloat(data.originalPrice) : null,
        discount: data.discount ? Number.parseInt(data.discount) : null,
        stock: data.stock ? Number.parseInt(data.stock) : 0,
        featured: data.featured || false,
        images: data.images || [],
        categoryId: data.categoryId,
        fabric: data.fabric,
        occasion: data.occasion,
        color: data.color,
        length: data.length ? Number.parseFloat(data.length) : null,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

