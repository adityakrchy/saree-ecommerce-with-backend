import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { adminMiddleware } from "@/lib/auth"

// Get dashboard statistics (admin only)
export async function GET(request: Request) {
  try {
    const user = await adminMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total sales
    const orders = await prisma.order.findMany()
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0)

    // Get order counts by status
    const orderCounts = {
      total: orders.length,
      processing: orders.filter((order) => order.status === "PROCESSING").length,
      shipped: orders.filter((order) => order.status === "SHIPPED").length,
      delivered: orders.filter((order) => order.status === "DELIVERED").length,
      cancelled: orders.filter((order) => order.status === "CANCELLED").length,
    }

    // Get customer count
    const customerCount = await prisma.user.count({
      where: { role: "CUSTOMER" },
    })

    // Get product count
    const productCount = await prisma.product.count()

    // Get low stock products
    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lte: 5 } },
      take: 5,
    })

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    // Get top selling products
    const topProducts = await prisma.product.findMany({
      take: 5,
      orderBy: { reviewCount: "desc" },
    })

    return NextResponse.json({
      stats: {
        totalSales,
        orderCounts,
        customerCount,
        productCount,
        lowStockProducts,
        recentOrders,
        topProducts,
      },
    })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}

