import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, type CheckoutFormData } from './checkout.schema'
import { FormField } from '@/shared/components/FormField'
import { createOrder } from './order.api'
import { cn } from '@/shared/utils/cn'

export function CheckoutForm() {
  const {
    register,            // ربط الـ input بالـ form
    handleSubmit,        // بتعمل validation قبل ما تنادي الـ function
    formState: { errors, isSubmitting },
    watch,               // مراقبة قيمة field معينة
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card',
    }
  })

  const paymentMethod = watch('paymentMethod')
  // لو المستخدم اختار 'card'، بنعرض الـ card fields

  const onSubmit = async (data: CheckoutFormData) => {
    // data هنا مـ validated ومـ typed — مينفعش تبعت بيانات غلط
    try {
      await createOrder(data)
    } catch (err) {
      // معالجة الـ error
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="الاسم الأول"
          error={errors.firstName?.message}
        >
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            {...register('firstName')}
          />
        </FormField>
        <FormField
          label="الاسم الأخير"
          error={errors.lastName?.message}
        >
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            {...register('lastName')}
          />
        </FormField>
      </div>

      <FormField
        label="البريد الإلكتروني"
        error={errors.email?.message}
      >
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg"
          {...register('email')}
        />
      </FormField>

      {/* Payment Method Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">طريقة الدفع</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'card',   label: 'بطاقة ائتمان' },
            { value: 'cod',    label: 'Cash on Delivery' },
            { value: 'wallet', label: 'محفظة إلكترونية' },
          ].map((method) => (
            <label
              key={method.value}
              className={cn(
                "flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer",
                "transition-all duration-200",
                paymentMethod === method.value
                  ? "border-brand bg-brand/10 text-brand font-bold"
                  : "border-neutral-200 hover:border-neutral-400"
              )}
            >
              <input
                type="radio"
                value={method.value}
                className="sr-only"
                {...register('paymentMethod')}
              />
              {method.label}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand text-white font-bold py-4 rounded-xl
                   hover:bg-brand-dark transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'جاري التنفيذ...' : 'إتمام الطلب'}
      </button>
    </form>
  )
}