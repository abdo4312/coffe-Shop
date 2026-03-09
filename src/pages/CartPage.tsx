import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ArrowLeft, Coffee, ShoppingBag } from 'lucide-react';

export function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  // حالة السلة فارغة
  if (items.length === 0) {
    return (
      <div dir="ltr" className="container mx-auto px-4 py-20">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-[3rem] border border-white/40 bg-white/20 p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="rounded-full bg-[#5f3a26]/10 p-8">
            <ShoppingBag className="h-16 w-16 text-[#5f3a26] opacity-20" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#4c2d1e]">Shopping Cart فارغة</h2>
            <p className="text-[#6d4c38] opacity-80">يبدو أنك لم تضف أي نوع من قهوتنا المميزة بعد.</p>
          </div>
          <Link
            to="/coffee-list"
            className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-[#5f3926] px-8 py-4 text-lg font-bold text-[#fff2e3] transition-all hover:scale-105 hover:bg-[#4c2f21] shadow-lg shadow-[#5f3926]/20"
          >
            <ArrowLeft className="h-5 w-5 rotate-180" />
            استكشف القائمة الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="ltr" className="container mx-auto px-4 py-16 font-sans">
      <h1 className="mb-10 text-4xl font-black text-[#4c2d1e]">سلة التسوق ({items.length})</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* قائمة المنتجات في السلة */}
        <div className="space-y-6 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col gap-6 rounded-[2.5rem] border border-white/50 bg-white/30 p-6 backdrop-blur-xl transition-all hover:bg-white/40 md:flex-row md:items-center"
            >
              {/* صورة المنتج */}
              <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-3xl shadow-lg md:h-28 md:w-28">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* تفاصيل المنتج */}
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#5f3a26]">{item.name}</h3>
                    {item.roastLevel && (
                      <span className="mt-1 inline-block rounded-full bg-[#8a5234]/10 px-3 py-1 text-xs font-bold text-[#8a5234]">
                        Roast {item.roastLevel}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-xl p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* التحكم بQuantity */}
                  <div className="flex items-center gap-4 rounded-2xl bg-white/50 p-1 shadow-inner">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-[#5f3a26] transition hover:bg-white hover:shadow-sm"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center text-lg font-black text-[#4c2d1e]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-[#5f3a26] transition hover:bg-white hover:shadow-sm"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* سعر المنتج Total (سعر الوحدة * Quantity) */}
                  <div className="text-left">
                    <p className="text-xs text-[#6d4c38] opacity-60 italic">السعر Total</p>
                    <span className="text-2xl font-black text-[#4c2d1e]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ملخص الطلب - Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6 rounded-[2.5rem] border border-white/60 bg-white/40 p-8 backdrop-blur-2xl shadow-xl">
            <h3 className="text-2xl font-black text-[#4c2d1e]">ملخص الطلب</h3>
            
            <div className="space-y-4 border-b border-[#5f3a26]/10 pb-6">
              <div className="flex justify-between text-lg text-[#6d4c38]">
                <span>Subtotal</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg text-[#6d4c38]">
                <span>رسوم التوصيل</span>
                <span className="font-bold text-green-600">Free</span>
              </div>
            </div>

            <div className="flex justify-between text-3xl font-black text-[#4c2d1e]">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#5f3926] py-5 text-lg font-bold uppercase tracking-widest text-[#fff2e3] transition-all hover:bg-[#4c2f21] hover:shadow-2xl active:scale-95"
            >
              <span className="relative z-10">Checkout</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>

            <button 
              onClick={() => navigate('/coffee-list')}
              className="w-full text-sm font-bold text-[#8a5234] transition hover:text-[#5f3a26] hover:underline"
            >
              إضافة المزيد من المنتجات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}