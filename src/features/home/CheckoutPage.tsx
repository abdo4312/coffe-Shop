import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, CreditCard, Truck, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  // دالة إتمام الطلب وهمية
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isOrdered) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF7F2] p-6 text-center">
        <div className="animate-bounce rounded-full bg-green-100 p-6 text-green-600">
          <CheckCircle2 size={80} />
        </div>
        <h2 className="mt-8 text-4xl font-black text-[#4A3B32]">Order received successfully!</h2>
        <p className="mt-4 text-xl text-[#6B4423]/70">شكراً لثقتك بـ Aroma Corner. سيصلك تأكيد الطلب عبر البريد الإلكتروني.</p>
        <p className="mt-2 text-sm text-[#8C6239]">Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div dir="ltr" className="min-h-screen bg-[#FAF7F2] pb-20 pt-10 font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        {/* زر الرجوع */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-[#8C6239] hover:underline"
        >
          <ArrowLeft size={20} className="rotate-180" />
          Back to Cart
        </button>

        <h1 className="mb-12 text-4xl font-black text-[#4A3B32]">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* نموذج البيانات - Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-6 lg:col-span-2">
            
            {/* Shipping Information */}
            <section className="rounded-3xl border border-white bg-white/40 p-8 backdrop-blur-md">
              <div className="mb-6 flex items-center gap-3 text-[#4A3B32]">
                <MapPin className="text-[#8C6239]" />
                <h3 className="text-xl font-bold">Shipping Information</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input required type="text" placeholder="Full Name" className="w-full rounded-xl border border-white/60 bg-white/50 p-4 outline-none focus:border-[#8C6239]" />
                <input required type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-white/60 bg-white/50 p-4 outline-none focus:border-[#8C6239]" />
                <input required type="text" placeholder="City" className="w-full rounded-xl border border-white/60 bg-white/50 p-4 outline-none focus:border-[#8C6239]" />
                <input required type="text" placeholder="District / Street" className="w-full rounded-xl border border-white/60 bg-white/50 p-4 outline-none focus:border-[#8C6239]" />
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-3xl border border-white bg-white/40 p-8 backdrop-blur-md">
              <div className="mb-6 flex items-center gap-3 text-[#4A3B32]">
                <CreditCard className="text-[#8C6239]" />
                <h3 className="text-xl font-bold">Payment Method</h3>
              </div>
              <div className="grid gap-4">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-[#8C6239] bg-white/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-[#8C6239]" />
                    <span className="font-bold text-[#4A3B32]">Cash on Delivery</span>
                  </div>
                  <Truck className="text-[#8C6239]/60" />
                </label>
                <div className="rounded-xl border border-dashed border-[#8C6239]/40 p-4 text-center text-sm text-[#8C6239]">
                  الدفع بواسطة البطاقة (قريباً)
                </div>
              </div>
            </section>

            <button type="submit" className="w-full rounded-2xl bg-[#4A3B32] py-5 text-xl font-black text-white transition-all hover:bg-[#2E1F18] shadow-xl">
              Confirm Order (${totalPrice.toFixed(2)})
            </button>
          </form>

          {/* Order Summary الثابت */}
          <aside className="lg:col-span-1">
            <div className="sticky top-10 space-y-4 rounded-3xl border border-white bg-[#4A3B32] p-8 text-white shadow-2xl">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4">Order Summary</h3>
              <div className="max-h-[300px] overflow-y-auto space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-right">
                      <img src={item.image} className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-white/60">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between pt-4 text-2xl font-black">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}