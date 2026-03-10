import { useEffect, useState } from 'react'
import { X, Plus, Star, Minus } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import { useQuickViewStore } from './useQuickViewStore'
import { useCart } from '@/context/CartContext'

export function QuickViewModal() {
    const { isOpen, product, close } = useQuickViewStore()
    const { addItem } = useCart()
    const [quantity, setQuantity] = useState(1)

    const getRoastLevel = () => {
        if (!product) return undefined
        return product.tags.find(t => t.includes('roast') || t === 'cold brew') || undefined
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [close])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) setQuantity(1)
    }, [isOpen, product?.id])

    if (!isOpen || !product) return null

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null

    const handleAddToCart = () => {
        if (product.inStock) {
            // 🔴 FIX: كان فيه loop بيعمل addItem أكتر من مرة
            // ده بيعمل multiple state updates متتالية وهو anti-pattern
            // الصح: بنبعت الـ quantity مرة واحدة في call واحدة
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                roastLevel: getRoastLevel(),
                quantity, // ← بنبعت الـ quantity مباشرة
            })
            close()
        }
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={close}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/50 bg-white/90 backdrop-blur-2xl shadow-2xl">

                {/* Close Button */}
                <button
                    onClick={close}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-900 transition-all shadow-lg border border-white/60"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative aspect-square md:aspect-auto md:h-full bg-neutral-100 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />

                        {discount && (
                            <div className="absolute top-4 left-4 px-4 py-1.5 bg-red-500 text-white text-sm font-bold rounded-2xl shadow-lg">
                                -{discount}% OFF
                            </div>
                        )}

                        {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-white font-bold text-2xl tracking-widest">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="p-8 flex flex-col">
                        <span className="text-xs font-medium uppercase tracking-[1.5px] text-[#8c6239] mb-2">
                            {product.category}
                        </span>

                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                            {product.name}
                        </h2>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-px">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-5 h-5",
                                            i < Math.floor(product.rating)
                                                ? "text-amber-400 fill-amber-400"
                                                : "text-neutral-200"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-neutral-500">
                                {product.rating} ({product.reviewCount} reviews)
                            </span>
                        </div>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-4xl font-bold text-neutral-900">
                                {formatCurrency(product.price)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-neutral-400 line-through">
                                    {formatCurrency(product.originalPrice)}
                                </span>
                            )}
                        </div>

                        <p className="text-neutral-600 leading-relaxed mb-8 flex-grow">
                            {product.description}
                        </p>

                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium bg-[#f5e6d3] text-[#5f3a26] rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-4 mt-auto">
                            {/* Quantity */}
                            <div className="flex items-center rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="p-3 hover:bg-neutral-100 transition"
                                    disabled={!product.inStock}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-5 font-semibold text-lg min-w-[3rem] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="p-3 hover:bg-neutral-100 transition"
                                    disabled={!product.inStock}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Add Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className={cn(
                                    "flex-1 py-4 rounded-2xl text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                                    product.inStock
                                        ? "bg-neutral-900 hover:bg-black text-white hover:shadow-xl active:scale-[0.98]"
                                        : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                )}
                            >
                                <Plus className="w-5 h-5" />
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
