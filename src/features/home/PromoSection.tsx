export function PromoSection() {
  return (
    <section className="pb-2">
      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/45 bg-white/22 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
        <div className="coffee-hero-gradient absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.62),rgba(255,255,255,0.2))]" />

        <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">limited batch</p>
            <h2 className="mt-2 text-3xl font-bold text-[#3f2518]">Golden Hour Roast - 25% Off</h2>
            <p className="mt-3 max-w-2xl text-sm text-[#654634] md:text-base">
              A warm blend of hazelnut, milk chocolate, and orange zest.
              Available this week only, while stocks last.
            </p>
          </div>

          <button className="rounded-xl bg-[#553220] px-6 py-3 text-sm font-semibold text-[#fff5ea] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#422617] hover:shadow-[0_10px_25px_-8px_rgba(54,31,21,0.7)]">
            Claim the Offer
          </button>
        </div>
      </div>
    </section>
  )
}
