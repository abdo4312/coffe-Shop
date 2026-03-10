import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, CreditCard, Truck, MapPin, Wallet } from 'lucide-react';
import { useState } from 'react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Order ID
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    clearCart();
    // التحويل لصفحة النجاح مع رقم الطلب
    navigate(`/order-success?orderId=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
        <div className="text-center p-8 rounded-[2rem] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl">
          <h2 className="text-2xl font-bold text-[#4A3B32] mb-4">Your cart is empty</h2>
          <button onClick={() => navigate('/shop-beans')} className="px-6 py-3 bg-[#8C6239] text-white rounded-xl font-bold hover:bg-[#5F3A26] transition-colors">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="ltr" className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans pb-20 pt-10">
      {/* الخلفيات المتحركة */}
      <div className="coffee-blob coffee-blob-a" />
      <div className="coffee-blob coffee-blob-b" />
      <div className="coffee-blob coffee-blob-c" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* زر الرجوع */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-5 py-3 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 text-[#4A3B32] hover:bg-white/60 transition-all font-medium"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        <h1 className="mb-12 text-4xl md:text-5xl font-extrabold text-[#3f2518]">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* نموذج البيانات - Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-6 lg:col-span-3">

            {/* Shipping Information */}
            <section className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8">
              <div className="mb-6 flex items-center gap-3 text-[#4A3B32]">
                <div className="p-2 rounded-xl bg-[#8C6239]/10">
                  <MapPin className="text-[#8C6239]" size={20} />
                </div>
                <h3 className="text-xl font-bold">Shipping Information</h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-[#5F3A26] mb-1 block">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#5F3A26] mb-1 block">Phone Number</label>
                  <input required type="tel" placeholder="+20 100 123 4567" className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#5F3A26] mb-1 block">City</label>
                  <input required type="text" placeholder="Cairo" className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-[#5F3A26] mb-1 block">Address Details</label>
                  <input required type="text" placeholder="Street name, Building, Floor..." className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-[#5F3A26] mb-1 block">Delivery Notes (Optional)</label>
                  <input type="text" placeholder="E.g. Ring the bell, leave at door..." className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all" />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8">
              <div className="mb-6 flex items-center gap-3 text-[#4A3B32]">
                <div className="p-2 rounded-xl bg-[#8C6239]/10">
                  <CreditCard className="text-[#8C6239]" size={20} />
                </div>
                <h3 className="text-xl font-bold">Payment Method</h3>
              </div>
              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${paymentMethod === 'cod' ? 'border-[#8C6239] bg-white/50' : 'border-white/30 bg-white/20 hover:bg-white/30'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'cod' ? 'border-[#8C6239]' : 'border-gray-300'}`}>
                      {paymentMethod === 'cod' && <div className="h-2.5 w-2.5 rounded-full bg-[#8C6239]" />}
                    </div>
                    <span className="font-bold text-[#4A3B32]">Cash on Delivery</span>
                  </div>
                  <Truck className="text-[#8C6239]/60" />
                </label>

                {/* Credit Card (Mock) */}
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${paymentMethod === 'card' ? 'border-[#8C6239] bg-white/50' : 'border-white/30 bg-white/20 hover:bg-white/30'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-[#8C6239]' : 'border-gray-300'}`}>
                      {paymentMethod === 'card' && <div className="h-2.5 w-2.5 rounded-full bg-[#8C6239]" />}
                    </div>
                    <span className="font-bold text-[#4A3B32]">Credit Card (Visa/Mastercard)</span>
                  </div>
                  <Wallet className="text-[#8C6239]/60" />
                </label>
              </div>
            </section>

            <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] py-5 text-xl font-black text-white transition-all hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]">
              Confirm Order • {totalPrice.toFixed(2)} SAR
            </button>
          </form>

          {/* Order Summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-10 space-y-4 rounded-[2rem] border border-white/40 bg-[#4A3B32] p-8 text-white shadow-2xl">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4">Order Summary</h3>
              <div className="max-h-[300px] overflow-y-auto space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm gap-3">
                    <img src={item.image} className="h-14 w-14 rounded-xl object-cover shadow-md" alt={item.name} />
                    <div className="flex-1">
                      <p className="font-bold truncate">{item.name}</p>
                      <p className="text-white/60 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold">{(item.price * item.quantity).toFixed(2)} SAR</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between pt-4 text-2xl font-black border-t border-white/10">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} SAR</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}