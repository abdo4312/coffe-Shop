import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Calendar, Clock, Users, Coffee, Star } from 'lucide-react';

// تعريف الـ Interface
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

// ✅ لازم نعرف الداتا هنا عشان الـ Icons تبقى React Components مش Objects
const bookingPlans: BookingPlan[] = [
    {
        id: 'single',
        name: 'Focus Corner',
        description: 'Ideal single table for study or remote work with total peace.',
        price: '25',
        duration: 'Hour',
        icon: Coffee,
        features: ['Comfortable seat & private charger', 'Ultra-fast internet', '10% discount on drinks'],
        color: 'from-[#D4B895] to-[#C3A077]',
    },
    {
        id: 'duo',
        name: "Friends' Spot",
        description: 'Cozy table for 2 to 4 people, perfect for conversation.',
        price: '45',
        duration: 'Hour',
        icon: Users,
        features: ['Premium view', 'Fast hospitality service', 'Pre-booking available', 'Quiet corner'],
        isPopular: true,
        color: 'from-[#8C6239] to-[#6B4423]',
    },
    {
        id: 'meeting',
        name: 'Meeting Room',
        description: 'Fully equipped private space for formal meetings or workshops.',
        price: '150',
        duration: 'Hour',
        icon: Star,
        features: ['Smart display screen', 'Whiteboard', 'Complimentary coffee', 'Total privacy'],
        color: 'from-[#4A3B32] to-[#2E1F18]',
    }
];

export function BookingFormPage() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<BookingPlan | null>(null);

    // State للفورم
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '1',
        notes: ''
    });

    // قراءة الـ ID من localStorage وإيجاد الـ Plan المناسب
    useEffect(() => {
        const planId = localStorage.getItem('selectedBookingPlanId');
        if (planId) {
            const foundPlan = bookingPlans.find(p => p.id === planId);
            if (foundPlan) {
                setSelectedPlan(foundPlan);
            } else {
                navigate('/book-table');
            }
        } else {
            navigate('/book-table');
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Booking Data:', { plan: selectedPlan, ...formData });
        localStorage.removeItem('selectedBookingPlanId');
        alert('Booking confirmed successfully!');
        navigate('/');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!selectedPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F0EB]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8C6239]"></div>
            </div>
        );
    }

    // استخراج الـ Icon كـ Component
    const PlanIcon = selectedPlan.icon;

    return (
        <div dir="ltr" className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans pb-12">
            {/* Decorative background elements - نفس ستايل صفحة الحجز */}
            <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#E8DCC8] opacity-60 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4B895] opacity-40 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/book-table')}
                    className="mb-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 font-semibold"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Plans
                </button>

                <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">

                    {/* Left: Selected Plan Summary */}
                    <div className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-[#4A3B32] mb-6">Your Selection</h2>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`rounded-2xl p-4 bg-gradient-to-br ${selectedPlan.color} text-white shadow-lg`}>
                                <PlanIcon className="h-8 w-8" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#4A3B32]">{selectedPlan.name}</h3>
                                <p className="text-sm text-[#6B4423]/70">{selectedPlan.description}</p>
                            </div>
                        </div>

                        <div className="border-t border-white/40 pt-6 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[#6B4423]/70">Price</span>
                                <span className="text-2xl font-bold text-[#4A3B32]">{selectedPlan.price} SAR/{selectedPlan.duration}</span>
                            </div>
                        </div>

                        <ul className="space-y-3">
                            {selectedPlan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3 text-[#4A3B32]">
                                    <div className="rounded-full p-1 bg-[#8C6239]/20 text-[#8C6239]">
                                        <Check className="h-4 w-4" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Booking Form */}
                    <div className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-[#4A3B32] mb-6">Complete Your Booking</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                        placeholder="+20 100 123 4567"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        required
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Number of Guests</label>
                                <select
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                >
                                    <option value="1">1 Person</option>
                                    <option value="2">2 People</option>
                                    <option value="3">3 People</option>
                                    <option value="4">4 People</option>
                                    <option value="5">5 People</option>
                                    <option value="6">6 People</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Special Requests (Optional)</label>
                                <textarea
                                    name="notes"
                                    rows={3}
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all resize-none"
                                    placeholder="Any special requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}