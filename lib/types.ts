export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  images: string[]
  category: string
  fabric: string
  occasion: string
  color: string
  length: number
  reviews: Review[]
  featured?: boolean
}

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

