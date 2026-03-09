import apiClient from '@/lib/api'
import type { CheckoutFormData } from './checkout.schema'

export async function createOrder(data: CheckoutFormData) {
  const response = await apiClient.post('/orders', data)
  return response.data
}
