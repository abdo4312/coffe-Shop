import { Coffee, Instagram, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom' // استيراد Link للربط الذكي

// قمت بتعديل المصفوفة لتشمل الاسم والمسار (اختياري لكن أفضل للتنظيم)
const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Shipping', path: '/shipping' },
  { name: 'Brew Guide', path: '/brew-guide' },
  { name: 'Support', path: '#' }
]

export function HomeFooter() {
  return (
    <footer className="relative overflow-hidden rounded-[1.8rem] border border-white/45 bg-white/22 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
      <div className="coffee-hero-gradient absolute inset-0 opacity-35" />
      
      {/* Liquid Blobs */}
      <div
        className="liquid-blob absolute -bottom-16 left-10 h-32 w-32 bg-[#7d4930]/35"
        style={{ ['--blob-duration' as string]: '26s', ['--blob-delay' as string]: '-9s' }}
      />
      <div
        className="liquid-blob absolute -right-10 top-4 h-24 w-24 bg-[#f0b57f]/45"
        style={{ ['--blob-duration' as string]: '18s', ['--blob-delay' as string]: '-4s' }}
      />

      <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand Info */}
        <div className="text-right md:text-left">
          <div className="inline-flex items-center gap-2 rounded-xl bg-white/40 px-3 py-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#5f3a26] text-[#fff2e2]">
              <Coffee className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-[0.12em] text-[#4c2d1e]">Aroma Corner</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5d3e2c]">
            Specialty coffee for slow mornings and bold afternoons. We roast in
            small batches and ship fresh to your door.
          </p>
        </div>

        {/* Quick Links - التعديل هنا */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f4f3b]">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className="text-sm text-[#4f2f21] transition-colors hover:text-[#7a4d35] hover:font-bold"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f4f3b]">Contact</h3>
          <div className="mt-3 space-y-3 text-sm text-[#4f2f21]">
            <p className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#7d4930]" />
              Downtown Roastery, Cairo
            </p>
            <p className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#7d4930]" />
              hello@aromacorner.shop
            </p>
            <p className="inline-flex items-center gap-2">
              <Instagram className="h-4 w-4 text-[#7d4930]" />
              @aromacornercoffee
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative mt-7 border-t border-white/45 pt-4 text-xs text-[#6f503d] flex justify-between items-center">
        <p>© 2026 Aroma Corner. All rights reserved.</p>
        <div className="flex gap-4 opacity-60">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}