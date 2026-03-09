# 🚀 دليل ربط الـ Frontend مع الـ Backend (API Integration)

هذا الدليل يشرح كيف تم إعداد المشروع للتواصل مع الـ Backend بسهولة واحترافية باستخدام `axios`. 

تم تجهيز البنية التحتية لتكون جاهزة تماماً للعمل بمجرد أن ينتهي مطور الـ Backend من بناء الـ APIs. حالياً، يتم استخدام "بيانات وهمية" (Mocked Data) حتى لا يتوقف العمل في الـ Frontend.

---

## 📂 هيكل الملفات الذي تم إضافته:

1. **`.env`**: ملف الإعدادات البيئية (في المجلد الرئيسي للمشروع).
2. **`src/services/apiClient.ts`**: المركز الرئيسي لإعدادات `axios`.
3. **`src/services/products.service.ts`**: مثال لكيفية كتابة دوال الـ API الخاصة بقسم معين (مثل المنتجات).

---

## 🛠️ الخطوة 1: عند استلام الـ APIs من مطور الـ Backend (لحظة التفعيل)

عندما يكون الـ Backend جاهزاً، كل ما عليك فعله هو التعديل في مكانين فقط:

### 1. تعديل الرابط الأساسي (Base URL)
افتح ملف `.env` في المجلد الرئيسي وغير الرابط للرابط الحقيقي:
```env
VITE_API_BASE_URL=http://localhost:8000/api  # (مثلاً، رابط الباك إند الحقيقي)
```

### 2. إزالة البيانات الوهمية من ملفات الـ Services
افتح أي ملف داخل `src/services` (مثل `products.service.ts`)، وقم بإلغاء التعليق (Uncomment) عن الكود الحقيقي، واحذف كود الـ Mock:

**قبل التعديل (الوضع الحالي - بيانات وهمية):**
```typescript
  getAllProducts: async (): Promise<Product[]> => {
    // return apiClient.get('/products'); <-- الكود الحقيقي معطل
    return new Promise((resolve) => { ... // بيانات وهمية });
  }
```

**بعد التعديل (الوضع النهائي - ربط حقيقي):**
```typescript
  getAllProducts: async (): Promise<Product[]> => {
    return apiClient.get('/products'); // الان هو متصل بالـ Backend الحقيقي!
  }
```

---

## 🤝 الخطوة 2: كيفية استخدام هذه الدوال داخل الـ Components (React)

لكي تعرض البيانات في أي صفحة أو Component، قم باستدعاء الدالة من الـ Service كما يلي:

```tsx
import { useEffect, useState } from 'react';
import { productsService, Product } from '../services/products.service';

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. استدعاء الدالة
    productsService.getAllProducts()
      .then((data) => {
        setProducts(data); // 2. تخزين البيانات في الـ State
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
      })
      .finally(() => {
        setLoading(false); // 3. إنهاء حالة التحميل
      });
  }, []);

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <div>
      <h1>المنتجات</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
```

---

## 🔐 إضافة الـ Token (تسجيل الدخول / Authentication)

عندما تقومان ببرمجة نظام تسجيل الدخول لاحقاً، ستحتاج لإرسال `Token` مع كل طلب للـ Backend للتأكد من هوية المستخدم.
لا تحتاج لإضافته في كل دالة!

اذهب إلى ملف `src/services/apiClient.ts`، ستجد جزءاً مجهزاً ومكتوباً داخل تعليقات يسمى `interceptors.request`. فقط قم بإزالة التعليقات وعدله ليجلب الـ Token من المكان الذي تحفظه فيه (مثلاً `localStorage` أو `zustand`).

```typescript
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // اجلب التوكن
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; // أضفه لكل الطلبات
    }
    return config;
  },
  // ...
);
```

---

## 💡 نصائح إضافية:
- **التنظيم:** قم بإنشاء ملف لكل قسم، مثال: `users.service.ts` للمستخدمين، `orders.service.ts` للطلبات.
- **التسميات:** اتفق دائماً مع مطور الـ Backend على أسماء المتغيرات في البيانات (JSON) لتتطابق مع الـ Types (Interfaces) التي تكتبها في الـ TypeScript.
