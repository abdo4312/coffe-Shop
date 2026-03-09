import { useNavigate } from 'react-router-dom'

export function HeroBanner() {
  const navigate = useNavigate()

  const highlights = [
    { label: 'Freshly Roasted', value: '48h' },
    { label: 'Coffee Origins', value: '12+' },
    { label: 'Happy Customers', value: '18k' },
  ]

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/25 p-1 shadow-[0_28px_80px_-38px_rgba(59,34,19,0.7)] backdrop-blur-xl">
      <div className="coffee-hero-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.55),transparent_58%)]" />

      <div className="relative grid gap-8 rounded-[1.7rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.62),rgba(255,255,255,0.16))] p-6 md:grid-cols-[1.3fr_0.7fr] md:p-10">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/50 bg-white/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#5d3a27]">
            coffee boutique
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
            Brew Better Mornings
          </h1>
          <p className="mb-8 max-w-2xl text-base text-[#5c3b2a] md:text-lg">
            Crafted blends, silky crema, and warm notes of caramel and cocoa.
            Start your day with premium beans and signature coffee boxes.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/shop-beans')}
              className="rounded-xl bg-[#5d3a27] px-7 py-3 text-sm font-semibold text-[#fff8f1] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a2e1f] hover:shadow-[0_10px_25px_-8px_rgba(54,31,21,0.7)]"
            >
              Shop Signature Beans
            </button>
            <button
              onClick={() => navigate('/build-your-box')}
              className="rounded-xl border border-white/60 bg-white/35 px-7 py-3 text-sm font-semibold text-[#4a2e1f] backdrop-blur-md transition-all duration-300 hover:bg-white/55"
            >
              Build Your Box
            </button>
          </div>
        </div>

        <div className="grid gap-3 self-end">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/55 bg-white/38 px-4 py-4 text-[#4a2d1f] shadow-[0_12px_35px_-20px_rgba(68,40,26,0.7)] backdrop-blur-lg"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#7c5a45]">{item.label}</p>
              <p className="mt-2 text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}