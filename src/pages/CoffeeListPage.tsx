import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext'; // استدعاء الهوك

const allCoffees = [
  { id: 'colombia-01', name: 'Colombian Caramel', roast: 'Medium', price: 65, rating: 4.8, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500' },
  { id: 'ethiopia-02', name: 'Ethiopian Bloom', roast: 'Light', price: 72, rating: 4.9, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500' },
  { id: 'espresso-03', name: 'Midnight Blend', roast: 'Dark', price: 58, rating: 4.7, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500' },
  { id: 'brazil-04', name: 'Brazil Nutty', roast: 'Medium', price: 60, rating: 4.6, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500' },
  { id: 'guatemala-05', name: 'Guatemala Antigua', roast: 'Medium', price: 68, rating: 4.8, image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=500' },
  { id: 'sumatra-06', name: 'Sumatra Mandheling', roast: 'Dark', price: 75, rating: 4.5, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500' },
];

const roastTypes = ["All", "Light", "Medium", "Dark"];

export function CoffeeList() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [activeRoast, setActiveRoast] = useState("All");

  return (
    <div dir="ltr" className="min-h-screen bg-[#FAF7F2] relative overflow-hidden font-sans pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="fixed left-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 group"
      >
        <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-black text-[#4A3B32]">Beans <span className="text-[#8C6239]">Menu</span></h1>
          <p className="text-[#6B4423]/70 max-w-lg mx-auto">Explore the finest specialty coffee carefully selected from around the world.</p>
        </header>

        {/* Search & Filter Bar */}
        <div className="sticky top-6 z-30 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-md bg-white/40 p-4 rounded-3xl border border-white/60 shadow-xl">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {roastTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveRoast(type)}
                className={`px-6 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeRoast === type 
                  ? 'bg-[#4A3B32] text-white shadow-lg' 
                  : 'bg-white/50 text-[#4A3B32] hover:bg-white'
                }`}
              >
                {type === "All" ? "All Roasts" : `${type} Roast`}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C6239]/50 group-focus-within:text-[#8C6239]" size={18} />
            <input 
              type="text" 
              placeholder="Search for your favorite beans..." 
              className="w-full pr-12 pl-4 py-3 rounded-2xl bg-white/50 border border-transparent focus:border-[#8C6239]/30 outline-none transition-all"
            />
          </div>
        </div>

        {/* Coffee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allCoffees
            .filter(c => activeRoast === "All" || c.roast === activeRoast)
            .map((coffee) => (
            <div 
              key={coffee.id}
              onClick={() => navigate(`/coffee/${coffee.id}`)}
              className="group relative bg-white/30 backdrop-blur-sm border border-white/50 rounded-[2.5rem] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-[#4A3B32] font-bold text-xs">
                  <Star size={12} className="text-orange-400 fill-current" />
                  {coffee.rating}
                </div>
              </div>

              <div className="p-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#8C6239] mb-1 block">
                  {coffee.roast} Roast
                </span>
                <h3 className="text-xl font-bold text-[#4A3B32] mb-4">{coffee.name}</h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#4A3B32]">{coffee.price} <small className="text-xs font-medium">SAR</small></span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({
                        id: coffee.id,
                        name: coffee.name,
                        price: coffee.price,
                        image: coffee.image,
                        roastLevel: coffee.roast
                      });
                    }}
                    className="p-3 rounded-xl bg-[#4A3B32] text-white hover:bg-[#8C6239] transition-colors"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}