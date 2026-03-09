import { useState } from 'react'
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    ChevronDown,
    Instagram,
    Facebook,
    Twitter
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

// بيانات الأسئلة الشائعة
const faqData = [
    {
        question: 'How fresh are your coffee beans?',
        answer: 'We roast our beans in small batches throughout the week. All orders are shipped within 48 hours of roasting to ensure maximum freshness and flavor.'
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 100% satisfaction guarantee. If you are not happy with your purchase, contact us within 14 days for a full refund or exchange.'
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Currently, we ship to all GCC countries and select international destinations. Shipping rates and times vary by location.'
    },
    {
        question: 'How should I store my coffee beans?',
        answer: 'Store your beans in an airtight container away from light, heat, and moisture. Our bags have one-way valves to preserve freshness.'
    },
    {
        question: 'Can I track my order?',
        answer: 'Yes! Once your order ships, you will receive a tracking number via email to monitor your delivery status.'
    },
]

// بيانات التواصل
const contactInfo = [
    {
        icon: MapPin,
        label: 'Visit Us',
        value: 'Downtown Roastery, Cairo, Egypt'
    },
    {
        icon: Phone,
        label: 'Call Us',
        value: '+20 100 123 4567'
    },
    {
        icon: Mail,
        label: 'Email Us',
        value: 'hello@aromacorner.shop'
    },
    {
        icon: Clock,
        label: 'Working Hours',
        value: 'Sat - Thu: 9AM - 10PM'
    },
]

export function SupportPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(0)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would normally send the data to your backend
        console.log('Form submitted:', formData)
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] text-[#2e1a12]">

            {/* Background Blobs */}
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-d" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">

                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8c6239]/30 bg-[#8c6239]/10 px-4 py-2">
                        <MessageSquare className="h-4 w-4 text-[#8c6239]" />
                        <span className="text-sm font-medium text-[#5f3a26]">We're here to help</span>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-[#3f2518] md:text-5xl">
                        Support Center
                    </h1>
                    <p className="mx-auto max-w-xl text-base text-[#6B4423]/80">
                        Have a question or need assistance? We'd love to hear from you.
                    </p>
                </header>

                {/* Main Content Grid */}
                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Left Column - Contact Info + Map + Social */}
                    <div className="space-y-6">

                        {/* Contact Info Card */}
                        <div className="rounded-[2rem] border border-white/40 bg-white/25 p-8 backdrop-blur-xl shadow-2xl">
                            <h2 className="mb-6 text-xl font-bold text-[#3f2518]">Get in Touch</h2>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {contactInfo.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-start gap-4 rounded-xl bg-white/30 p-4 transition hover:bg-white/40"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5f3a26]/10">
                                            <item.icon className="h-5 w-5 text-[#5f3a26]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wider text-[#8c6239]">
                                                {item.label}
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-[#3f2518]">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="rounded-[2rem] border border-white/40 bg-white/25 p-6 backdrop-blur-xl shadow-xl">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#7a5a46]">
                                Follow Us
                            </h3>
                            <div className="flex gap-3">
                                {[
                                    { icon: Instagram, label: 'Instagram', href: '#' },
                                    { icon: Facebook, label: 'Facebook', href: '#' },
                                    { icon: Twitter, label: 'Twitter', href: '#' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/50 bg-white/35 text-[#5f3a26] transition-all hover:bg-white/60 hover:scale-105"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="rounded-[2rem] border border-white/40 bg-white/25 p-2 backdrop-blur-xl shadow-xl overflow-hidden">
                            <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-[#e8d5c4]">
                                {/* Placeholder for Google Maps - Replace with actual iframe */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjgiTiAzMcKwMTQnMDguNyJF!5e0!3m2!1sen!2seg!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                />
                                {/* Fallback overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-[#e8d5c4] pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                                    <div className="text-center">
                                        <MapPin className="mx-auto h-12 w-12 text-[#8c6239]" />
                                        <p className="mt-2 font-medium text-[#5f3a26]">Downtown Roastery, Cairo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="rounded-[2rem] border border-white/40 bg-white/25 p-8 backdrop-blur-xl shadow-2xl">
                        <h2 className="mb-6 text-xl font-bold text-[#3f2518]">Send us a Message</h2>

                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <Send className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-[#3f2518]">Message Sent!</h3>
                                <p className="mt-2 text-[#6B4423]/70">We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#5f3a26]">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full rounded-xl border border-white/50 bg-white/35 px-4 py-3 text-sm text-[#3f2518] placeholder:text-[#8c6239]/50 focus:border-[#8c6239]/40 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/20 backdrop-blur-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#5f3a26]">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full rounded-xl border border-white/50 bg-white/35 px-4 py-3 text-sm text-[#3f2518] placeholder:text-[#8c6239]/50 focus:border-[#8c6239]/40 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/20 backdrop-blur-sm"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#5f3a26]">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full rounded-xl border border-white/50 bg-white/35 px-4 py-3 text-sm text-[#3f2518] placeholder:text-[#8c6239]/50 focus:border-[#8c6239]/40 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/20 backdrop-blur-sm"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#5f3a26]">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full resize-none rounded-xl border border-white/50 bg-white/35 px-4 py-3 text-sm text-[#3f2518] placeholder:text-[#8c6239]/50 focus:border-[#8c6239]/40 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/20 backdrop-blur-sm"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-[#5f3a26] py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4c2d1e] hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <Send className="h-4 w-4" />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="mt-16">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-[#3f2518] md:text-3xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-2 text-[#6B4423]/70">Quick answers to common questions</p>
                    </div>

                    <div className="mx-auto max-w-3xl space-y-4">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/40 bg-white/25 backdrop-blur-xl overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="flex w-full items-center justify-between p-5 text-left"
                                >
                                    <span className="font-semibold text-[#3f2518]">{faq.question}</span>
                                    <ChevronDown
                                        className={cn(
                                            "h-5 w-5 text-[#8c6239] transition-transform duration-300",
                                            activeFaq === index && "rotate-180"
                                        )}
                                    />
                                </button>
                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-300",
                                        activeFaq === index ? "max-h-40" : "max-h-0"
                                    )}
                                >
                                    <p className="px-5 pb-5 text-sm text-[#6B4423]/80 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}