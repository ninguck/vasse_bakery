import { NextRequest } from 'next/server'
import { testDb } from './test-db'

// Mock NextRequest for testing
export function createMockRequest(
  method: string = 'GET',
  body?: any,
  url: string = 'http://localhost:3000'
): NextRequest {
  const request = new NextRequest(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return request
}

// Helper to make API requests in tests
export async function makeApiRequest(
  endpoint: string,
  method: string = 'GET',
  body?: any
) {
  const url = `http://localhost:3000/api${endpoint}`
  const request = createMockRequest(method, body, url)
  
  // Import the handler dynamically based on the endpoint
  let handler: any
  
  if (endpoint === '/products') {
    const { GET, POST } = require('@/app/api/products/route')
    handler = method === 'GET' ? GET : POST
  } else if (endpoint.startsWith('/products/')) {
    const { GET, PUT, DELETE } = require('@/app/api/products/[id]/route')
    const id = endpoint.split('/').pop()
    handler = method === 'GET' ? GET : method === 'PUT' ? PUT : DELETE
    return handler(request, { params: { id } })
  } else if (endpoint === '/categories') {
    const { GET, POST } = require('@/app/api/categories/route')
    handler = method === 'GET' ? GET : POST
  } else if (endpoint.startsWith('/categories/')) {
    const { GET, PUT, DELETE } = require('@/app/api/categories/[id]/route')
    const id = endpoint.split('/').pop()
    handler = method === 'GET' ? GET : method === 'PUT' ? PUT : DELETE
    return handler(request, { params: { id } })
  } else if (endpoint === '/menu-items') {
    const { GET, POST } = require('@/app/api/menu-items/route')
    handler = method === 'GET' ? GET : POST
  } else if (endpoint.startsWith('/menu-items/')) {
    const { GET, PUT, DELETE } = require('@/app/api/menu-items/[id]/route')
    const id = endpoint.split('/').pop()
    handler = method === 'GET' ? GET : method === 'PUT' ? PUT : DELETE
    return handler(request, { params: { id } })
  } else if (endpoint === '/faqs') {
    const { GET, POST } = require('@/app/api/faqs/route')
    handler = method === 'GET' ? GET : POST
  } else if (endpoint.startsWith('/faqs/')) {
    const { GET, PUT, DELETE } = require('@/app/api/faqs/[id]/route')
    const id = endpoint.split('/').pop()
    handler = method === 'GET' ? GET : method === 'PUT' ? PUT : DELETE
    return handler(request, { params: { id } })
  }
  
  return handler(request)
}

// Helper to create test data
export const testUtils = {
  // Create a test category
  async createTestCategory(name: string = 'Test Category') {
    return await testDb.client.category.create({
      data: { name },
    })
  },

  // Create a test product
  async createTestProduct(data?: Partial<any> & { categoryId?: string }) {
    const defaultData = {
      title: 'Test Product',
      description: 'Test Description',
      imageUrl: 'https://example.com/image.jpg',
      ...data,
    }
    
    return await testDb.client.product.create({
      data: defaultData,
      include: {
        category: true,
        menuItems: true,
      },
    })
  },

  // Create a test menu item
  async createTestMenuItem(data?: Partial<any>) {
    // Always create a new category for the menu item to avoid foreign key issues
    const category = await this.createTestCategory()
    
    const defaultData: any = {
      name: 'Test Menu Item',
      description: 'Test Description',
      price: 9.99,
      categoryId: category.id,
      ...data,
    }
    
    // If productId is provided, ensure the product exists
    if (defaultData.productId) {
      const product = await testDb.client.product.findUnique({
        where: { id: defaultData.productId },
      })
      if (!product) {
        // Create a product if it doesn't exist
        const newProduct = await this.createTestProduct()
        defaultData.productId = newProduct.id
      }
    }
    
    return await testDb.client.menuItem.create({
      data: defaultData,
      include: {
        product: true,
        category: true,
      },
    })
  },

  // Create a test FAQ
  async createTestFAQ(data?: Partial<any>) {
    const defaultData = {
      question: 'Test Question?',
      answer: 'Test Answer',
      ...data,
    }
    
    return await testDb.client.fAQ.create({
      data: defaultData,
    })
  },
}

// Helper to validate response structure
export function validateProductResponse(product: any) {
  expect(product).toHaveProperty('id')
  expect(product).toHaveProperty('title')
  expect(product).toHaveProperty('description')
  expect(product).toHaveProperty('imageUrl')
  expect(product).toHaveProperty('createdAt')
  expect(typeof product.id).toBe('string')
  expect(typeof product.title).toBe('string')
  expect(typeof product.description).toBe('string')
  expect(typeof product.imageUrl).toBe('string')
}

export function validateCategoryResponse(category: any) {
  expect(category).toHaveProperty('id')
  expect(category).toHaveProperty('name')
  expect(typeof category.id).toBe('string')
  expect(typeof category.name).toBe('string')
}

export function validateMenuItemResponse(menuItem: any) {
  expect(menuItem).toHaveProperty('id')
  expect(menuItem).toHaveProperty('name')
  expect(menuItem).toHaveProperty('description')
  expect(menuItem).toHaveProperty('price')
  expect(typeof menuItem.id).toBe('string')
  expect(typeof menuItem.name).toBe('string')
  expect(typeof menuItem.description).toBe('string')
  expect(typeof menuItem.price).toBe('number')
}

export function validateFAQResponse(faq: any) {
  expect(faq).toHaveProperty('id')
  expect(faq).toHaveProperty('question')
  expect(faq).toHaveProperty('answer')
  expect(faq).toHaveProperty('createdAt')
  expect(typeof faq.id).toBe('string')
  expect(typeof faq.question).toBe('string')
  expect(typeof faq.answer).toBe('string')
} 