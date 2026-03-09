import { Coffee, Search, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext';

const navItems = [
  { label: 'Beans', to: '/coffee-list' },
  { label: 'Booking', to: '/book-table' },
  { label: 'Brew Gear', to: '/brew-gear' }, 
  { label: 'Gift Cards', to: '/gift-cards' },
]

export function HomeHeader() {
  const { totalItems } = useCart();

  return (
    /* التعديلات هنا:
       1. sticky top-4: عشان يثبت ويسيب مسافة بسيطة من فوق.
       2. z-[100]: عشان يفضل فوق أي محتوى تاني (زي الصور أو الكروت).
       3. mx-4: عشان يفضل واخد الـ Margin الجميل اللي في الصورة وميلزقش في الحواف.
    */
    <header className="sticky top-4 z-[100] mx-4 mb-8 overflow-hidden rounded-[1.8rem] border border-white/45 bg-white/26 px-4 py-4 shadow-[0_22px_55px_-38px_rgba(66,38,24,0.88)] backdrop-blur-xl md:px-6 transition-all duration-500">
      
      {/* Liquid Blobs Background - بتتحرك معاك وشكلها بيبقى خيالي مع السكرول */}
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
          {/* Search Button */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/45 text-[#533121] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/65 active:scale-90"
            aria-label="Search products"
          >
            <Search className="h-4 w-4" />
          </button>

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
  )
}