import { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Coffee, Leaf, Zap, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CoffeeDetails() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250g');

  // بيانات تجريبية لنوع القهوة (يمكنك لاحقاً جلبها عبر الـ ID)
  const coffeeData = {
    name: "Specialty Ethiopian Espresso",
    category: "Medium Roast",
    price: 85,
    rating: 4.9,
    reviews: 124,
    description: "This coffee features notes of dried fruits and caramel, processed using the natural method to give you a full body and natural sweetness in every cup.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
    notes: ["Caramel", "Chocolate", "Fruits"],
    origin: "Ethiopia - Yirgacheffe Region"
  };

  return (
    <div dir="ltr" className="min-h-screen bg-[#FAF7F2] relative overflow-hidden font-sans pb-12">
      {/* الزر الجانبي للرجوع - جهة الشمال */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed left-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 group"
        title="Back"
      >
        <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#D4B895]/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Product Image Section */}
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50">
              <img 
                src={coffeeData.image} 
                alt={coffeeData.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Badge */}
            <div className="absolute -top-4 -right-4 bg-[#8C6239] text-white px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2">
              <Star size={18} className="fill-current text-yellow-400" />
              {coffeeData.rating}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[#8C6239] font-bold tracking-widest uppercase text-sm">{coffeeData.category}</span>
              <h1 className="text-5xl font-black text-[#4A3B32]">{coffeeData.name}</h1>
              <p className="text-[#6B4423]/60 flex items-center gap-2 font-medium">
                <Leaf size={16} /> Origin: {coffeeData.origin}
              </p>
            </div>

            <p className="text-lg text-[#6B4423]/80 leading-relaxed max-w-xl">
              {coffeeData.description}
            </p>

            {/* Flavor Notes */}
            <div className="flex gap-4">
              {coffeeData.notes.map((note) => (
                <div key={note} className="px-4 py-2 rounded-xl bg-white/60 border border-white backdrop-blur-sm text-[#4A3B32] text-sm font-bold shadow-sm">
                  # {note}
                </div>
              ))}
            </div>

            {/* Selection - Size */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#4A3B32]">Choose Size:</h3>
              <div className="flex gap-3">
                {['250g', '500g', '1kg'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-xl font-bold transition-all ${
                      selectedSize === size 
                      ? 'bg-[#4A3B32] text-white shadow-md scale-105' 
                      : 'bg-white/40 text-[#4A3B32] hover:bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-[#6B4423]/10" />

            {/* Price & Action */}
            <div className="flex items-center justify-between gap-6">
              <div>
                <span className="text-sm text-[#6B4423]/60 block mb-1">Approximate Price</span>
                <span className="text-4xl font-black text-[#4A3B32]">{coffeeData.price} <small className="text-lg">SAR</small></span>
              </div>

              <div className="flex items-center bg-white/60 backdrop-blur-md rounded-2xl border border-white p-1">
                <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-10 h-10 flex items-center justify-center font-bold text-xl">-</button>
                <span className="w-10 text-center font-black">{quantity}</span>
                <button onClick={() => setQuantity(quantity+1)} className="w-10 h-10 flex items-center justify-center font-bold text-xl">+</button>
              </div>

              <button className="flex-1 py-4 bg-[#4A3B32] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#8C6239] transition-all shadow-xl shadow-[#4A3B32]/20 group">
                <ShoppingCart size={20} className="group-hover:animate-bounce" />
                Add to Cart
              </button>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4 pt-4">
               <div className="flex flex-col items-center gap-1 text-[#6B4423]/60">
                  <Zap size={20} className="text-[#8C6239]" />
                  <span className="text-xs font-bold">High Energy</span>
               </div>
               <div className="flex flex-col items-center gap-1 text-[#6B4423]/60">
                  <Clock size={20} className="text-[#8C6239]" />
                  <span className="text-xs font-bold">Fresh Roast</span>
               </div>
               <div className="flex flex-col items-center gap-1 text-[#6B4423]/60">
                  <Coffee size={20} className="text-[#8C6239]" />
                  <span className="text-xs font-bold">100% Arabica</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}