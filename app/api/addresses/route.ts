import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth"

// Get user's addresses
export async function GET(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const addresses = await prisma.address.findMany({
      where: { userId: user.id },
      orderBy: { isDefault: "desc" },
    })

    return NextResponse.json({ addresses })
  } catch (error) {
    console.error("Get addresses error:", error)
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 })
  }
}

// Add a new address
export async function POST(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, street, city, state, pincode, country, phone, isDefault } = await request.json()

    // Validate input
    if (!name || !street || !city || !state || !pincode || !phone) {
      return NextResponse.json({ error: "All fields are required except country" }, { status: 400 })
    }

    // If this is the default address, unset any existing default
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      })
    }

    // Create address
    const address = await prisma.address.create({
      data: {
        userId: user.id,
        name,
        street,
        city,
        state,
        pincode,
        country: country || "India",
        phone,
        isDefault: isDefault || false,
      },
    })

    return NextResponse.json({ address }, { status: 201 })
  } catch (error) {
    console.error("Add address error:", error)
    return NextResponse.json({ error: "Failed to add address" }, { status: 500 })
  }
}

