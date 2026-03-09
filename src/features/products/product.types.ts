// Types الأساسية — لازم تتعرف قبل ما تبدأ

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number  // لو في خصم
  images: string[]
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  variants: ProductVariant[]
  createdAt: string
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  stock: number
}

// Query Parameters للـ API
export interface ProductsQuery {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating'
  // ↑ Union Type: بيمنعك من إدخال قيمة غلط
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

// Response من الـ API
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
// Generic Type <T>: نفس الـ interface ممكن نستخدمها لـ Products و Orders