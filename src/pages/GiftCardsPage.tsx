import { useState } from 'react';
import { Gift, Send, CreditCard, CheckCircle2, Heart } from 'lucide-react';

interface GiftCard {
  id: string;
  amount: number;
  title: string;
  color: string;
  perks: string[];
}

const giftCards: GiftCard[] = [
  {
    id: 'bronze',
    amount: 100,
    title: 'بطاقة الصباح',
    color: 'from-[#D4B895] to-[#A68A68]',
    perks: ['صالحة لمدة 6 أشهر', 'تصلح لجميع أدوات القهوة']
  },
  {
    id: 'silver',
    amount: 250,
    title: 'بطاقة المزاج',
    color: 'from-[#8C6239] to-[#6B4423]',
    perks: ['صالحة لمدة سنة', 'تغليف هدايا Free', 'شحن Free لمرة واحدة']
  },
  {
    id: 'gold',
    amount: 500,
    title: 'بطاقة الباريستا',
    color: 'from-[#4A3B32] to-[#2E1F18]',
    perks: ['صلاحية مدى الحياة', 'تغليف فاخر جداً', 'خصم 10% على الطلب القادم']
  }
];

export function GiftCards() {
  const [selectedAmount, setSelectedAmount] = useState<number>(250);

  return (
    <div dir="ltr" className="min-h-screen bg-[#FAF7F2] relative overflow-hidden font-sans pb-20">
      {/* Background Fluid Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8C6239]/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-[#D4B895]/20 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <header className="py-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8C6239]/10 text-[#8C6239] text-sm font-bold mb-2">
            <Heart size={16} className="fill-current" />
            <span>شاركهم شغف القهوة</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#4A3B32]">
            بطاقات <span className="text-[#8C6239]">الإهداء</span>
          </h1>
          <p className="text-[#6B4423]/70 max-w-lg mx-auto text-lg">
            أفضل هدية لمحبي القهوة هي حرية اختيار أدواتهم المفضلة بأنفسهم.
          </p>
        </header>

        {/* Gift Card Preview - Main Display */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* The Visual Card */}
            <div className="relative group">
              <div className={`aspect-[1.6/1] w-full rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl transition-all duration-700 bg-gradient-to-br ${giftCards.find(c => c.amount === selectedAmount)?.color || giftCards[1].color}`}>
                {/* Card Patterns */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <Gift size={40} strokeWidth={1.5} />
                    <span className="font-mono text-lg tracking-widest opacity-80">GIFT CARD</span>
                  </div>
                  
                  <div>
                    <div className="text-sm opacity-80 mb-1">قيمة البطاقة</div>
                    <div className="text-5xl font-black">{selectedAmount} <span className="text-xl">SAR</span></div>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium opacity-70">Brew Gear Store</span>
                    <CreditCard size={24} className="opacity-50" />
                  </div>
                </div>
              </div>
              {/* Card Shadow/Reflection */}
              <div className="absolute inset-0 bg-black/20 blur-2xl -z-10 translate-y-8 scale-90 opacity-50" />
            </div>

            {/* Selection Options */}
            <div className="space-y-8 bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-xl">
              <h3 className="text-2xl font-bold text-[#4A3B32]">اختر القيمة</h3>
              <div className="grid grid-cols-3 gap-4">
                {giftCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedAmount(card.amount)}
                    className={`py-4 rounded-2xl font-bold transition-all duration-300 ${
                      selectedAmount === card.amount
                      ? 'bg-[#4A3B32] text-white shadow-lg scale-105'
                      : 'bg-white/50 text-[#4A3B32] hover:bg-white border border-transparent'
                    }`}
                  >
                    {card.amount}
                  </button>
                ))}
              </div>

              <ul className="space-y-3">
                {giftCards.find(c => c.amount === selectedAmount)?.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#6B4423]">
                    <CheckCircle2 size={18} className="text-[#8C6239]" />
                    <span className="text-sm font-medium">{perk}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 bg-[#8C6239] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#6B4423] transition-colors shadow-lg shadow-[#8C6239]/20">
                <Send size={20} />
                إرسال كهدية
              </button>
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { step: '01', title: 'اختر القيمة', desc: 'حدد المبلغ المناسب لهديتك من الخيارات المتاحة.' },
            { step: '02', title: 'أضف بيانات المستلم', desc: 'اكتب بريده الإلكتروني ورسالة خاصة منك.' },
            { step: '03', title: 'وصول فوري', desc: 'ستصل البطاقة لصندوق بريده في أقل من دقيقة.' }
          ].map((item, idx) => (
            <div key={idx} className="p-6 space-y-3">
              <span className="text-4xl font-black text-[#D4B895]/30">{item.step}</span>
              <h4 className="text-xl font-bold text-[#4A3B32]">{item.title}</h4>
              <p className="text-[#6B4423]/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}