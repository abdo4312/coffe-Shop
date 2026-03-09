import { Check, Star, Users, Coffee, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// واجهة بيانات أنواع الحجز (الطاولات)
interface BookingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ElementType;
  features: string[];
  isPopular?: boolean;
  color: string;
}

const bookingPlans: BookingPlan[] = [
  {
    id: 'single',
    name: 'ركن التركيز',
    description: 'طاولة فردية مثالية للدراسة أو العمل عن بُعد مع هدوء تام.',
    price: '25',
    duration: 'ساعة',
    icon: Coffee,
    features: ['مقعد مريح وشاحن خاص', 'إنترنت فائق السرعة', 'خصم 10% على المشروبات'],
    color: 'from-[#D4B895] to-[#C3A077]',
  },
  {
    id: 'duo',
    name: 'جلسة الأصدقاء',
    description: 'طاولة مريحة تتسع لشخصين إلى 4 أشخاص للحوار والمتعة.',
    price: '45',
    duration: 'ساعة',
    icon: Users,
    features: ['إطلالة متميزة', 'خدمة ضيافة سريعة', 'إمكانية حجز مسبق', 'ركن هادئ'],
    isPopular: true,
    color: 'from-[#8C6239] to-[#6B4423]',
  },
  {
    id: 'meeting',
    name: 'غرفة الاجتماعات',
    description: 'مساحة خاصة مجهزة بالكامل للاجتماعات الرسمية أو ورش العمل.',
    price: '150',
    duration: 'ساعة',
    icon: Star,
    features: ['شاشة عرض ذكية', 'سبورة بيضاء', 'قهوة ضيافة مجانية', 'خصوصية تامة'],
    color: 'from-[#4A3B32] to-[#2E1F18]',
  }
];

// التأكد من أن اسم الدالة هو BookingPage ليتوافق مع Import في App.tsx
export function BookingPage() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans pb-12">
      {/* عناصر الخلفية الزخرفية */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#E8DCC8] opacity-60 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4B895] opacity-40 blur-[120px] pointer-events-none" />
      
      {/* زر الرجوع */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed right-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 group"
      >
        <ArrowLeft size={28} className="rotate-180 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        {/* عنوان الصفحة */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4A3B32] via-[#8C6239] to-[#4A3B32] animate-gradient">
            احجز مساحتك الخاصة
          </h1>
          <p className="text-xl md:text-2xl text-[#6B4423]/80 max-w-2xl mx-auto font-medium">
            اختر الجلسة التي تناسب احتياجك، ودع القهوة والهدوء علينا.
          </p>
        </div>

        {/* كروت الحجز */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {bookingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div 
                key={plan.id}
                className={`relative group rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2
                  ${plan.isPopular 
                    ? 'bg-white/45 border-2 border-[#8C6239]/40 shadow-2xl md:scale-105 z-10' 
                    : 'bg-white/25 border border-white/50 shadow-xl'
                  } backdrop-blur-xl`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8C6239] text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    الأكثر اختياراً
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${plan.color} text-white shadow-lg`}>
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#4A3B32]">{plan.name}</h3>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-black text-[#4A3B32]">{plan.price}</span>
                  <span className="text-lg text-[#6B4423]/60 font-bold ml-1"> ر.س / {plan.duration}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#4A3B32]">
                      <div className="mt-1 rounded-full p-1 bg-[#8C6239]/20 text-[#8C6239]">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="font-semibold text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${
                  plan.isPopular ? 'bg-[#8C6239] text-white' : 'bg-[#4A3B32] text-white'
                }`}>
                  تأكيد الحجز
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}