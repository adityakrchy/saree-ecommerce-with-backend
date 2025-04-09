import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth"

// Update a review
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const { rating, comment } = await request.json()

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating (1-5) is required" }, { status: 400 })
    }

    // Check if review exists
    const existingReview = await prisma.review.findUnique({
      where: { id },
    })

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    // Check if user is authorized to update this review
    if (existingReview.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update review
    const review = await prisma.review.update({
      where: { id },
      data: {
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Update product rating
    const productId = existingReview.productId
    const allReviews = await prisma.review.findMany({
      where: { productId },
    })

    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / allReviews.length

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: averageRating,
      },
    })

    return NextResponse.json({ review })
  } catch (error) {
    console.error("Update review error:", error)
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 })
  }
}

// Delete a review
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Check if review exists
    const existingReview = await prisma.review.findUnique({
      where: { id },
    })

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    // Check if user is authorized to delete this review
    if (existingReview.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete review
    await prisma.review.delete({
      where: { id },
    })

    // Update product rating and review count
    const productId = existingReview.productId
    const allReviews = await prisma.review.findMany({
      where: { productId },
    })

    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = totalRating / allReviews.length

      await prisma.product.update({
        where: { id: productId },
        data: {
          rating: averageRating,
          reviewCount: allReviews.length,
        },
      })
    } else {
      await prisma.product.update({
        where: { id: productId },
        data: {
          rating: null,
          reviewCount: 0,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete review error:", error)
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 })
  }
}

