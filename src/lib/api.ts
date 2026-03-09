// src/lib/api.ts
import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor: بضيف الـ token لكل request تلقائياً
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor: معالجة الـ errors بشكل مركزي
api.interceptors.response.use(
  (response) => response.data,  // بنرجع data مباشرة
  (error: any) => {
    if (error.response?.status === 401) {
      // مش logged in — redirect للـ login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
