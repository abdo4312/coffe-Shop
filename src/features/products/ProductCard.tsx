import { Link } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import { useCartStore } from '@/features/cart/useCartStore'
import { Heart, Eye, Plus, Star } from 'lucide-react'
import { useState } from 'react'
import type { Product } from './product.types'
import type { CartStore } from '@/features/cart/cart.types'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addToCart = useCartStore((state: CartStore) => state.addItem)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const secondImage = product.images?.[1]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.inStock) addToCart({ product, quantity: 1 })
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // TODO: ربط مع wishlist store لاحقاً
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: افتح QuickView Modal هنا (مثلاً بـ Zustand أو Context)
    console.log('Quick View opened for:', product.name)
  }

  return (
    <article
      className={cn(
        "group relative bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden",
        "border border-white/60 shadow-xl hover:shadow-2xl hover:-translate-y-4",
        "transition-all duration-500 ease-out hover:border-brand/30",
        className
      )}
    >
      {/* Image Container - Glassmorphism + Premium Hover */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Link to={`/products/${product.id}`} className="block h-full">
          {/* Primary Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Secondary Image Swap (عبقرية 2026) */}
          {secondImage && (
            <img
              src={secondImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}

          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 group-hover:to-black/40 transition-all duration-500" />
        </Link>

        {/* Discount Badge - Glass + Modern */}
        {discount && (
          <div className="absolute top-4 left-4 px-4 py-1 bg-white/90 backdrop-blur-xl text-red-600 text-xs font-bold rounded-2xl shadow-lg border border-white/70">
            -{discount}%
          </div>
        )}

        {/* Wishlist Heart - Floating + Animation */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/70 text-neutral-700 hover:text-red-500 active:scale-95 transition-all duration-200 shadow-md hover:shadow-xl"
          aria-label="إضافة للمفضلة"
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-all duration-300",
              isWishlisted ? "fill-red-500 text-red-500 scale-110" : "hover:scale-110"
            )}
          />
        </button>

        {/* Quick View Button - يظهر على Hover (تريند 2026) */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/95 hover:bg-white backdrop-blur-2xl px-7 py-3 rounded-2xl text-sm font-semibold text-neutral-900 shadow-2xl border border-white/70 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-300"
        >
          <Eye className="w-4 h-4" />
          نظرة سريعة
        </button>

        {/* Out of Stock - Elegant Glass Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
            <span className="text-white font-bold text-2xl tracking-widest drop-shadow-lg">
              نفذت Quantity
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Category + Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="uppercase text-[10px] font-medium tracking-[1px] text-neutral-500">
            {product.category}
          </span>

          {/* 5-Star Rating (عبقري ودقيق) */}
          <div className="flex items-center gap-px">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-neutral-200"
                )}
              />
            ))}
            <span className="text-xs text-neutral-400 ml-2 font-medium">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <Link
          to={`/products/${product.id}`}
          className="block font-semibold text-[17px] leading-tight line-clamp-2 text-neutral-900 group-hover:text-brand transition-colors mb-5"
        >
          {product.name}
        </Link>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold tracking-[-0.02em] text-neutral-950">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Floating Add Button - Modern + Icon */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-300 active:scale-95",
              product.inStock
                ? "bg-neutral-900 hover:bg-black hover:scale-110"
                : "bg-neutral-200 cursor-not-allowed"
            )}
            aria-label="Add to Cart"
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>
      </div>
    </article>
  )
}