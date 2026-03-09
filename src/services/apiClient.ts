import axios from 'axios';

// إنشاء نسخة من Axios مع الإعدادات الأساسية
const apiClient = axios.create({
  // استخدام المتغير البيئي للرابط الأساسي
  // إذا لم يكن موجوداً، سيتم استخدام الرابط المحلي للتجربة
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // يمكنك تحديد مدة زمنية قصوى للطلب (اختياري)
  // timeout: 10000,
});

// اختياري: إضافة Interceptor للطلبات
// هذا مفيد جداً لإضافة رمز المصادقة (Token) تلقائياً مع كل طلب للـ Backend
apiClient.interceptors.request.use(
  (config) => {
    // مثال: جلب الـ Token من الـ localStorage
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// اختياري: إضافة Interceptor للاستجابة
// مفيد للتعامل مع الأخطاء العامة مثل 401 (غير مصرح) في مكان واحد
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // يمكنك إرجاع جزء البيانات فقط لتسهيل الاستخدام لاحقاً
  },
  (error) => {
    // مثال: التعامل مع خطأ 401 بتسجيل خروج المستخدم
    // if (error.response?.status === 401) {
    //   localStorage.removeItem('token');
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default apiClient;
