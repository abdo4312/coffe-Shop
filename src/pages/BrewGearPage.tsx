import { useState } from 'react';
import { ShoppingCart, Search, Plus, Coffee, Thermometer, Wind } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom'; // تأكد إنها مستوردة

// تعريف واجهة المنتج
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  tag?: string;
}

const products: Product[] = [
  { id: 1, name: "V60 Ceramic Dripper Set", category: "Pour-over Tools", price: 185, image: "https://images.unsplash.com/photo-1544190807-c73795333bb2?auto=format&fit=crop&q=80&w=400", rating: 4.9, tag: "Best Seller" },
  { id: 2, name: "Professional Manual Grinder", category: "Grinders", price: 420, image: "https://images.unsplash.com/photo-1585445497204-94e26c6fabfc?auto=format&fit=crop&q=80&w=400", rating: 4.8 },
  { id: 3, name: "Matte Black Pour-over Kettle", category: "Kettles", price: 210, image: "https://images.unsplash.com/photo-1577939748584-42bc9776832e?auto=format&fit=crop&q=80&w=400", rating: 4.7, tag: "New Arrival" },
  { id: 4, name: "Smart Digital Scale", category: "Accessories", price: 145, image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400", rating: 4.9 },
  { id: 5, name: "Chemex 6 Cups", category: "Pour-over Tools", price: 235, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400", rating: 4.6 },
  { id: 6, name: "Glass French Press", category: "Pour-over Tools", price: 120, image: "https://images.unsplash.com/photo-1544190807-c73795333bb2?auto=format&fit=crop&q=80&w=400", rating: 4.5 },
];

const categories = ["All", "Pour-over Tools", "Grinders", "Kettles", "Accessories"];

export function BrewGear() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { addItem } = useCart();

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div dir="ltr" className="min-h-screen bg-[#FAF7F2] relative overflow-hidden font-sans pb-20">
      {/* Background Fluid Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#EADBC8] rounded-full blur-[100px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-[#D4B895] rounded-full blur-[110px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <header className="py-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8C6239]/10 text-[#8C6239] text-sm font-bold mb-4">
            <Coffee size={16} />
            <span>Professional Barista Equipment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#4A3B32]">
            Brew <span className="text-[#8C6239]">Gear</span>
          </h1>
          <p className="text-[#6B4423]/70 max-w-xl mx-auto text-lg italic">
            "Tools that turn your morning routine into an artistic ritual."
          </p>
        </header>

        {/* Filters & Search - Glassmorphism Bar */}
        <div className="sticky top-6 z-30 mb-12 backdrop-blur-md bg-white/40 border border-white/60 p-4 rounded-3xl shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat
                  ? 'bg-[#4A3B32] text-white shadow-lg'
                  : 'bg-white/50 text-[#4A3B32] hover:bg-white/80'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C6239]/50 group-focus-within:text-[#8C6239] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search for your gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/50 border border-transparent focus:border-[#8C6239]/30 focus:bg-white outline-none transition-all text-[#4A3B32]"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/30 backdrop-blur-sm border border-white/50 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.tag && (
                    <span className="absolute top-4 right-4 bg-[#4A3B32] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B32]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-[#8C6239] uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center gap-1 text-orange-400">
                      <span className="text-xs font-bold text-[#4A3B32]">{product.rating}</span>
                      <Plus size={12} className="rotate-45 fill-current" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#4A3B32] mb-4 group-hover:text-[#8C6239] transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#6B4423]/60">Price</span>
                      <span className="text-2xl font-black text-[#4A3B32]">{product.price} <small className="text-sm font-medium">SAR</small></span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-4 rounded-2xl bg-[#4A3B32] text-white hover:bg-[#8C6239] shadow-lg shadow-[#4A3B32]/20 transition-all active:scale-95 group/btn"
                    >
                      <ShoppingCart size={22} className="group-hover/btn:animate-bounce" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-[#6B4423]/60">
              No products found matching your search.
            </div>
          )}
        </div>

        {/* Floating Action/Info Section */}
        <div className="mt-20 p-8 rounded-[3rem] bg-gradient-to-r from-[#4A3B32] to-[#2E1F18] text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">New Home Barista?</h2>
              <p className="text-[#D4B895] max-w-md">We're here to help you choose the right tools for your budget and coffee taste.</p>

              {/* تم تعديل الزرار ليصبح Link */}
              <Link
                to="/consultation"
                className="inline-block px-8 py-3 bg-[#D4B895] text-[#2E1F18] rounded-xl font-bold hover:bg-white transition-colors"
              >
                Request Free Consultation
              </Link>

            </div>
            <div className="flex gap-8 opacity-50">
              <Thermometer size={80} strokeWidth={1} />
              <Wind size={80} strokeWidth={1} />
              <Coffee size={80} strokeWidth={1} />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </div>
      </div>
    </div>
  );
}