import { Truck, Globe, Clock, ShieldCheck, Box, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ShippingPage() {
  const navigate = useNavigate();

  return (
    <div dir="ltr" className="relative min-h-screen overflow-hidden bg-[#FAF7F2] font-sans">
      {/* التأثيرات الخلفية السائلة - Liquid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-[5%] top-[10%] h-[400px] w-[400px] animate-pulse rounded-full bg-[#8C6239]/15 blur-[100px]" />
        <div className="absolute -left-[5%] bottom-[20%] h-[500px] w-[500px] animate-bounce rounded-full bg-[#4A3B32]/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#4A3B32_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        {/* الهيدر */}
        <header className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/40 px-6 py-2 border border-white/60 backdrop-blur-md">
            <Truck className="text-[#8C6239]" size={20} />
            <span className="text-sm font-bold tracking-widest text-[#8C6239] uppercase">الخدمات اللوجستية</span>
          </div>
          <h1 className="text-5xl font-black text-[#4A3B32] md:text-6xl">
            Shipping والتوصيل <br />
            <span className="text-[#8C6239]">إلى باب منزلك</span>
          </h1>
        </header>

        {/* شبكة المعلومات - Shipping Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ShippingCard 
            icon={<Clock size={32} />}
            title="وقت التجهيز"
            description="يتم Roast وتغليف طلبك خلال 24-48 ساعة لضمان وصول القهوة إليك وهي في قمة طزاجتها."
          />
          <ShippingCard 
            icon={<Globe size={32} />}
            title="نطاق التوصيل"
            description="نشحن لجميع مدن المملكة ودول الخليج، مع توفر خدمة التوصيل السريع في نفس اليوم داخل القاهرة."
          />
          <ShippingCard 
            icon={<ShieldCheck size={32} />}
            title="التغليف الآمن"
            description="نستخدم عبوات مفرغة من الهواء ومحمية من الصدمات لضمان عدم تأثر جودة الحبوب أثناء الرحلة."
          />
        </div>

        {/* تفاصيل إضافية - Glass Panel */}
        <div className="mt-16 overflow-hidden rounded-[3rem] border border-white/60 bg-white/30 p-10 backdrop-blur-2xl shadow-2xl transition-all hover:bg-white/40">
          <h2 className="mb-8 text-3xl font-black text-[#4A3B32]">أسئلة متكررة عن Shipping</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8C6239]/10 text-[#8C6239]">
                <Box size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#4A3B32]">كيف يمكنني تتبع طلبي؟</h4>
                <p className="mt-2 leading-relaxed text-[#6B4423]/70">بمجرد خروج الطلب من المحمصة، ستصلك رسالة نصية (SMS) وبريد إلكتروني يحتوي على رابط تتبع مباشر مع شركة Shipping.</p>
              </div>
            </div>

            <div className="flex gap-6 border-t border-white/40 pt-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8C6239]/10 text-[#8C6239]">
                <RefreshCcw size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#4A3B32]">ماذا لو وصل الطلب تالفاً؟</h4>
                <p className="mt-2 leading-relaxed text-[#6B4423]/70">Your satisfaction is our priority. إذا واجهت أي مشكلة في Shippingة، Contact Us خلال 24 ساعة وسنقوم بإرسال طلب بديل فوراً دون أي تكاليف إضافية.</p>
              </div>
            </div>
          </div>
        </div>

        {/* زر Back to Shopping */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/coffee-list')}
            className="rounded-2xl bg-[#4A3B32] px-12 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-[#2E1F18] hover:scale-105 active:scale-95"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

// مكوّن الكارت الفرعي
function ShippingCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/20 p-8 backdrop-blur-xl transition-all hover:-translate-y-2 hover:bg-white/35 hover:shadow-2xl">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4A3B32] text-[#F8E7D4] transition-transform duration-500 group-hover:rotate-12">
        {icon}
      </div>
      <h3 className="mb-3 text-2xl font-bold text-[#4A3B32]">{title}</h3>
      <p className="leading-relaxed text-[#6B4423]/80">{description}</p>
    </div>
  );
}