import type { Product } from "./types"

// Mock data for products
const products: Product[] = [
  {
    id: "silk-001",
    name: "Royal Kanjivaram Silk Saree",
    description:
      "Handcrafted pure silk Kanjivaram saree with intricate gold zari work. Perfect for weddings and special occasions.",
    price: 15999,
    originalPrice: 18999,
    discount: 15,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "/images/products/silk-001-1.jpg",
      "/images/products/silk-001-2.jpg",
      "/images/products/silk-001-3.jpg",
      "/images/products/silk-001-4.jpg",
    ],
    category: "Silk",
    fabric: "Kanjivaram Silk",
    occasion: "Wedding",
    color: "Maroon",
    length: 6.3,
    featured: true,
    reviews: [
      {
        id: "rev-001",
        name: "Priya Sharma",
        rating: 5,
        comment:
          "Absolutely stunning saree! The quality is exceptional and the zari work is beautiful. Received many compliments at my sister's wedding.",
        date: "2023-10-15",
      },
      {
        id: "rev-002",
        name: "Ananya Patel",
        rating: 4,
        comment:
          "Beautiful saree, but the color is slightly different from what's shown in the pictures. Still very happy with my purchase.",
        date: "2023-09-28",
      },
    ],
  },
  {
    id: "cotton-001",
    name: "Handloom Cotton Saree",
    description:
      "Lightweight handloom cotton saree with traditional block prints. Perfect for everyday wear and casual occasions.",
    price: 2499,
    originalPrice: 2999,
    discount: 16,
    rating: 4.5,
    reviewCount: 89,
    images: [
      "/images/products/cotton-001-1.jpg",
      "/images/products/cotton-001-2.jpg",
      "/images/products/cotton-001-3.jpg",
    ],
    category: "Cotton",
    fabric: "Handloom Cotton",
    occasion: "Casual",
    color: "Blue",
    length: 5.5,
    featured: true,
    reviews: [
      {
        id: "rev-003",
        name: "Meera Reddy",
        rating: 5,
        comment:
          "Perfect for summer! The cotton is so soft and comfortable. The block prints are beautiful and unique.",
        date: "2023-08-12",
      },
    ],
  },
  {
    id: "georgette-001",
    name: "Floral Georgette Saree",
    description:
      "Lightweight georgette saree with beautiful floral prints. Ideal for parties and semi-formal occasions.",
    price: 3999,
    originalPrice: 4599,
    discount: 13,
    rating: 4.2,
    reviewCount: 67,
    images: [
      "/images/products/georgette-001-1.jpg",
      "/images/products/georgette-001-2.jpg",
      "/images/products/georgette-001-3.jpg",
    ],
    category: "Georgette",
    fabric: "Georgette",
    occasion: "Party",
    color: "Pink",
    length: 5.5,
    featured: false,
    reviews: [],
  },
  {
    id: "banarasi-001",
    name: "Traditional Banarasi Saree",
    description: "Exquisite Banarasi silk saree with intricate zari work. Perfect for weddings and festive occasions.",
    price: 12999,
    originalPrice: 14999,
    discount: 13,
    rating: 4.9,
    reviewCount: 112,
    images: [
      "/images/products/banarasi-001-1.jpg",
      "/images/products/banarasi-001-2.jpg",
      "/images/products/banarasi-001-3.jpg",
    ],
    category: "Silk",
    fabric: "Banarasi Silk",
    occasion: "Wedding",
    color: "Gold",
    length: 6.0,
    featured: true,
    reviews: [],
  },
  {
    id: "linen-001",
    name: "Pure Linen Saree",
    description: "Elegant pure linen saree with minimal design. Perfect for office wear and formal occasions.",
    price: 3499,
    originalPrice: 3999,
    discount: 12,
    rating: 4.3,
    reviewCount: 56,
    images: [
      "/images/products/linen-001-1.jpg",
      "/images/products/linen-001-2.jpg",
      "/images/products/linen-001-3.jpg",
    ],
    category: "Linen",
    fabric: "Pure Linen",
    occasion: "Office",
    color: "Beige",
    length: 5.5,
    featured: false,
    reviews: [],
  },
  {
    id: "chiffon-001",
    name: "Printed Chiffon Saree",
    description: "Lightweight chiffon saree with contemporary prints. Perfect for casual outings and day events.",
    price: 2999,
    rating: 4.1,
    reviewCount: 43,
    images: [
      "/images/products/chiffon-001-1.jpg",
      "/images/products/chiffon-001-2.jpg",
      "/images/products/chiffon-001-3.jpg",
    ],
    category: "Chiffon",
    fabric: "Chiffon",
    occasion: "Casual",
    color: "Multi",
    length: 5.5,
    featured: false,
    reviews: [],
  },
  {
    id: "silk-002",
    name: "Mysore Silk Saree",
    description: "Traditional Mysore silk saree with golden border. Lightweight and perfect for festive occasions.",
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    rating: 4.6,
    reviewCount: 78,
    images: ["/images/products/silk-002-1.jpg", "/images/products/silk-002-2.jpg", "/images/products/silk-002-3.jpg"],
    category: "Silk",
    fabric: "Mysore Silk",
    occasion: "Festive",
    color: "Green",
    length: 5.8,
    featured: true,
    reviews: [],
  },
  {
    id: "cotton-002",
    name: "Kalamkari Cotton Saree",
    description:
      "Handcrafted Kalamkari cotton saree with traditional motifs. Perfect for casual and semi-formal occasions.",
    price: 3299,
    rating: 4.4,
    reviewCount: 62,
    images: [
      "/images/products/cotton-002-1.jpg",
      "/images/products/cotton-002-2.jpg",
      "/images/products/cotton-002-3.jpg",
    ],
    category: "Cotton",
    fabric: "Kalamkari Cotton",
    occasion: "Casual",
    color: "Red",
    length: 5.5,
    featured: false,
    reviews: [],
  },
]

// Function to get all products with optional filtering
export async function getProducts(filters?: Record<string, any>): Promise<Product[]> {
  // In a real app, this would fetch from an API or database
  // and apply the filters

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return products
}

// Function to get a product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return products.find((product) => product.id === id)
}

// Function to get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return products.filter((product) => product.featured)
}

// Function to get related products
export async function getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return products.filter((product) => product.category === category && product.id !== currentId).slice(0, 4)
}

