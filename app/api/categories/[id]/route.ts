import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { adminMiddleware } from "@/lib/auth"

// Get a single category by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ category })
  } catch (error) {
    console.error("Get category error:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

// Update a category (admin only)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await adminMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const { name, description, image } = await request.json()

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Update category
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        image,
      },
    })

    return NextResponse.json({ category })
  } catch (error) {
    console.error("Update category error:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

// Delete a category (admin only)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await adminMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Check if category has products
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    })

    if (productsCount > 0) {
      return NextResponse.json({ error: "Cannot delete category with associated products" }, { status: 400 })
    }

    // Delete category
    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete category error:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

