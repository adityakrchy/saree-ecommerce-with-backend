import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth"

// Get all orders (admin) or user orders (customer)
export async function GET(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let orders

    // Admin can see all orders, customers can only see their own
    if (user.role === "ADMIN") {
      orders = await prisma.order.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    } else {
      orders = await prisma.order.findMany({
        where: { userId: user.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// Create a new order
export async function POST(request: Request) {
  try {
    const user = await authMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items, shippingAddress, paymentMethod } = await request.json()

    // Validate input
    if (!items || !items.length || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: "Items, shipping address, and payment method are required" }, { status: 400 })
    }

    // Calculate total and create order items
    let total = 0
    const orderItems = []

    for (const item of items) {
      // Get product to ensure price is correct
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return NextResponse.json({ error: `Product with ID ${item.productId} not found` }, { status: 400 })
      }

      // Check stock
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Not enough stock for product: ${product.name}` }, { status: 400 })
      }

      // Add to total
      total += product.price * item.quantity

      // Add to order items
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      })

      // Update product stock
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: product.stock - item.quantity },
      })
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total,
        shippingAddress,
        paymentMethod,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Clear cart after successful order
    await prisma.cartItem.deleteMany({
      where: { userId: user.id },
    })

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

