import { z } from 'zod'

// Zod Schema = Type + Validation في نفس الوقت
export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'الاسم الأول لازم يكون حرفين على الأقل'),
  lastName:  z.string().min(2, 'الاسم الأخير لازم يكون حرفين على الأقل'),
  email:     z.string().email('البريد الإلكتروني غير صحيح'),
  phone:     z.string().regex(/^01[0125]\d{8}$/, 'رقم الهاتف غير صحيح'),
  address:   z.string().min(10, 'العنوان لازم يكون 10 أحرف على الأقل'),
  city:      z.string().min(2, 'اختار المدينة'),
  paymentMethod: z.enum(['card', 'cod', 'wallet']).catch('card'),
})

// Extract TypeScript type من الـ schema — مش محتاج تعمل interface منفصل
export type CheckoutFormData = z.infer<typeof checkoutSchema>