import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CartStore } from './cart.types'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [] as CartItem[],
      
      addItem: (data: { product: any; quantity?: number; selectedVariant?: string }) => {
        set((state: CartStore) => {
          const newItem: CartItem = {
            id: data.product.id,
            product: data.product,
            quantity: data.quantity || 1,
            selectedVariant: data.selectedVariant,
            addedAt: new Date().toISOString(),
          }
          
          const existingItem = state.items.find((item: CartItem) => item.id === newItem.id)
          
          if (existingItem) {
            return {
              items: state.items.map((item: CartItem) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            } as any
          }
          
          return { items: [...state.items, newItem] } as any
        })
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item: CartItem) => item.id !== id) } as any)
      },

      updateQuantity: (id: string, quantity: number) => {
        set({
          items: get().items.map((item: CartItem) =>
            item.id === id ? { ...item, quantity } : item
          ),
        } as any)
      },

      clearCart: () => {
        set({ items: [] } as any)
      },

      get totalItems(): number {
        return get().items.reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        )
      },

      get totalPrice(): number {
        return get().items.reduce(
          (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
          0
        )
      },

      get subtotal(): number {
        return this.totalPrice
      },

      get isEmpty(): boolean {
        return get().items.length === 0
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
