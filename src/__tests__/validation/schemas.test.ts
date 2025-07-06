import { z } from 'zod'
import { 
  createProductSchema, 
  updateProductSchema 
} from '@/backend/validations/schemas/products'
import { 
  createMenuItemSchema, 
  updateMenuItemSchema 
} from '@/backend/validations/schemas/menu-items'
import { 
  createCategorySchema, 
  updateCategorySchema 
} from '@/backend/validations/schemas/categories'
import { 
  createFaqSchema, 
  updateFaqSchema 
} from '@/backend/validations/schemas/faqs'

describe('Zod Schema Validation', () => {
  describe('Product Schema', () => {
    describe('Create Product Schema', () => {
      it('should validate valid product data', () => {
        const validData = {
          title: 'Chocolate Cake',
          description: 'Delicious chocolate cake with rich frosting',
          imageUrl: 'https://example.com/chocolate-cake.jpg',
          badgeText: 'New',
          badgeColor: '#FF0000',
          badgeIcon: 'star',
          categoryId: '123e4567-e89b-12d3-a456-426614174000'
        }
        const result = createProductSchema.safeParse(validData)
        expect(result.success).toBe(true)
        if (result.success) {
          expect(result.data).toEqual(validData)
        }
      })

      it('should validate product data without optional fields', () => {
        const validData = {
          title: 'Vanilla Cake',
          description: 'Classic vanilla cake',
          imageUrl: 'https://example.com/vanilla-cake.jpg'
        }
        const result = createProductSchema.safeParse(validData)
        expect(result.success).toBe(true)
        if (result.success) {
          expect(result.data).toEqual(validData)
        }
      })

      it('should reject missing required fields', () => {
        const invalidData = {
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg'
        }
        const result = createProductSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors).toHaveLength(1)
          expect(result.error.errors[0].path).toEqual(['title'])
          expect(result.error.errors[0].message).toBe('Title is required')
        }
      })

      it('should reject empty title', () => {
        const invalidData = {
          title: '',
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg'
        }
        const result = createProductSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Title is required')
        }
      })

      it('should reject title longer than 100 characters', () => {
        const invalidData = {
          title: 'A'.repeat(101),
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg'
        }
        const result = createProductSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Title must be less than 100 characters')
        }
      })

      it('should reject invalid image URL', () => {
        const invalidData = {
          title: 'Test Product',
          description: 'Test description',
          imageUrl: 'not-a-valid-url'
        }
        const result = createProductSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Valid image URL is required')
        }
      })

      it('should reject invalid category ID format', () => {
        const invalidData = {
          title: 'Test Product',
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg',
          categoryId: 'invalid-uuid'
        }
        const result = createProductSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Invalid category ID format')
        }
      })

      it('should accept valid UUID for category ID', () => {
        const validData = {
          title: 'Test Product',
          description: 'Test description',
          imageUrl: 'https://example.com/image.jpg',
          categoryId: '123e4567-e89b-12d3-a456-426614174000'
        }
        const result = createProductSchema.safeParse(validData)
        expect(result.success).toBe(true)
      })
    })

    describe('Update Product Schema', () => {
      it('should allow partial updates', () => {
        const partialData = {
          title: 'Updated Title'
        }
        const result = updateProductSchema.safeParse(partialData)
        expect(result.success).toBe(true)
      })

      it('should validate all fields when provided', () => {
        const fullData = {
          title: 'Updated Title',
          description: 'Updated description',
          imageUrl: 'https://example.com/updated.jpg',
          badgeText: 'Updated',
          badgeColor: '#00FF00',
          badgeIcon: 'updated',
          categoryId: '123e4567-e89b-12d3-a456-426614174000'
        }
        const result = updateProductSchema.safeParse(fullData)
        expect(result.success).toBe(true)
      })

      it('should reject invalid data even in partial updates', () => {
        const invalidData = {
          title: '',
          imageUrl: 'invalid-url'
        }
        const result = updateProductSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors).toHaveLength(2)
        }
      })
    })
  })

  describe('Menu Item Schema', () => {
    describe('Create Menu Item Schema', () => {
      it('should validate valid menu item data', () => {
        const validData = {
          name: 'Chocolate Cake Slice',
          description: 'A slice of our famous chocolate cake',
          price: 5.99,
          productId: '123e4567-e89b-12d3-a456-426614174000',
          categoryId: '123e4567-e89b-12d3-a456-426614174001'
        }
        const result = createMenuItemSchema.safeParse(validData)
        expect(result.success).toBe(true)
      })

      it('should validate menu item without optional fields', () => {
        const validData = {
          name: 'Vanilla Cake Slice',
          description: 'A slice of vanilla cake',
          price: 4.99
        }
        const result = createMenuItemSchema.safeParse(validData)
        expect(result.success).toBe(true)
      })

      it('should reject missing required fields', () => {
        const invalidData = {
          description: 'Test description',
          price: 5.99
        }
        const result = createMenuItemSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].path).toEqual(['name'])
          expect(result.error.errors[0].message).toBe('Name is required')
        }
      })

      it('should reject negative price', () => {
        const invalidData = {
          name: 'Test Item',
          description: 'Test description',
          price: -1
        }
        const result = createMenuItemSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Price must be positive')
        }
      })

      it('should reject price less than 0.01', () => {
        const invalidData = {
          name: 'Test Item',
          description: 'Test description',
          price: 0.005
        }
        const result = createMenuItemSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Price must be at least 0.01')
        }
      })

      it('should reject description longer than 300 characters', () => {
        const invalidData = {
          name: 'Test Item',
          description: 'A'.repeat(301),
          price: 5.99
        }
        const result = createMenuItemSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Description must be less than 300 characters')
        }
      })
    })

    describe('Update Menu Item Schema', () => {
      it('should allow partial updates', () => {
        const partialData = {
          name: 'Updated Name'
        }
        const result = updateMenuItemSchema.safeParse(partialData)
        expect(result.success).toBe(true)
      })

      it('should validate price updates', () => {
        const validData = {
          price: 6.99
        }
        const result = updateMenuItemSchema.safeParse(validData)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('Category Schema', () => {
    describe('Create Category Schema', () => {
      it('should validate valid category data', () => {
        const validData = {
          name: 'Cakes'
        }
        const result = createCategorySchema.safeParse(validData)
        expect(result.success).toBe(true)
      })

      it('should reject empty name', () => {
        const invalidData = {
          name: ''
        }
        const result = createCategorySchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Name is required')
        }
      })

      it('should reject name longer than 50 characters', () => {
        const invalidData = {
          name: 'A'.repeat(51)
        }
        const result = createCategorySchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Name must be less than 50 characters')
        }
      })
    })

    describe('Update Category Schema', () => {
      it('should allow partial updates', () => {
        const partialData = {
          name: 'Updated Category'
        }
        const result = updateCategorySchema.safeParse(partialData)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('FAQ Schema', () => {
    describe('Create FAQ Schema', () => {
      it('should validate valid FAQ data', () => {
        const validData = {
          question: 'What are your opening hours?',
          answer: 'We are open Monday to Friday, 8 AM to 6 PM.'
        }
        const result = createFaqSchema.safeParse(validData)
        expect(result.success).toBe(true)
      })

      it('should reject missing question', () => {
        const invalidData = {
          answer: 'Test answer'
        }
        const result = createFaqSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].path).toEqual(['question'])
          expect(result.error.errors[0].message).toBe('Question is required')
        }
      })

      it('should reject missing answer', () => {
        const invalidData = {
          question: 'Test question?'
        }
        const result = createFaqSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].path).toEqual(['answer'])
          expect(result.error.errors[0].message).toBe('Answer is required')
        }
      })

      it('should reject question longer than 200 characters', () => {
        const invalidData = {
          question: 'A'.repeat(201),
          answer: 'Test answer'
        }
        const result = createFaqSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Question must be less than 200 characters')
        }
      })

      it('should reject answer longer than 1000 characters', () => {
        const invalidData = {
          question: 'Test question?',
          answer: 'A'.repeat(1001)
        }
        const result = createFaqSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Answer must be less than 1000 characters')
        }
      })
    })

    describe('Update FAQ Schema', () => {
      it('should allow partial updates', () => {
        const partialData = {
          question: 'Updated question?'
        }
        const result = updateFaqSchema.safeParse(partialData)
        expect(result.success).toBe(true)
      })
    })
  })
}) 