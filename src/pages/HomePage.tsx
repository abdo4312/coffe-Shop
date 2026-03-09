// الصفحة أصبحت الآن "خفيفة" جداً ومركزة على المحتوى الخاص بالهوم فقط
import { HeroBanner }         from '@/features/home/HeroBanner'
import { FeaturedCategories }  from '@/features/home/FeaturedCategories'
import { FeaturedProducts }    from '@/features/home/FeaturedProducts'
import { PromoSection }        from '@/features/home/PromoSection'

export function HomePage() {
  return (
    /* شلنا الـ Header والـ Footer من هنا لأنهم بقوا في App.tsx */
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_20%,#fff8f1_0%,#f9e8d8_36%,#efdac7_66%,#e3ccb8_100%)] text-[#2e1a12]">
      {/* خلفية الـ Blobs المميزة لصفحة الهوم */}
      <div className="coffee-blob coffee-blob-a" />
      <div className="coffee-blob coffee-blob-b" />
      <div className="coffee-blob coffee-blob-c" />

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-6 md:gap-20 md:px-8 md:py-10">
        <HeroBanner />
        <FeaturedCategories />
        <FeaturedProducts />
        <PromoSection />
      </div>
    </main>
  )
}