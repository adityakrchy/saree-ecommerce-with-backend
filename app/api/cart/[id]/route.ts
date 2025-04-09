import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth"

// Update cart item quantity
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const { quantity } = await request.json()

    // Validate input
    if (!quantity || quantity < 1) {
      return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 })
    }

    // Check if cart item exists and belongs to user
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        product: true,
      },
    })

    if (!existingCartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    // Check if product has enough stock
    if (existingCartItem.product.stock < quantity) {
      return NextResponse.json({ error: "Not enough stock available" }, { status: 400 })
    }

    // Update cart item
    const cartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: {
        product: true,
      },
    })

    return NextResponse.json({ cartItem })
  } catch (error) {
    console.error("Update cart item error:", error)
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

// Remove item from cart
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Check if cart item exists and belongs to user
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingCartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    // Delete cart item
    await prisma.cartItem.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Remove cart item error:", error)
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 })
  }
}

