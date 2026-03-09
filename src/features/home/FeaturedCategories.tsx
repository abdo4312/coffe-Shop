export function FeaturedCategories() {
  const categories = [
    {
      name: 'Single-Origin Beans',
      description: 'Complex notes from seasonal farm lots.',
    },
    {
      name: 'Espresso Blends',
      description: 'Balanced body with caramel sweetness.',
    },
    {
      name: 'Cold Brew Kits',
      description: 'Smooth extraction for iced coffee lovers.',
    },
    {
      name: 'Coffee Tools',
      description: 'Grinders, drippers, and barista essentials.',
    },
  ]

  return (
    <section className="rounded-[1.8rem] border border-white/40 bg-white/20 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">shop by mood</p>
          <h2 className="mt-2 text-3xl font-bold text-[#3f2518]">Coffee Categories</h2>
        </div>
        <span className="rounded-full border border-white/55 bg-white/40 px-4 py-1 text-xs font-medium text-[#6a4b37]">
          Curated Picks
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <article
            key={category.name}
            className="group rounded-2xl border border-white/45 bg-white/32 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_-18px_rgba(89,58,40,0.85)]"
          >
            <h3 className="text-lg font-semibold text-[#4a2e1f]">{category.name}</h3>
            <p className="mt-2 text-sm text-[#6e4f3a]">{category.description}</p>
            <div className="mt-5 h-1.5 w-full rounded-full bg-white/45">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#8f5c3e] to-[#d9aa7b] transition-all duration-500 group-hover:w-full" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
