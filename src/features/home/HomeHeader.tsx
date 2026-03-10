import { Coffee, Search, ShoppingBag, User, X } from 'lucide-react' // أضفنا X
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react'; // أضفنا useState و useEffect
import { mockProducts } from '@/features/products/mockProducts'; // استدعاء البيانات

const navItems = [
  { label: 'Beans', to: '/coffee-list' },
  { label: 'Booking', to: '/book-table' },
  { label: 'Brew Gear', to: '/brew-gear' },
  { label: 'Gift Cards', to: '/gift-cards' },
]

export function HomeHeader() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // State للبحث
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  // فلترة النتائج
  const searchResults = query
    ? mockProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  // إغلاق البحث بالـ Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/coffee/${id}`);
  };

  return (
    <>
      {/* === Search Modal === */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4">
          {/* خلفية داكنة شفافة */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* صندوق البحث */}
          <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">

            {/* حقل الإدخال */}
            <div className="flex items-center gap-3 p-4 border-b border-[#8C6239]/10">
              <Search className="text-[#8C6239]" size={22} />
              <input
                type="text"
                placeholder="Search for coffee, gear..."
                className="flex-1 bg-transparent text-lg text-[#4A3B32] placeholder-[#6B4423]/50 outline-none font-medium"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-[#8C6239]/10 transition-colors"
              >
                <X size={20} className="text-[#6B4423]" />
              </button>
            </div>

            {/* النتائج */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query && searchResults.length === 0 && (
                <p className="p-8 text-center text-[#6B4423]/60">No results found for "{query}"</p>
              )}

              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-[#8C6239]/10 transition-colors text-left"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-[#4A3B32]">{product.name}</h4>
                    <p className="text-sm text-[#6B4423]/70">{product.category}</p>
                  </div>
                  <span className="font-bold text-[#8C6239]">{product.price} SAR</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* === Header Original Code === */}
      <header className="sticky top-4 z-[100] mx-4 mb-8 overflow-hidden rounded-[1.8rem] border border-white/45 bg-white/26 px-4 py-4 shadow-[0_22px_55px_-38px_rgba(66,38,24,0.88)] backdrop-blur-xl md:px-6 transition-all duration-500">

        {/* Liquid Blobs Background */}
        <div
          className="liquid-blob absolute -left-9 -top-8 h-24 w-24 bg-[#f3b079]/60"
          style={{ ['--blob-duration' as string]: '19s' }}
        />
        <div
          className="liquid-blob absolute right-16 -top-10 h-28 w-28 bg-[#d28d57]/55"
          style={{ ['--blob-duration' as string]: '24s', ['--blob-delay' as string]: '-6s' }}
        />
        <div
          className="liquid-blob absolute -bottom-14 right-1/4 h-28 w-28 bg-[#8a5234]/35"
          style={{ ['--blob-duration' as string]: '21s', ['--blob-delay' as string]: '-12s' }}
        />

        <div className="relative flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-white/45 px-3 py-2 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#5f3a26] text-[#fff2e2]">
              <Coffee className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-[0.12em] text-[#4c2d1e]">Aroma Corner</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 rounded-xl border border-white/40 bg-white/32 p-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f3a2a] transition-all hover:bg-white/55 hover:text-[#4c2d1e]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button - تم تفعيله */}
            <button
              onClick={() => setIsSearchOpen(true)} // <-- التعديل هنا
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/45 text-[#533121] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/65 active:scale-90"
              aria-label="Search products"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* User Account Button */}
            <Link
              to="/login"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/45 text-[#533121] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/65 active:scale-90"
              aria-label="User account"
            >
              <User className="h-4 w-4" />
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-xl border border-white/50 bg-[#5f3926] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#fff2e3] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4c2f21] hover:shadow-lg shadow-[#5f3926]/20 active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#f3b079] text-[10px] font-bold text-[#4c2d1e] ring-2 ring-white/50 animate-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}