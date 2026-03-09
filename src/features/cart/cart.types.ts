import type { Product } from '@/features/products/product.types'

/**
 * Cart Item — النسخة الفاخرة 2026
 */
export interface CartItem {
  /** معرف فريد (مهم جداً عشان الـ variants + تجنب التكرار) */
  id: string
  product: Product
  quantity: number
  selectedVariant?: string          // "XL" | "أسود-L" | "Pro-128GB" إلخ
  addedAt: string                   // ISO string (للـ sorting والـ "تمت الإضافة منذ...")
}

/**
 * Cart Store Interface — نظيف وقوي ومستقبلي
 */
export interface CartStore {
  items: CartItem[]

  // === Actions ===
  /**
   * أضف منتج للسلة (يدعم الـ variants بسهولة)
   * مثال: addItem({ product, quantity: 1 })
   */
  addItem: (data: {
    product: Product
    quantity?: number
    selectedVariant?: string
  }) => void

  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void

  // === Computed Getters ===
  totalItems: number
  totalPrice: number
  subtotal: number          // بدون Shipping
  isEmpty: boolean
}