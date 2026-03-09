import type { Product } from './product.types'

// هاستخدم الـ tags عشان أحط فيها Roast و Origin
export const mockProducts: Product[] = [
    {
        id: 'colombia-01',
        name: 'Colombian Caramel Roast',
        description: 'Velvety body with toffee finish. A classic choice for coffee lovers who appreciate smooth, sweet flavors.',
        price: 65,
        images: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Single Origin',
        tags: ['medium roast', 'Colombia', 'caramel', 'toffee'],
        rating: 4.8,
        reviewCount: 124,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '250g', stock: 50 },
            { id: 'v2', name: 'Size', value: '500g', stock: 30 }
        ],
        createdAt: '2024-01-15'
    },
    {
        id: 'ethiopia-02',
        name: 'Ethiopian Bloom Beans',
        description: 'Floral aroma and citrus sparkle. Perfect for pour-over enthusiasts.',
        price: 72,
        originalPrice: 85,
        images: [
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Single Origin',
        tags: ['light roast', 'Ethiopia', 'floral', 'citrus', 'new'],
        rating: 4.9,
        reviewCount: 89,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '250g', stock: 25 }
        ],
        createdAt: '2024-02-01'
    },
    {
        id: 'espresso-03',
        name: 'Midnight Espresso Blend',
        description: 'Dark cocoa and smoky sweetness. The foundation of a perfect shot.',
        price: 58,
        images: [
            'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Espresso Blend',
        tags: ['dark roast', 'Blend', 'cocoa', 'espresso'],
        rating: 4.7,
        reviewCount: 256,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '500g', stock: 40 },
            { id: 'v2', name: 'Size', value: '1kg', stock: 15 }
        ],
        createdAt: '2024-01-20'
    },
    {
        id: 'coldbrew-04',
        name: 'Vanilla Cold Brew Pack',
        description: 'Smooth finish for iced coffee days. Pre-ground for optimal cold extraction.',
        price: 45,
        images: [
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Cold Brew',
        tags: ['cold brew', 'Guatemala', 'vanilla', 'iced'],
        rating: 4.6,
        reviewCount: 78,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Pack', value: '3 servings', stock: 60 }
        ],
        createdAt: '2024-01-25'
    },
    {
        id: 'kenya-05',
        name: 'Kenyan Peaberry Reserve',
        description: 'Wine-like acidity with blackcurrant notes. A rare treat for connoisseurs.',
        price: 85,
        images: [
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Single Origin',
        tags: ['light roast', 'Kenya', 'fruity', 'acidic', 'new'],
        rating: 4.9,
        reviewCount: 42,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '200g', stock: 20 }
        ],
        createdAt: '2024-02-05'
    },
    {
        id: 'brazil-06',
        name: 'Brazilian Nutty Delight',
        description: 'Hazelnut and milk chocolate profile. Comfort in every cup.',
        price: 55,
        images: [
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Single Origin',
        tags: ['medium roast', 'Brazil', 'nutty', 'chocolate'],
        rating: 4.5,
        reviewCount: 167,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '250g', stock: 45 }
        ],
        createdAt: '2024-01-10'
    },
    {
        id: 'sumatra-07',
        name: 'Sumatra Dark Majesty',
        description: 'Earthy, spicy with heavy body. For those who like it bold.',
        price: 68,
        images: [
            'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Single Origin',
        tags: ['dark roast', 'Indonesia', 'earthy', 'spicy'],
        rating: 4.6,
        reviewCount: 93,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '250g', stock: 35 }
        ],
        createdAt: '2024-01-18'
    },
    {
        id: 'coldbrew-08',
        name: 'Citrus Cold Brew Box',
        description: 'Bright orange and honey sweetness. Summer in a glass.',
        price: 52,
        images: [
            'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Cold Brew',
        tags: ['cold brew', 'Ethiopia', 'citrus', 'honey'],
        rating: 4.7,
        reviewCount: 61,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Pack', value: '5 servings', stock: 25 }
        ],
        createdAt: '2024-01-28'
    },
    {
        id: 'guatemala-09',
        name: 'Guatemalan Antigua',
        description: 'Spicy with dark cocoa undertones. A Central American classic.',
        price: 62,
        originalPrice: 75,
        images: [
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Single Origin',
        tags: ['medium roast', 'Guatemala', 'spicy', 'cocoa'],
        rating: 4.8,
        reviewCount: 134,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '250g', stock: 40 }
        ],
        createdAt: '2024-01-22'
    },
    {
        id: 'peru-10',
        name: 'Peruvian Organic Select',
        description: 'Clean, mild with nutty finish. Certified organic goodness.',
        price: 70,
        images: [
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Single Origin',
        tags: ['light roast', 'Peru', 'organic', 'clean'],
        rating: 4.6,
        reviewCount: 56,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '250g', stock: 30 }
        ],
        createdAt: '2024-02-03'
    },
    {
        id: 'italy-11',
        name: 'Italian Roast Classic',
        description: 'Intense, smoky with burnt sugar. Traditional Italian espresso style.',
        price: 48,
        images: [
            'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Espresso Blend',
        tags: ['dark roast', 'Blend', 'smoky', 'intense'],
        rating: 4.4,
        reviewCount: 189,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '500g', stock: 50 }
        ],
        createdAt: '2024-01-12'
    },
    {
        id: 'honduras-12',
        name: 'Honduras Honey Process',
        description: 'Sweet, syrupy with berry notes. Unique honey processing method.',
        price: 75,
        images: [
            'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
        ],
        category: 'Single Origin',
        tags: ['medium roast', 'Honduras', 'honey', 'berry', 'new'],
        rating: 4.8,
        reviewCount: 38,
        inStock: true,
        variants: [
            { id: 'v1', name: 'Size', value: '250g', stock: 22 }
        ],
        createdAt: '2024-02-08'
    }
]