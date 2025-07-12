import { z } from 'zod'
import { NextResponse } from 'next/server'
import { validateRequest, createValidationError } from '@/backend/validations/utils'

describe('Validation Utils', () => {
  describe('validateRequest', () => {
    const testSchema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      age: z.number().min(18, 'Must be at least 18 years old').optional()
    })

    it('should return success for valid data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      }
      
      const result = validateRequest(testSchema, validData)
      
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    it('should return success for valid data without optional fields', () => {
      const validData = {
        name: 'Jane Doe',
        email: 'jane@example.com'
      }
      
      const result = validateRequest(testSchema, validData)
      
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    it('should return error for missing required fields', async () => {
      const invalidData = {
        email: 'john@example.com'
        // Missing name
      }
      
      const result = validateRequest(testSchema, invalidData)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(NextResponse)
        expect(result.error.status).toBe(400)
        
        const body = await result.error.json()
        expect(body.error).toBe('Validation failed')
        expect(body.details).toHaveLength(1)
        expect(body.details[0].field).toBe('name')
        expect(body.details[0].message).toBe('Name is required')
      }
    })

    it('should return error for invalid email format', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email'
      }
      
      const result = validateRequest(testSchema, invalidData)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        const body = await result.error.json()
        expect(body.details[0].field).toBe('email')
        expect(body.details[0].message).toBe('Invalid email format')
      }
    })

    it('should return error for multiple validation failures', async () => {
      const invalidData = {
        name: '', // Empty name
        email: 'invalid-email', // Invalid email
        age: 15 // Too young
      }
      
      const result = validateRequest(testSchema, invalidData)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        const body = await result.error.json()
        expect(body.details).toHaveLength(3)
        
        const fieldNames = body.details.map((error: any) => error.field)
        expect(fieldNames).toContain('name')
        expect(fieldNames).toContain('email')
        expect(fieldNames).toContain('age')
      }
    })

    it('should handle nested object validation', async () => {
      const nestedSchema = z.object({
        user: z.object({
          name: z.string().min(1, 'Name is required'),
          profile: z.object({
            bio: z.string().max(100, 'Bio too long')
          })
        })
      })
      
      const invalidData = {
        user: {
          name: '',
          profile: {
            bio: 'A'.repeat(101)
          }
        }
      }
      
      const result = validateRequest(nestedSchema, invalidData)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        const body = await result.error.json()
        expect(body.details).toHaveLength(2)
        
        const paths = body.details.map((error: any) => error.field)
        expect(paths).toContain('user.name')
        expect(paths).toContain('user.profile.bio')
      }
    })

    it('should handle array validation', async () => {
      const arraySchema = z.object({
        tags: z.array(z.string().min(1, 'Tag cannot be empty')).min(1, 'At least one tag required')
      })
      
      const invalidData = {
        tags: ['', 'valid-tag'] // One empty tag
      }
      
      const result = validateRequest(arraySchema, invalidData)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        const body = await result.error.json()
        expect(body.details[0].field).toBe('tags.0')
        expect(body.details[0].message).toBe('Tag cannot be empty')
      }
    })

    it('should handle empty object', async () => {
      const emptyData = {}
      
      const result = validateRequest(testSchema, emptyData)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        const body = await result.error.json()
        expect(body.details).toHaveLength(2) // name and email are required
      }
    })

    it('should handle null data', async () => {
      const result = validateRequest(testSchema, null)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        const body = await result.error.json()
        expect(body.details).toHaveLength(2)
      }
    })

    it('should handle undefined data', async () => {
      const result = validateRequest(testSchema, undefined)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        const body = await result.error.json()
        expect(body.details).toHaveLength(2)
      }
    })
  })

  describe('createValidationError', () => {
    it('should create proper error response from Zod errors', async () => {
      const mockZodError = {
        errors: [
          {
            path: ['name'],
            message: 'Name is required'
          },
          {
            path: ['email'],
            message: 'Invalid email format'
          }
        ]
      } as z.ZodError
      
      const result = createValidationError(mockZodError.errors)
      
      expect(result).toBeInstanceOf(NextResponse)
      expect(result.status).toBe(400)
      
      const body = await result.json()
      expect(body.error).toBe('Validation failed')
      expect(body.details).toHaveLength(2)
      expect(body.details[0]).toEqual({
        field: 'name',
        message: 'Name is required'
      })
      expect(body.details[1]).toEqual({
        field: 'email',
        message: 'Invalid email format'
      })
    })

    it('should handle nested path errors', async () => {
      const mockZodError = {
        errors: [
          {
            path: ['user', 'profile', 'bio'],
            message: 'Bio too long'
          }
        ]
      } as z.ZodError
      
      const result = createValidationError(mockZodError.errors)
      
      const body = await result.json()
      expect(body.details[0].field).toBe('user.profile.bio')
      expect(body.details[0].message).toBe('Bio too long')
    })

    it('should handle array index errors', async () => {
      const mockZodError = {
        errors: [
          {
            path: ['tags', 0],
            message: 'Tag cannot be empty'
          }
        ]
      } as z.ZodError
      
      const result = createValidationError(mockZodError.errors)
      
      const body = await result.json()
      expect(body.details[0].field).toBe('tags.0')
      expect(body.details[0].message).toBe('Tag cannot be empty')
    })

    it('should handle empty errors array', async () => {
      const mockZodError = {
        errors: []
      } as unknown as z.ZodError
      
      const result = createValidationError(mockZodError.errors)
      
      expect(result).toBeInstanceOf(NextResponse)
      expect(result.status).toBe(400)
      
      const body = await result.json()
      expect(body.error).toBe('Validation failed')
      expect(body.details).toHaveLength(0)
    })
  })

  describe('Integration with actual schemas', () => {
    it('should validate product schema through validateRequest', () => {
      const { createProductSchema } = require('@/backend/validations/schemas/products')
      
      const validData = {
        title: 'Test Product',
        description: 'Test description',
        mainImageUrl: 'https://example.com/image.jpg'
      }
      
      const result = validateRequest(createProductSchema, validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid product data through validateRequest', async () => {
      const { createProductSchema } = require('@/backend/validations/schemas/products')
      
      const invalidData = {
        title: '', // Empty title
        description: 'Test description',
        mainImageUrl: 'not-a-url' // Invalid URL
      }
      
      const result = validateRequest(createProductSchema, invalidData)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        const body = await result.error.json()
        expect(body.details).toHaveLength(2)
        
        const messages = body.details.map((error: any) => error.message)
        expect(messages).toContain('Title is required')
        expect(messages).toContain('Valid image URL is required')
      }
    })
  })
}) 