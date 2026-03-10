import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, Edit2, Check } from 'lucide-react';

export function ProfilePage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    // Mock User Data
    const [user, setUser] = useState({
        name: 'Ahmed Mohamed',
        email: 'ahmed@aromacorner.com',
        phone: '+20 100 123 4567',
        address: 'Downtown, Cairo, Egypt'
    });

    // Mock Orders Data
    const orders = [
        { id: '#12345', date: '2024-02-10', status: 'Delivered', total: '150 SAR' },
        { id: '#12300', date: '2024-02-01', status: 'Processing', total: '85 SAR' },
    ];

    const handleLogout = () => {
        // Mock Logout
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans py-12">
            {/* الخلفيات المتحركة */}
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-c" />

            <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-[250px_1fr] gap-8">

                    {/* Sidebar */}
                    <div className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-6 h-fit">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8C6239] to-[#5F3A26] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                                {user.name.charAt(0)}
                            </div>
                            <h3 className="font-bold text-[#3f2518]">{user.name}</h3>
                            <p className="text-xs text-[#6B4423]/70">{user.email}</p>
                        </div>

                        <nav className="space-y-2">
                            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-[#8C6239] text-white shadow-lg' : 'text-[#4A3B32] hover:bg-white/40'}`}>
                                <User size={18} /> Profile Info
                            </button>
                            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-[#8C6239] text-white shadow-lg' : 'text-[#4A3B32] hover:bg-white/40'}`}>
                                <Package size={18} /> Order History
                            </button>
                            <button onClick={() => setActiveTab('addresses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'addresses' ? 'bg-[#8C6239] text-white shadow-lg' : 'text-[#4A3B32] hover:bg-white/40'}`}>
                                <MapPin size={18} /> Addresses
                            </button>
                        </nav>

                        <button onClick={handleLogout} className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50/50 transition-all">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="rounded-[2rem] border border-white/40 bg-white/25 backdrop-blur-xl shadow-2xl p-8">

                        {activeTab === 'profile' && (
                            <div>
                                <h2 className="text-2xl font-bold text-[#3f2518] mb-6 flex items-center gap-2">
                                    <User size={24} /> Profile Information
                                </h2>
                                <form className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Full Name</label>
                                            <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="w-full rounded-xl border border-white/50 bg-white/35 px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Phone Number</label>
                                            <input type="tel" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="w-full rounded-xl border border-white/50 bg-white/35 px-4 py-3 text-sm text-[#3f2518] focus:border-[#8C6239]/60 focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#5F3A26] mb-2">Email Address</label>
                                        <input type="email" value={user.email} readOnly className="w-full rounded-xl border border-white/50 bg-gray-100/50 px-4 py-3 text-sm text-[#3f2518]/60 cursor-not-allowed" />
                                    </div>
                                    <button type="submit" className="px-8 py-3 rounded-xl bg-[#553220] text-white font-bold text-sm transition-all hover:bg-[#422617] hover:shadow-lg flex items-center gap-2">
                                        <Check size={16} /> Save Changes
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div>
                                <h2 className="text-2xl font-bold text-[#3f2518] mb-6 flex items-center gap-2">
                                    <Package size={24} /> Order History
                                </h2>

                                {orders.length > 0 ? (
                                    <div className="overflow-x-auto rounded-xl border border-white/40">
                                        <table className="w-full text-sm">
                                            <thead className="bg-white/30 text-[#5F3A26]">
                                                <tr>
                                                    <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                                                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                                                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                                                    <th className="px-4 py-3 text-left font-semibold">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/30">
                                                {orders.map((order) => (
                                                    <tr key={order.id} className="hover:bg-white/20 transition-colors">
                                                        <td className="px-4 py-3 font-medium text-[#4A3B32]">{order.id}</td>
                                                        <td className="px-4 py-3 text-[#6B4423]/80">{order.date}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 font-bold text-[#4A3B32]">{order.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    // Empty State لو مفيش طلبات
                                    <div className="text-center py-12 border border-dashed border-white/40 rounded-xl">
                                        <Package className="mx-auto h-12 w-12 text-[#6B4423]/30 mb-3" />
                                        <p className="text-[#6B4423]/60">You haven't placed any orders yet.</p>
                                        <button onClick={() => navigate('/shop-beans')} className="mt-4 px-6 py-2 rounded-lg bg-[#8C6239] text-white text-sm font-bold hover:bg-[#5F3A26] transition-colors">
                                            Start Shopping
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div>
                                <h2 className="text-2xl font-bold text-[#3f2518] mb-6 flex items-center gap-2">
                                    <MapPin size={24} /> Saved Addresses
                                </h2>
                                <div className="p-6 rounded-xl border border-white/40 bg-white/20">
                                    <p className="text-[#6B4423]/80 mb-4">{user.address}</p>
                                    <button className="text-sm font-bold text-[#8C6239] hover:text-[#5F3A26] flex items-center gap-1">
                                        <Edit2 size={14} /> Edit Address
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}