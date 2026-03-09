import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard } from './ProductCard'

// Meta: معلومات عن الـ Component
const meta: Meta<typeof ProductCard> = {
  title: 'Features/Products/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],  // بتولد docs تلقائياً من الـ JSDoc
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock Data
const mockProduct = {
  id: '1',
  name: 'حذاء رياضي نايك Air Max',
  price: 1299,
  originalPrice: 1799,
  images: ['/mock/shoe.jpg'],
  category: 'أحذية',
  rating: 4.5,
  reviewCount: 128,
  inStock: true,
  variants: [],
  tags: [],
  description: '...',
  createdAt: '2024-01-01',
}

// Stories — كل الـ states الممكنة
export const Default: Story = {
  args: { product: mockProduct },
}

export const OutOfStock: Story = {
  args: {
    product: { ...mockProduct, inStock: false }
  },
}

export const WithDiscount: Story = {
  args: {
    product: { ...mockProduct, originalPrice: 2000 }
  },
}

export const LongName: Story = {
  args: {
    product: {
      ...mockProduct,
      name: 'حذاء رياضي نايك Air Max 270 مقاس كبير بألوان متعددة للرياضة والتسلية'
    }
  },
  // بنشوف إزاي بيتعامل مع الـ long text
}