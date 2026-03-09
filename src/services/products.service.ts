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
          { id: '1', name: 'Coffee', price: 5, description: 'Hot coffee', imageUrl: 'https://via.placeholder.com/150' },
          { id: '2', name: 'Tea', price: 3, description: 'Green tea', imageUrl: 'https://via.placeholder.com/150' },
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
          name: 'Amazing Coffee',
          price: 10,
          description: 'The best coffee in town.',
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
