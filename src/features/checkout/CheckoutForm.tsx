import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, type CheckoutFormData } from './checkout.schema'
import { FormField } from '@/shared/components/FormField'
import { createOrder } from './order.api'
import { cn } from '@/shared/utils/cn'
import { useState } from 'react'  // 🔴 FIX: محتاجينها للـ error state

export function CheckoutForm() {
  // 🔴 FIX: أضفنا error state عشان نعرض رسائل الخطأ للمستخدم
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card',
    }
  })

  const paymentMethod = watch('paymentMethod')

  const onSubmit = async (data: CheckoutFormData) => {
    // 🔴 FIX: مكانش فيه error handling — المستخدم كان بيستنى من غير ما يعرف إيه اللي بيحصل
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      await createOrder(data)
      setSubmitSuccess(true)
    } catch (err: unknown) {
      // 🔴 FIX: بنعرض رسالة خطأ واضحة للمستخدم
      if (err instanceof Error) {
        setSubmitError(err.message)
      } else {
        setSubmitError('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
            { value: 'card', label: 'بطاقة ائتمان' },
            { value: 'cod', label: 'Cash on Delivery' },
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

      {/* 🔴 FIX: رسالة الخطأ — مكانتش موجودة خالص */}
      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      {/* 🔴 FIX: رسالة النجاح */}
      {submitSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✅ تم إرسال طلبك بنجاح!
        </div>
      )}

      {/* 
        🔴 FIX: الزرار كان bg-brand text-white
        brand DEFAULT كان '#f8d9c5' (بيج فاتح جداً) — النص الأبيض كان مش مرئي
        بعد تصليح tailwind.config.js، brand بقى '#5f3a26' (بني داكن) — ده صح مع text-white
      */}
      <button
        type="submit"
        disabled={isSubmitting || submitSuccess}
        className="w-full bg-brand text-white font-bold py-4 rounded-xl
                   hover:bg-brand-dark transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'جاري التنفيذ...' : submitSuccess ? 'تم الطلب ✅' : 'إتمام الطلب'}
      </button>
    </form>
  )
}
