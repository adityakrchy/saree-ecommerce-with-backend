import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth"

// Get user's cart
export async function GET(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: true,
      },
    })

    return NextResponse.json({ cartItems })
  } catch (error) {
    console.error("Get cart error:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

// Add item to cart
export async function POST(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity } = await request.json()

    // Validate input
    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json({ error: "Product ID and quantity are required" }, { status: 400 })
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return NextResponse.json({ error: "Not enough stock available" }, { status: 400 })
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    })

    let cartItem

    if (existingCartItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      })
    } else {
      // Add new item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId,
          quantity,
        },
        include: {
          product: true,
        },
      })
    }

    return NextResponse.json({ cartItem }, { status: 201 })
  } catch (error) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}

// Clear cart
export async function DELETE(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.cartItem.deleteMany({
      where: { userId: user.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Clear cart error:", error)
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 })
  }
}

