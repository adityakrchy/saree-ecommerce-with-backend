import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth"

// Get user's wishlist
export async function GET(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: user.id },
      include: {
        product: true,
      },
    })

    return NextResponse.json({ wishlistItems })
  } catch (error) {
    console.error("Get wishlist error:", error)
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
  }
}

// Add item to wishlist
export async function POST(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()

    // Validate input
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if item already exists in wishlist
    const existingWishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    })

    if (existingWishlistItem) {
      return NextResponse.json({ error: "Product already in wishlist" }, { status: 409 })
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: user.id,
        productId,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json({ wishlistItem }, { status: 201 })
  } catch (error) {
    console.error("Add to wishlist error:", error)
    return NextResponse.json({ error: "Failed to add item to wishlist" }, { status: 500 })
  }
}

