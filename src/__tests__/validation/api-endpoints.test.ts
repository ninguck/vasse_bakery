import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/products/route'
import { PUT, DELETE } from '@/app/api/products/[id]/route'
import { GET as getCategories, POST as createCategory } from '@/app/api/categories/route'
import { PUT as updateCategory, DELETE as deleteCategory } from '@/app/api/categories/[id]/route'
import { GET as getMenuItems, POST as createMenuItem } from '@/app/api/menu-items/route'
import { PUT as updateMenuItem, DELETE as deleteMenuItem } from '@/app/api/menu-items/[id]/route'
import { GET as getFaqs, POST as createFaq } from '@/app/api/faqs/route'
import { PUT as updateFaq, DELETE as deleteFaq } from '@/app/api/faqs/[id]/route'

// Mock the database operations
jest.mock('@/backend/database', () => ({
  db: {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    category: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    menuItem: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    faq: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}))

describe('API Endpoint Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const createMockRequest = (method: string, body?: any, params?: any) => {
    const url = new URL('http://localhost:3000/api/products')
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value as string)
      })
    }
    
    return new NextRequest(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  describe('Products API', () => {
    describe('POST /api/products', () => {
      it('should accept valid product data', async () => {
        const validData = {
          title: 'Test Product',
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg'
        }
        
        const request = createMockRequest('POST', validData)
        const response = await POST(request)
        
        expect(response.status).toBe(201)
      })

      it('should reject product with missing title', async () => {
        const invalidData = {
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await POST(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'title')).toBe(true)
      })

      it('should reject product with invalid image URL', async () => {
        const invalidData = {
          title: 'Test Product',
          description: 'Test description',
          imageUrl: 'not-a-valid-url'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await POST(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'imageUrl')).toBe(true)
      })

      it('should reject product with empty title', async () => {
        const invalidData = {
          title: '',
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await POST(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'title')).toBe(true)
      })

      it('should reject product with title too long', async () => {
        const invalidData = {
          title: 'A'.repeat(101), // Over 100 characters
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await POST(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'title')).toBe(true)
      })
    })

    describe('PUT /api/products/[id]', () => {
      it('should accept valid partial update data', async () => {
        const validData = {
          title: 'Updated Product'
        }
        
        const request = createMockRequest('PUT', validData)
        const response = await PUT(request, { params: { id: '1' } })
        
        // Note: This might return 404 if product doesn't exist, but validation should pass
        expect(response.status).not.toBe(400)
      })

      it('should reject update with invalid image URL', async () => {
        const invalidData = {
          imageUrl: 'invalid-url'
        }
        
        const request = createMockRequest('PUT', invalidData)
        const response = await PUT(request, { params: { id: '1' } })
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'imageUrl')).toBe(true)
      })
    })
  })

  describe('Categories API', () => {
    describe('POST /api/categories', () => {
      it('should accept valid category data', async () => {
        const validData = {
          name: 'Test Category',
          description: 'Test category description'
        }
        
        const request = createMockRequest('POST', validData)
        const response = await createCategory(request)
        
        expect(response.status).toBe(201)
      })

      it('should reject category with missing name', async () => {
        const invalidData = {
          description: 'Test category description'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await createCategory(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'name')).toBe(true)
      })

      it('should reject category with empty name', async () => {
        const invalidData = {
          name: '',
          description: 'Test category description'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await createCategory(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'name')).toBe(true)
      })
    })
  })

  describe('Menu Items API', () => {
    describe('POST /api/menu-items', () => {
      it('should accept valid menu item data', async () => {
        const validData = {
          name: 'Test Menu Item',
          description: 'Test menu item description',
          price: 9.99,
          categoryId: '1'
        }
        
        const request = createMockRequest('POST', validData)
        const response = await createMenuItem(request)
        
        expect(response.status).toBe(201)
      })

      it('should reject menu item with missing name', async () => {
        const invalidData = {
          description: 'Test menu item description',
          price: 9.99,
          categoryId: '1'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await createMenuItem(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'name')).toBe(true)
      })

      it('should reject menu item with invalid price', async () => {
        const invalidData = {
          name: 'Test Menu Item',
          description: 'Test menu item description',
          price: -5.00, // Negative price
          categoryId: '1'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await createMenuItem(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'price')).toBe(true)
      })

      it('should reject menu item with missing categoryId', async () => {
        const invalidData = {
          name: 'Test Menu Item',
          description: 'Test menu item description',
          price: 9.99
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await createMenuItem(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'categoryId')).toBe(true)
      })
    })
  })

  describe('FAQs API', () => {
    describe('POST /api/faqs', () => {
      it('should accept valid FAQ data', async () => {
        const validData = {
          question: 'What is your return policy?',
          answer: 'We accept returns within 30 days of purchase.'
        }
        
        const request = createMockRequest('POST', validData)
        const response = await createFaq(request)
        
        expect(response.status).toBe(201)
      })

      it('should reject FAQ with missing question', async () => {
        const invalidData = {
          answer: 'We accept returns within 30 days of purchase.'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await createFaq(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'question')).toBe(true)
      })

      it('should reject FAQ with missing answer', async () => {
        const invalidData = {
          question: 'What is your return policy?'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await createFaq(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'answer')).toBe(true)
      })

      it('should reject FAQ with empty question', async () => {
        const invalidData = {
          question: '',
          answer: 'We accept returns within 30 days of purchase.'
        }
        
        const request = createMockRequest('POST', invalidData)
        const response = await createFaq(request)
        
        expect(response.status).toBe(400)
        const body = await response.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details.some((error: any) => error.field === 'question')).toBe(true)
      })
    })
  })

  describe('Error Response Format', () => {
    it('should return consistent error format for all endpoints', async () => {
      const invalidData = {
        // Missing required fields
      }
      
      const endpoints = [
        { method: POST, name: 'products' },
        { method: createCategory, name: 'categories' },
        { method: createMenuItem, name: 'menu-items' },
        { method: createFaq, name: 'faqs' }
      ]
      
      for (const endpoint of endpoints) {
        const request = createMockRequest('POST', invalidData)
        const response = await endpoint.method(request)
        
        if (response.status === 400) {
          const body = await response.json()
          expect(body).toHaveProperty('error')
          expect(body).toHaveProperty('details')
          expect(body.error).toBe('Validation failed')
          expect(Array.isArray(body.details)).toBe(true)
          
          body.details.forEach((detail: any) => {
            expect(detail).toHaveProperty('field')
            expect(detail).toHaveProperty('message')
            expect(typeof detail.field).toBe('string')
            expect(typeof detail.message).toBe('string')
          })
        }
      }
    })
  })

  describe('Edge Cases', () => {
    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('should handle empty request body', async () => {
      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('should handle null request body', async () => {
      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: 'null',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const response = await POST(request)
      expect(response.status).toBe(400)
    })
  })
}) 