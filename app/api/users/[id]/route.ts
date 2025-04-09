import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware, adminMiddleware } from "@/lib/auth"
import { hashPassword } from "@/lib/auth"

// Get a user by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await authMiddleware(request)

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Users can only access their own data, admins can access any user
    if (currentUser.id !== id && currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        addresses: true,
        orders: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        _count: {
          select: {
            orders: true,
            reviews: true,
            wishlistItems: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

// Update a user
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await authMiddleware(request)

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Users can only update their own data, admins can update any user
    if (currentUser.id !== id && currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, phone, password, role } = await request.json()

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {}

    if (name) updateData.name = name
    if (phone) updateData.phone = phone

    // Only admins can change roles
    if (role && currentUser.role === "ADMIN") {
      updateData.role = role
    }

    // Handle email change
    if (email && email !== existingUser.email) {
      // Check if email is already in use
      const emailExists = await prisma.user.findUnique({
        where: { email },
      })

      if (emailExists) {
        return NextResponse.json({ error: "Email is already in use" }, { status: 409 })
      }

      updateData.email = email
    }

    // Handle password change
    if (password) {
      updateData.password = await hashPassword(password)
    }

    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// Delete a user (admin only)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await adminMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Delete user
    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}

