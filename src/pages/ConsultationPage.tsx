import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Coffee, User, Phone, MessageSquare, Wrench } from 'lucide-react';

export function ConsultationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        experience: 'beginner',
        budget: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Consultation Request:', formData);
        alert('Your request has been submitted! Our barista will contact you shortly.');
        navigate('/brew-gear');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div dir="ltr" className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans flex items-center justify-center py-12 px-4">
            {/* الخلفيات المتحركة */}
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-c" />

            {/* زرار الرجوع */}
            <button
                onClick={() => navigate(-1)}
                className="fixed left-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 group"
            >
                <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="relative z-10 w-full max-w-xl">
                <div className="rounded-[2.5rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8 md:p-12">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8C6239] to-[#5F3A26] text-white shadow-lg mb-4">
                            <Wrench size={28} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-[#3f2518]">Barista Consultation</h1>
                        <p className="text-[#6B4423]/70 mt-2 text-sm">Get personalized advice on choosing the perfect gear.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B4423]/50" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B4423]/50" />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                    placeholder="+20 100 123 4567"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Experience</label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="pro">Professional</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Budget (SAR)</label>
                                <input
                                    type="text"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm px-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                    placeholder="e.g. 500 - 1000"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#5F3A26] mb-2">What do you need help with?</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-[#6B4423]/50" />
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all resize-none"
                                    placeholder="I want to make pour-over coffee at home..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Send size={20} />
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}