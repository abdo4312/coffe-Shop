import { useState, useMemo } from 'react'
import { mockProducts } from '@/features/products/mockProducts'
import { ProductCard } from '@/features/products/ProductCard'
import { Search, ChevronDown, Check, Wrench } from 'lucide-react'

// فلترة المنتجات اللي في فئة Coffee Tools بس
const toolsProducts = mockProducts.filter(p => p.category === 'Coffee Tools')

// أنواع الفلاتر
type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name' | 'rating'
type ToolFilter = 'all' | 'grinder' | 'kettle' | 'dripper' | 'scale' | 'french press' | 'aeropress'

export function CoffeeToolsPage() {

    // State
    const [searchQuery, setSearchQuery] = useState('')
    const [toolFilter, setToolFilter] = useState<ToolFilter>('all')
    const [sortBy, setSortBy] = useState<SortOption>('newest')

    // تطبيق الفلاتر والترتيب
    const filteredProducts = useMemo(() => {
        let result = [...toolsProducts]

        // فلتر البحث
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            )
        }

        // فلتر نوع الأداة
        if (toolFilter !== 'all') {
            result = result.filter(p => p.tags.includes(toolFilter))
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
    }, [searchQuery, toolFilter, sortBy])

    const resetFilters = () => {
        setSearchQuery('')
        setToolFilter('all')
        setSortBy('newest')
    }

    const activeFiltersCount = [toolFilter !== 'all', searchQuery !== ''].filter(Boolean).length

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] text-[#2e1a12]">

            {/* Background Blobs */}
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-d" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">

                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8c6239]/30 bg-[#8c6239]/10 px-4 py-2">
                        <Wrench className="h-4 w-4 text-[#8c6239]" />
                        <span className="text-sm font-medium text-[#5f3a26]">Barista Essentials</span>
                    </div>
                    <h1 className="mt-3 text-4xl font-bold text-[#3f2518] md:text-5xl">
                        Coffee Tools
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-[#6B4423]/80">
                        Grinders, drippers, kettles, and more. Everything you need to brew like a pro.
                    </p>
                </header>

                {/* Filters Bar */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c6239]/60" />
                        <input
                            type="text"
                            placeholder="Search tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl border border-white/40 bg-white/35 py-3 pl-11 pr-4 text-sm text-[#3f2518] placeholder:text-[#8c6239]/50 focus:border-[#8c6239]/40 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/20 backdrop-blur-xl"
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="appearance-none rounded-xl border border-white/50 bg-white/35 px-4 py-2.5 pr-10 text-sm font-medium text-[#412619] backdrop-blur-xl transition hover:bg-white/50 focus:outline-none cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c6239]" />
                        </div>

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

                {/* Main Content */}
                <div className="flex gap-8">

                    {/* Sidebar Filters */}
                    <aside className="hidden w-72 shrink-0 lg:block">
                        <div className="sticky top-28 space-y-6 rounded-[1.5rem] border border-white/40 bg-white/25 p-6 backdrop-blur-xl shadow-[0_20px_60px_-25px_rgba(72,45,32,0.5)]">

                            {/* Tool Type Filter */}
                            <div>
                                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#7a5a46]">
                                    Tool Type
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { value: 'all', label: 'All Tools' },
                                        { value: 'grinder', label: 'Grinders' },
                                        { value: 'kettle', label: 'Kettles' },
                                        { value: 'dripper', label: 'Drippers' },
                                        { value: 'scale', label: 'Scales' },
                                        { value: 'french press', label: 'French Press' },
                                        { value: 'aeropress', label: 'AeroPress' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setToolFilter(option.value as ToolFilter)}
                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${toolFilter === option.value
                                                    ? 'bg-[#5f3a26]/10 text-[#3f2518] font-medium'
                                                    : 'text-[#6B4423]/80 hover:bg-white/40'
                                                }`}
                                        >
                                            <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${toolFilter === option.value
                                                    ? 'border-[#5f3a26] bg-[#5f3a26]'
                                                    : 'border-[#8c6239]/40'
                                                }`}>
                                                {toolFilter === option.value && <Check className="h-2.5 w-2.5 text-white" />}
                                            </span>
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <section className="flex-1">

                        {/* Results Count */}
                        <p className="mb-6 text-sm text-[#6B4423]/70">
                            Showing <span className="font-semibold text-[#3f2518]">{filteredProducts.length}</span> of{' '}
                            <span className="font-semibold text-[#3f2518]">{toolsProducts.length}</span> tools
                        </p>

                        {/* Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="mb-6 rounded-full bg-[#8c6239]/10 p-6">
                                    <Wrench className="h-10 w-10 text-[#8c6239]/50" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-[#3f2518]">No tools found</h3>
                                <p className="mb-6 text-sm text-[#6B4423]/70">
                                    Try adjusting your search query
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