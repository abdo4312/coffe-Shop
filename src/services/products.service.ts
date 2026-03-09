import apiClient from './apiClient';

// تعريف أنواع البيانات (Types) الخاصة بك
export interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

export const productsService = {
  // 1. جلب كل المنتجات
  getAllProducts: async (): Promise<Product[]> => {
    // الكود الحقيقي (عندما يكون الـ Backend جاهزاً):
    // return apiClient.get('/products');

    // كود وهمي (مؤقت، لتتمكن من العمل على الـ Frontend):
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'قهوة', price: 5, description: 'قهوة ساخنة', imageUrl: 'https://via.placeholder.com/150' },
          { id: '2', name: 'شاي', price: 3, description: 'شاي أخضر', imageUrl: 'https://via.placeholder.com/150' },
        ]);
      }, 1000); // تأخير ثانية واحدة لمحاكاة طلب الشبكة
    });
  },

  // 2. جلب منتج واحد باستخدام الـ ID
  getProductById: async (id: string): Promise<Product> => {
    // الكود الحقيقي:
    // return apiClient.get(`/products/${id}`);

    // كود وهمي:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: 'قهوة مميزة',
          price: 10,
          description: 'أفضل قهوة في المدينة.',
        });
      }, 500);
    });
  },

  // 3. إنشاء منتج جديد (مثال على طلب POST)
  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    // الكود الحقيقي:
    // return apiClient.post('/products', productData);

    // كود وهمي:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(), // إنشاء ID وهمي
          ...productData,
        });
      }, 800);
    });
  },
};
