import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { productsApi } from './product.api'
import type { ProductsQuery, PaginatedResponse, Product } from './product.types'

export function useProducts() {
  // قراءة الفلاتر من الـ URL
  const [searchParams, setSearchParams] = useSearchParams()

  const query: ProductsQuery = {
    page:     Number(searchParams.get('page')) || 1,
    category: searchParams.get('category') ?? undefined,
    search:   searchParams.get('q') ?? undefined,
    sortBy:   (searchParams.get('sort') as ProductsQuery['sortBy']) ?? undefined,
  }

  const result = useQuery({
    // queryKey: لو تغير أي حاجة فيه، React Query تعمل refetch تلقائياً
    queryKey: ['products', query],
    queryFn: () => productsApi.list(query),
    staleTime: 1000 * 60 * 5,  // 5 دقايق — الـ data مش محتاجة refetch كل شوية
    placeholderData: (prev: PaginatedResponse<Product> | undefined) => prev,  // Smooth transition بين الـ pages
  })

  // Functions لتغيير الفلاتر
  const setFilter = (key: string, value: string | null) => {
    setSearchParams((prev: URLSearchParams) => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      next.delete('page')  // reset الـ page لما الفلتر يتغير
      return next
    })
  }

  return {
    products:   result.data?.data ?? [],
    pagination: result.data,
    isLoading:  result.isLoading,
    isFetching: result.isFetching,  // loading بين الـ pages
    error:      result.error,
    query,
    setFilter,
  }
}