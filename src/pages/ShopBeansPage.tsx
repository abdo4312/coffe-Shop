import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, ChevronDown, X, Check, Sparkles } from 'lucide-react'
import { ProductCard } from '@/features/products/ProductCard'
import { mockProducts } from '@/features/products/mockProducts'
import type { Product } from '@/features/products/product.types'

// أنواع الفلاتر
type RoastFilter = 'all' | 'light roast' | 'medium roast' | 'dark roast' | 'cold brew'
type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name' | 'rating'
type PriceRange = 'all' | 'under-50' | '50-70' | 'above-70'

export function ShopBeansPage() {
    // State للفلاتر والبحث
    const [searchQuery, setSearchQuery] = useState('')
    const [roastFilter, setRoastFilter] = useState<RoastFilter>('all')
    const [priceRange, setPriceRange] = useState<PriceRange>('all')
    const [originFilter, setOriginFilter] = useState<string>('all')
    const [sortBy, setSortBy] = useState<SortOption>('newest')
    const [showFilters, setShowFilters] = useState(false)

    // استخراج قائمة الـ Origins الفريدة من الـ tags
    const uniqueOrigins = useMemo(() => {
        const origins = new Set<string>()
        mockProducts.forEach(p => {
            // الـ Origin هو الـ tag التاني (بعد الـ roast)
            const originTag = p.tags.find(t =>
                ['Colombia', 'Ethiopia', 'Kenya', 'Brazil', 'Indonesia', 'Guatemala', 'Peru', 'Honduras'].includes(t)
            )
            if (originTag) origins.add(originTag)
        })
        return Array.from(origins).sort()
    }, [])

    // تطبيق الفلاتر والترتيب
    const filteredProducts = useMemo(() => {
        let result = [...mockProducts]

        // فلتر البحث
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            )
        }

        // فلتر التحميص
        if (roastFilter !== 'all') {
            result = result.filter(p => p.tags.includes(roastFilter))
        }

        // فلتر الأصل
        if (originFilter !== 'all') {
            result = result.filter(p => p.tags.includes(originFilter))
        }

        // فلتر السعر
        if (priceRange !== 'all') {
            switch (priceRange) {
                case 'under-50':
                    result = result.filter(p => p.price < 50)
                    break
                case '50-70':
                    result = result.filter(p => p.price >= 50 && p.price <= 70)
                    break
                case 'above-70':
                    result = result.filter(p => p.price > 70)
                    break
            }
        }

        // الترتيب
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                result.sort((a, b) => b.price - a.price)
                break
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'rating':
                result.sort((a, b) => b.rating - a.rating)
                break
            case 'newest':
            default:
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        }

        return result
    }, [searchQuery, roastFilter, originFilter, priceRange, sortBy])

    // إعادة تعيين الفلاتر
    const resetFilters = () => {
        setSearchQuery('')
        setRoastFilter('all')
        setOriginFilter('all')
        setPriceRange('all')
        setSortBy('newest')
    }

    // عدد الفلاتر النشطة
    const activeFiltersCount = [
        roastFilter !== 'all',
        originFilter !== 'all',
        priceRange !== 'all',
        searchQuery !== ''
    ].filter(Boolean).length

    // دالة لاستخراج الـ Roast من الـ tags
    const getRoastTag = (product: Product) => {
        return product.tags.find(t => t.includes('roast') || t === 'cold brew') || 'medium roast'
    }

    // دالة لاستخراج الـ Origin من الـ tags
    const getOriginTag = (product: Product) => {
        return product.tags.find(t =>
            ['Colombia', 'Ethiopia', 'Kenya', 'Brazil', 'Indonesia', 'Guatemala', 'Peru', 'Honduras', 'Blend'].includes(t)
        ) || 'Unknown'
    }

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] text-[#2e1a12]">

            {/* خلفية الـ Blobs */}
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-d" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">

                {/* Header Section */}
                <header className="mb-10 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c6239]">
                        Premium Selection
                    </p>
                    <h1 className="mt-3 text-4xl font-bold text-[#3f2518] md:text-5xl">
                        Shop Signature Beans
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-[#6B4423]/80">
                        Explore our curated collection of single-origin and blend coffees from the world's finest farms.
                    </p>
                </header>

                {/* شريط البحث والتحكم */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    {/* البحث */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c6239]/60" />
                        <input
                            type="text"
                            placeholder="Search beans, origins, flavors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl border border-white/40 bg-white/35 py-3 pl-11 pr-4 text-sm text-[#3f2518] placeholder:text-[#8c6239]/50 focus:border-[#8c6239]/40 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/20 backdrop-blur-xl"
                        />
                    </div>

                    {/* أزرار التحكم */}
                    <div className="flex items-center gap-3">
                        {/* زرار الفلاتر - للموبايل */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/35 px-4 py-2.5 text-sm font-medium text-[#412619] backdrop-blur-xl transition hover:bg-white/50 md:hidden"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                            {activeFiltersCount > 0 && (
                                <span className="rounded-full bg-[#5f3a26] px-2 py-0.5 text-xs text-white">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>

                        {/* الترتيب */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="appearance-none rounded-xl border border-white/50 bg-white/35 px-4 py-2.5 pr-10 text-sm font-medium text-[#412619] backdrop-blur-xl transition hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/20 cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c6239]" />
                        </div>

                        {/* إعادة تعيين */}
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={resetFilters}
                                className="rounded-xl border border-[#8c6239]/30 px-4 py-2.5 text-sm font-medium text-[#5f3a26] transition hover:bg-[#8c6239]/10"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {/* المحتوى الرئيسي - Sidebar + Grid */}
                <div className="flex gap-8">

                    {/* Sidebar - الفلاتر (ديسكتوب) */}
                    <aside className={`${showFilters ? 'block' : 'hidden'} absolute left-0 right-0 top-0 z-50 rounded-3xl bg-[#FAF7F2]/98 p-6 backdrop-blur-2xl md:static md:block md:w-72 md:bg-transparent md:p-0 md:backdrop-blur-none`}>

                        {/* زرار إغلاق للموبايل */}
                        <div className="mb-6 flex items-center justify-between md:hidden">
                            <h3 className="text-lg font-semibold text-[#3f2518]">Filters</h3>
                            <button onClick={() => setShowFilters(false)}>
                                <X className="h-5 w-5 text-[#412619]" />
                            </button>
                        </div>

                        <div className="space-y-6 rounded-[1.5rem] border border-white/40 bg-white/25 p-6 backdrop-blur-xl shadow-[0_20px_60px_-25px_rgba(72,45,32,0.5)]">

                            {/* فلتر Roast Level */}
                            <div>
                                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#7a5a46]">
                                    Roast Level
                                </h4>
                                <div className="space-y-2">
                                    {(['all', 'light roast', 'medium roast', 'dark roast', 'cold brew'] as const).map((roast) => (
                                        <button
                                            key={roast}
                                            onClick={() => setRoastFilter(roast)}
                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${roastFilter === roast
                                                    ? 'bg-[#5f3a26]/10 text-[#3f2518] font-medium'
                                                    : 'text-[#6B4423]/80 hover:bg-white/40'
                                                }`}
                                        >
                                            <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${roastFilter === roast
                                                    ? 'border-[#5f3a26] bg-[#5f3a26]'
                                                    : 'border-[#8c6239]/40'
                                                }`}>
                                                {roastFilter === roast && <Check className="h-2.5 w-2.5 text-white" />}
                                            </span>
                                            {roast === 'all' ? 'All Roasts' : roast.charAt(0).toUpperCase() + roast.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* فلتر Price Range */}
                            <div>
                                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#7a5a46]">
                                    Price Range
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { value: 'all', label: 'All Prices' },
                                        { value: 'under-50', label: 'Under 50 SAR' },
                                        { value: '50-70', label: '50 - 70 SAR' },
                                        { value: 'above-70', label: 'Above 70 SAR' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setPriceRange(option.value as PriceRange)}
                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${priceRange === option.value
                                                    ? 'bg-[#5f3a26]/10 text-[#3f2518] font-medium'
                                                    : 'text-[#6B4423]/80 hover:bg-white/40'
                                                }`}
                                        >
                                            <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${priceRange === option.value
                                                    ? 'border-[#5f3a26] bg-[#5f3a26]'
                                                    : 'border-[#8c6239]/40'
                                                }`}>
                                                {priceRange === option.value && <Check className="h-2.5 w-2.5 text-white" />}
                                            </span>
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* فلتر Origin */}
                            <div>
                                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#7a5a46]">
                                    Origin
                                </h4>
                                <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
                                    <button
                                        onClick={() => setOriginFilter('all')}
                                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${originFilter === 'all'
                                                ? 'bg-[#5f3a26]/10 text-[#3f2518] font-medium'
                                                : 'text-[#6B4423]/80 hover:bg-white/40'
                                            }`}
                                    >
                                        <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${originFilter === 'all'
                                                ? 'border-[#5f3a26] bg-[#5f3a26]'
                                                : 'border-[#8c6239]/40'
                                            }`}>
                                            {originFilter === 'all' && <Check className="h-2.5 w-2.5 text-white" />}
                                        </span>
                                        All Origins
                                    </button>
                                    {uniqueOrigins.map((origin) => (
                                        <button
                                            key={origin}
                                            onClick={() => setOriginFilter(origin)}
                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${originFilter === origin
                                                    ? 'bg-[#5f3a26]/10 text-[#3f2518] font-medium'
                                                    : 'text-[#6B4423]/80 hover:bg-white/40'
                                                }`}
                                        >
                                            <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${originFilter === origin
                                                    ? 'border-[#5f3a26] bg-[#5f3a26]'
                                                    : 'border-[#8c6239]/40'
                                                }`}>
                                                {originFilter === origin && <Check className="h-2.5 w-2.5 text-white" />}
                                            </span>
                                            {origin}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <section className="flex-1">

                        {/* عدد النتائج */}
                        <p className="mb-6 text-sm text-[#6B4423]/70">
                            Showing <span className="font-semibold text-[#3f2518]">{filteredProducts.length}</span> of{' '}
                            <span className="font-semibold text-[#3f2518]">{mockProducts.length}</span> products
                        </p>

                        {/* Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="relative">
                                        {/* شارة Roast + Origin */}
                                        <div className="absolute -top-3 left-4 z-10 flex gap-2">
                                            <span className="rounded-full border border-white/40 bg-[#2f1f16]/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#f8e7d4] backdrop-blur-md">
                                                {getRoastTag(product)}
                                            </span>
                                            <span className="rounded-full bg-[#8c6239]/80 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                                                {getOriginTag(product)}
                                            </span>
                                            {product.tags.includes('new') && (
                                                <span className="flex items-center gap-1 rounded-full bg-[#d4a574] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">
                                                    <Sparkles className="h-2.5 w-2.5" />
                                                    New
                                                </span>
                                            )}
                                        </div>

                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* حالة عدم وجود نتائج */
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="mb-6 rounded-full bg-[#8c6239]/10 p-6">
                                    <Search className="h-10 w-10 text-[#8c6239]/50" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-[#3f2518]">No beans found</h3>
                                <p className="mb-6 text-sm text-[#6B4423]/70">
                                    Try adjusting your filters or search query
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="rounded-xl bg-[#5f3a26] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4c2d1e]"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}