// API client functions for making requests to our backend

const API_BASE = '/api'

// Generic API request function
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
    ): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        },
        ...options,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
}

// Product API functions
export const productApi = {
    getAll: () => apiRequest('/products'),
    getById: (id: string) => apiRequest(`/products/${id}`),
    create: (data: any) => apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiRequest(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiRequest(`/products/${id}`, {
        method: 'DELETE',
    }),
}

// Category API functions
export const categoryApi = {
    getAll: () => apiRequest('/categories'),
    getById: (id: string) => apiRequest(`/categories/${id}`),
    create: (data: any) => apiRequest('/categories', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiRequest(`/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiRequest(`/categories/${id}`, {
        method: 'DELETE',
    }),
}

// Menu Item API functions
export const menuItemApi = {
    getAll: () => apiRequest('/menu-items'),
    getById: (id: string) => apiRequest(`/menu-items/${id}`),
    create: (data: any) => apiRequest('/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiRequest(`/menu-items/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiRequest(`/menu-items/${id}`, {
        method: 'DELETE',
    }),
}

// FAQ API functions
export const faqApi = {
    getAll: () => apiRequest('/faqs'),
    getById: (id: string) => apiRequest(`/faqs/${id}`),
    create: (data: any) => apiRequest('/faqs', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiRequest(`/faqs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiRequest(`/faqs/${id}`, {
        method: 'DELETE',
    }),
}

// Misc Content API functions
export const miscContentApi = {
    getAll: (section?: string) => {
        const url = section ? `/misc-content?section=${encodeURIComponent(section)}` : '/misc-content'
        return apiRequest(url)
    },
    getById: (id: string) => apiRequest(`/misc-content/${id}`),
    create: (data: any) => apiRequest('/misc-content', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiRequest(`/misc-content/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiRequest(`/misc-content/${id}`, {
        method: 'DELETE',
    }),
}

// Type definitions for better TypeScript support
export interface Product {
    id: string
    title: string
    description: string
    mainImageUrl: string
    badgeText?: string
    badgeColor?: string
    badgeIcon?: string
    categoryId?: string
    category?: Category
    menuItems: MenuItem[]
    createdAt: string
}

export interface Category {
    id: string
    name: string
    products: Product[]
    menuItems: MenuItem[]
}

export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    productId?: string | null
    categoryId?: string | null
    product?: Product
    category?: Category
}

export interface FAQ {
    id: string
    question: string
    answer: string
    createdAt: string
}

export interface MiscContent {
    id: string
    section: string
    imageUrl?: string | null
    icon?: string | null
    largeText?: string | null
    smallText?: string | null
    message?: string | null
    createdAt: string
} 