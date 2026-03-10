import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Coffee } from 'lucide-react';

export function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logging in with:', formData);
        navigate('/profile');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans flex items-center justify-center py-12">
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-c" />

            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="rounded-[2.5rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8 md:p-10">

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8C6239] to-[#5F3A26] text-white shadow-lg mb-4">
                            <Coffee size={28} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-[#3f2518]">Welcome Back</h1>
                        <p className="text-[#6B4423]/70 mt-2 text-sm">Login to access your coffee corner</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B4423]/50" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B4423]/50" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/50 bg-white/35 backdrop-blur-sm pl-12 pr-12 py-3 text-sm text-[#3f2518] placeholder-[#6B4423]/40 focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B4423]/50 hover:text-[#8C6239] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm font-medium text-[#8C6239] hover:text-[#5F3A26] transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-[#6B4423]/80">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-[#8C6239] hover:text-[#5F3A26] transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}