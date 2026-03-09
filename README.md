# My Store (React + Vite + TypeScript)

واجهة متجر مبنية بـ React و Vite و Tailwind CSS.
الملف ده يوثق طريقة التشغيل الصحيحة، والمشاكل اللي ظهرت أثناء الإعداد، وحلولها خطوة بخطوة.

## 1) المتطلبات

- Node.js 20+ (يفضل LTS)
- npm 10+
- نظام تشغيل Windows / macOS / Linux

## 2) تشغيل المشروع

```bash
npm install
npm run dev
```

افتح الرابط اللي Vite يطبعه في التيرمنال (غالبا `http://localhost:5173`).

## 3) أوامر مهمة

```bash
# تشغيل التطوير
npm run dev

# بناء نسخة production
npm run build

# معاينة نسخة production
npm run preview

# فحص eslint
npm run lint
```

## 4) المشاكل التي ظهرت وحلها

### المشكلة 1: ظهور صفحة Vite الافتراضية (Vite + React)

**الأعراض**
- الصفحة تعرض شعار Vite وعداد `count is 0` بدل واجهة المتجر.

**السبب**
- `src/App.tsx` كان ما زال قالب Vite الافتراضي.

**الحل**
- جعل `App` يعرض `HomePage`:
```tsx
import { HomePage } from './pages/HomePage'
function App() {
  return <HomePage />
}
```

---

### المشكلة 2: خطأ 404 على `App.js`

**الأعراض**
- في Console:
`GET /src/App.js ... 404 (Not Found)`

**السبب**
- كاش قديم من Vite/HMR أو المتصفح كان يشير إلى `App.js` بعد حذف ملفات JS المولدة.

**الحل**
1. استخدام import صريح:
```ts
import App from './App.tsx'
```
2. إعادة تشغيل السيرفر بـ:
```bash
npm run dev -- --force
```
3. Hard Reload من المتصفح (`Ctrl + F5`).
4. لو استمرت المشكلة:
```bash
rmdir /s /q node_modules\.vite
npm run dev
```

---

### المشكلة 3: التصميم ظاهر "مكسور" أو بدون Tailwind

**الأعراض**
- الصفحة تظهر نصوص فقط تقريبًا.
- غياب المسافات والألوان والأحجام المتوقعة.

**السبب**
1. `src/index.css` كان مكتوب بصيغة Tailwind v3 (`@tailwind base/components/utilities`) بينما المشروع يستخدم Tailwind v4.
2. وجود styles افتراضية من Vite كانت تؤثر على layout (مثل `body { display:flex; place-items:center; }`).

**الحل**
- تحويل `index.css` إلى صيغة v4:
```css
@import "tailwindcss";
@config "../tailwind.config.js";
```
- حذف CSS الافتراضي الخاص بقالب Vite من `index.css`.
- إلغاء استيراد `App.css` داخل `App.tsx`.

---

### المشكلة 4: alias `@` لا يعمل

**الأعراض**
- أخطاء import من نوع:
`Cannot resolve '@/...'`

**السبب**
- alias كان متعرف في TypeScript بشكل جزئي فقط.

**الحل**
1. إضافة alias في `vite.config.ts` / `vite.config.js`.
2. ضبط `paths` في `tsconfig.app.json`.
3. جعل `tsconfig.json` root يعتمد على `references`.

---

### المشكلة 5: توليد ملفات `.js` داخل `src` بعد build

**الأعراض**
- ظهور ملفات `.js` بجانب `.ts/.tsx`.
- سلوك غريب في الاستيراد أثناء dev.

**السبب**
- إعداد `tsconfig.json` root كان يسمح بـ emit بشكل غير مقصود.

**الحل**
- تحويل `tsconfig.json` إلى references فقط:
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```
- حذف ملفات `.js` المولدة من `src`.

---

### المشكلة 6: أخطاء TypeScript مع `verbatimModuleSyntax`

**الأعراض**
- أخطاء type-only import مثل:
`must be imported using a type-only import`
- أخطاء unused imports.

**السبب**
- imports لأنواع مكتوبة كـ imports عادية.

**الحل**
- استخدام `import type` للأنواع فقط.
- حذف imports غير المستخدمة.

---

### المشكلة 7: قسم "المنتجات المميزة" فارغ

**الأعراض**
- الجزء ظاهر لكن لا توجد كروت منتجات.

**السبب**
- في `FeaturedProducts.tsx`:
```ts
const products: any[] = []
```

**الحل**
- هذا طبيعي حاليًا إلى أن يتم ربط API أو بيانات mock.

## 5) خطوات تشخيص سريعة

لو الصفحة لا تعمل كما تتوقع:

1. تأكد أنك داخل مجلد المشروع الصحيح (`my-store`).
2. أوقف أي سيرفر قديم (`Ctrl + C`).
3. نفذ:
```bash
npm run dev -- --force
```
4. اعمل Hard Reload (`Ctrl + F5`).
5. تأكد أن Console لا تحتوي على 404 لـ `App.js`.
6. جرّب build للتأكد من سلامة الكود:
```bash
npm run build
```

## 6) ملاحظات تطوير

- لا تضع ملفات `.js` مولدة داخل `src`.
- لو حدثت تغييرات كبيرة في config، أعد تشغيل dev server.
- أي تغييرات في Tailwind config أو global CSS غالبا تحتاج Refresh قوي أو إعادة تشغيل.

## 7) هيكل المشروع (File Structure)

```text
my-store/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.js
├── vite.config.ts
│
├── public/
│   └── vite.svg
│
├── shared/
│   └── utils/
│       ├── cn.js
│       └── cn.ts
│
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    │
    ├── assets/
    │   └── react.svg
    │
    ├── context/
    │   └── CartContext.tsx
    │
    ├── features/
    │   ├── cart/
    │   │   ├── cart.types.ts
    │   │   └── useCartStore.ts
    │   │
    │   ├── checkout/
    │   │   ├── checkout.schema.ts
    │   │   ├── CheckoutForm.tsx
    │   │   └── order.api.ts
    │   │
    │   ├── home/
    │   │   ├── FeaturedCategories.tsx
    │   │   ├── FeaturedProducts.tsx
    │   │   ├── HeroBanner.tsx
    │   │   ├── HomeFooter.tsx
    │   │   ├── HomeHeader.tsx
    │   │   └── PromoSection.tsx
    │   │
    │   └── products/
    │       ├── product.api.ts
    │       ├── product.types.ts
    │       ├── ProductCard.stories.tsx
    │       ├── ProductCard.tsx
    │       └── useProducts.ts
    │
    ├── lib/
    │   └── api.ts
    │
    ├── pages/
    │   ├── AdsPage.tsx
    │   ├── BrewGearPage.tsx
    │   ├── CartPage.tsx
    │   ├── CoffeeDetailsPage.tsx
    │   ├── CoffeeListPage.tsx
    │   ├── GiftCardsPage.tsx
    │   ├── HomePage.tsx
    │   └── SubscriptionsPage.tsx
    │
    └── shared/
        ├── components/
        │   ├── FormField.tsx
        │   └── Skeleton.tsx
        │
        └── utils/
            ├── cn.ts
            └── formatCurrency.ts
```

### ملخص المجلدات الرئيسية:

| المجلد | الوصف |
|--------|-------|
| `src/pages` | صفحات التطبيق الرئيسية |
| `src/features` | المكونات والميزات مقسمة حسب المجال (home, products, cart, checkout) |
| `src/shared` | مكونات وأدوات مشتركة |
| `src/context` | React Context للتطبيق |
| `src/lib` | مكتبات وإعدادات API |
| `public` | ملفات ثابتة عامة |
| `shared` | أدوات مساعدة مشتركة (على مستوى الجذر) |

## 8) حالة المشروع حاليا

- dev server يعمل.
- build يعمل بدون أخطاء (`npm run build`).
- Tailwind v4 متصل بشكل صحيح.
- واجهة الصفحة الرئيسية تظهر بدل قالب Vite.

