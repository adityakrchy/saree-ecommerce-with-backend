import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { adminMiddleware } from "@/lib/auth"

// Get sales data for charts (admin only)
export async function GET(request: Request) {
  try {
    const user = await adminMiddleware(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "week"

    let startDate: Date
    const now = new Date()

    // Determine start date based on period
    switch (period) {
      case "day":
        startDate = new Date(now)
        startDate.setHours(0, 0, 0, 0)
        break
      case "week":
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        break
      case "month":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        break
      case "year":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
    }

    // Get orders within the period
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    // Format data for charts
    const salesData = formatSalesData(orders, period)

    return NextResponse.json({ salesData })
  } catch (error) {
    console.error("Get sales data error:", error)
    return NextResponse.json({ error: "Failed to fetch sales data" }, { status: 500 })
  }
}

// Helper function to format sales data for charts
function formatSalesData(orders: any[], period: string) {
  const data: any[] = []
  const groupedData: Record<string, number> = {}

  orders.forEach((order) => {
    let key: string
    const date = new Date(order.createdAt)

    switch (period) {
      case "day":
        key = `${date.getHours()}:00`
        break
      case "week":
        key = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
        break
      case "month":
        key = `${date.getDate()}`
        break
      case "year":
        key = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()]
        break
      default:
        key = `${date.getDate()}/${date.getMonth() + 1}`
    }

    if (groupedData[key]) {
      groupedData[key] += order.total
    } else {
      groupedData[key] = order.total
    }
  })

  // Convert to array format for charts
  for (const [key, value] of Object.entries(groupedData)) {
    data.push({
      name: key,
      total: value,
    })
  }

  return data
}

