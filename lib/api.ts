// API helper functions for frontend components

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Generic fetch function with authentication
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // Get token from localStorage if available
  let token = ""
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || ""
  }

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  // Make request
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Parse JSON response
  const data = await response.json()

  // Handle error responses
  if (!response.ok) {
    throw new Error(data.error || "An error occurred")
  }

  return data
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const data = await fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (data.token) {
      localStorage.setItem("token", data.token)
    }

    return data
  },

  register: async (userData: any) => {
    return await fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  logout: async () => {
    await fetchAPI("/auth/logout", { method: "POST" })
    localStorage.removeItem("token")
  },

  getCurrentUser: async () => {
    return await fetchAPI("/auth/me")
  },
}

// Products API
export const productsAPI = {
  getProducts: async (filters?: any) => {
    const queryParams = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value))
        }
      })
    }

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return await fetchAPI(`/products${queryString}`)
  },

  getProductById: async (id: string) => {
    return await fetchAPI(`/products/${id}`)
  },

  createProduct: async (productData: any) => {
    return await fetchAPI("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
  },

  updateProduct: async (id: string, productData: any) => {
    return await fetchAPI(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    })
  },

  deleteProduct: async (id: string) => {
    return await fetchAPI(`/products/${id}`, {
      method: "DELETE",
    })
  },
}

// Categories API
export const categoriesAPI = {
  getCategories: async () => {
    return await fetchAPI("/categories")
  },

  getCategoryById: async (id: string) => {
    return await fetchAPI(`/categories/${id}`)
  },

  createCategory: async (categoryData: any) => {
    return await fetchAPI("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  },

  updateCategory: async (id: string, categoryData: any) => {
    return await fetchAPI(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    })
  },

  deleteCategory: async (id: string) => {
    return await fetchAPI(`/categories/${id}`, {
      method: "DELETE",
    })
  },
}

// Orders API
export const ordersAPI = {
  getOrders: async () => {
    return await fetchAPI("/orders")
  },

  getOrderById: async (id: string) => {
    return await fetchAPI(`/orders/${id}`)
  },

  createOrder: async (orderData: any) => {
    return await fetchAPI("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  },

  updateOrderStatus: async (id: string, statusData: any) => {
    return await fetchAPI(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(statusData),
    })
  },
}

// Cart API
export const cartAPI = {
  getCart: async () => {
    return await fetchAPI("/cart")
  },

  addToCart: async (productId: string, quantity: number) => {
    return await fetchAPI("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    })
  },

  updateCartItem: async (id: string, quantity: number) => {
    return await fetchAPI(`/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    })
  },

  removeFromCart: async (id: string) => {
    return await fetchAPI(`/cart/${id}`, {
      method: "DELETE",
    })
  },

  clearCart: async () => {
    return await fetchAPI("/cart", {
      method: "DELETE",
    })
  },
}

// Wishlist API
export const wishlistAPI = {
  getWishlist: async () => {
    return await fetchAPI("/wishlist")
  },

  addToWishlist: async (productId: string) => {
    return await fetchAPI("/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    })
  },

  removeFromWishlist: async (id: string) => {
    return await fetchAPI(`/wishlist/${id}`, {
      method: "DELETE",
    })
  },
}

// Reviews API
export const reviewsAPI = {
  getProductReviews: async (productId: string) => {
    return await fetchAPI(`/reviews?productId=${productId}`)
  },

  addReview: async (reviewData: any) => {
    return await fetchAPI("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    })
  },

  updateReview: async (id: string, reviewData: any) => {
    return await fetchAPI(`/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(reviewData),
    })
  },

  deleteReview: async (id: string) => {
    return await fetchAPI(`/reviews/${id}`, {
      method: "DELETE",
    })
  },
}

// User API
export const userAPI = {
  getUsers: async () => {
    return await fetchAPI("/users")
  },

  getUserById: async (id: string) => {
    return await fetchAPI(`/users/${id}`)
  },

  updateUser: async (id: string, userData: any) => {
    return await fetchAPI(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },

  deleteUser: async (id: string) => {
    return await fetchAPI(`/users/${id}`, {
      method: "DELETE",
    })
  },
}

// Address API
export const addressAPI = {
  getAddresses: async () => {
    return await fetchAPI("/addresses")
  },

  addAddress: async (addressData: any) => {
    return await fetchAPI("/addresses", {
      method: "POST",
      body: JSON.stringify(addressData),
    })
  },

  updateAddress: async (id: string, addressData: any) => {
    return await fetchAPI(`/addresses/${id}`, {
      method: "PUT",
      body: JSON.stringify(addressData),
    })
  },

  deleteAddress: async (id: string) => {
    return await fetchAPI(`/addresses/${id}`, {
      method: "DELETE",
    })
  },
}

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    return await fetchAPI("/dashboard/stats")
  },

  getSalesData: async (period = "week") => {
    return await fetchAPI(`/dashboard/sales?period=${period}`)
  },
}

