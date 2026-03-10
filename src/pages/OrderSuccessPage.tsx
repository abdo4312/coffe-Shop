import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Home, Coffee } from 'lucide-react';

export function OrderSuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId') || 'UNKNOWN';

    return (
        <div className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans flex items-center justify-center py-12">
            {/* الخلفيات المتحركة */}
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-c" />

            <div className="relative z-10 text-center px-4 max-w-lg mx-4">
                <div className="rounded-[2.5rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8 md:p-12">

                    {/* Success Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg mb-6 animate-bounce">
                        <CheckCircle size={40} />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#3f2518] mb-3">
                        Order Confirmed!
                    </h1>
                    <p className="text-[#6B4423]/80 mb-8">
                        Thank you for your purchase. Your coffee is on its way!
                    </p>

                    {/* Order ID Card */}
                    <div className="bg-white/40 rounded-xl p-4 mb-8 border border-white/50 inline-block">
                        <p className="text-xs text-[#6B4423]/60 uppercase tracking-wider mb-1">Order Reference</p>
                        <p className="text-2xl font-black text-[#8C6239] tracking-widest">#{orderId}</p>
                    </div>

                    <p className="text-sm text-[#6B4423]/70 mb-8">
                        We've sent a confirmation email to your inbox. You can track your order status in the profile section.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate('/profile')}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#8C6239] text-[#8C6239] font-bold hover:bg-[#8C6239]/10 transition-all"
                        >
                            <Package size={18} /> Track Order
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#553220] text-white font-bold hover:bg-[#422617] transition-all shadow-lg"
                        >
                            <Coffee size={18} /> Back to Shop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}