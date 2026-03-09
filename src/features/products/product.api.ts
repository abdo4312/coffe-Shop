import apiClient from '@/lib/api'
import type { ProductsQuery } from './product.types'

export const productsApi = {
  async list(query: ProductsQuery) {
    const response = await apiClient.get('/products', { params: query })
    return response.data
  },

  async getById(id: string) {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  },

  async search(q: string) {
    const response = await apiClient.get('/products/search', { params: { q } })
    return response.data
  },

  async getCategories() {
    const response = await apiClient.get('/categories')
    return response.data
  },

  async getFeatured() {
    const response = await apiClient.get('/products/featured')
    return response.data
  },
}
