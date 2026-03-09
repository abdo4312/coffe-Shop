import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
const featuredProducts = [
  {
    id: 'colombia-01',
    name: 'Colombian Caramel Roast',
    note: 'Velvety body with toffee finish.',
    roast: 'medium roast',
    price: '$14.90',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ethiopia-02',
    name: 'Ethiopian Bloom Beans',
    note: 'Floral aroma and citrus sparkle.',
    roast: 'light roast',
    price: '$16.40',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'espresso-03',
    name: 'Midnight Espresso Blend',
    note: 'Dark cocoa and smoky sweetness.',
    roast: 'dark roast',
    price: '$13.75',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'coldbrew-04',
    name: 'Vanilla Cold Brew Pack',
    note: 'Smooth finish for iced coffee days.',
    roast: 'cold brew',
    price: '$11.90',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
  },
];

export function FeaturedProducts() {
  const navigate = useNavigate();
  const { addItem } = useCart(); // استدعاء دالة الإضافة من السلة

  const handleAddToCart = (e: React.MouseEvent, product: typeof featuredProducts[0]) => {
    e.stopPropagation(); // يمنع فتح صفحة التفاصيل عند الضغط على زر الإضافة
    
    // تحويل السعر من نص "$14.90" إلى رقم 14.90
    const numericPrice = parseFloat(product.price.replace('$', ''));
    
    addItem({
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image,
      roastLevel: product.roast
    });
  };

  return (
    <section className="rounded-[1.8rem] border border-white/40 bg-white/20 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">best sellers</p>
          <h2 className="mt-2 text-3xl font-bold text-[#3f2518]">Featured Coffee Drops</h2>
        </div>
        
        <button 
          onClick={() => navigate('/coffee-list')} 
          className="rounded-lg border border-white/65 bg-white/45 px-4 py-2 text-sm font-semibold text-[#583727] transition hover:bg-white/65 active:scale-95"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {featuredProducts.map((product) => (
          <article
            key={product.id}
            onClick={() => navigate(`/coffee/${product.id}`)} 
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/50 bg-white/30 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_-30px_rgba(86,45,24,0.72)]"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#2f1f16]/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f8e7d4] backdrop-blur-md">
                {product.roast}
              </span>
            </div>

            <div className="relative space-y-3 p-5">
              <h3 className="text-lg font-semibold text-[#412619]">{product.name}</h3>
              <p className="text-sm text-[#704f3c]">{product.note}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-2xl font-bold text-[#30190f]">{product.price}</span>
                
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="rounded-xl bg-[#5b3623] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#fff3e6] transition-all duration-300 hover:bg-[#452919] hover:shadow-[0_12px_24px_-12px_rgba(57,33,22,0.85)] active:scale-90"
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}