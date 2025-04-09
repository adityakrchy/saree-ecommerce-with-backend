import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import { cookies } from "next/headers"

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

// Compare password with hash
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(payload: any): string {
  return sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Get current user from cookies
export function getCurrentUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return null
  }

  try {
    return verifyToken(token)
  } catch (error) {
    return null
  }
}

// Authentication middleware
export async function authMiddleware(request: Request) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.split(" ")[1]
  return verifyToken(token)
}

// Admin middleware
export async function adminMiddleware(request: Request) {
  const user = await authMiddleware(request)

  if (!user || user.role !== "ADMIN") {
    return null
  }

  return user
}

