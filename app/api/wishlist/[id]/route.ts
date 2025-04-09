import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth"

// Remove item from wishlist
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Check if wishlist item exists and belongs to user
    const existingWishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingWishlistItem) {
      return NextResponse.json({ error: "Wishlist item not found" }, { status: 404 })
    }

    // Delete wishlist item
    await prisma.wishlistItem.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Remove wishlist item error:", error)
    return NextResponse.json({ error: "Failed to remove item from wishlist" }, { status: 500 })
  }
}

