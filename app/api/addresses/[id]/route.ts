import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth"

// Update an address
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const { name, street, city, state, pincode, country, phone, isDefault } = await request.json()

    // Check if address exists and belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    // If this is being set as default, unset any existing default
    if (isDefault && !existingAddress.isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      })
    }

    // Update address
    const address = await prisma.address.update({
      where: { id },
      data: {
        name,
        street,
        city,
        state,
        pincode,
        country,
        phone,
        isDefault: isDefault || false,
      },
    })

    return NextResponse.json({ address })
  } catch (error) {
    console.error("Update address error:", error)
    return NextResponse.json({ error: "Failed to update address" }, { status: 500 })
  }
}

// Delete an address
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Check if address exists and belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    // Delete address
    await prisma.address.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete address error:", error)
    return NextResponse.json({ error: "Failed to delete address" }, { status: 500 })
  }
}

