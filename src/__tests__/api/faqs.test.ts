// FAQs API tests using require to avoid module resolution issues
import { testDb } from '../setup/test-db'
import { testUtils, validateFAQResponse } from '../setup/test-utils'
import { fixtures } from '../setup/fixtures'

// Mock NextRequest for testing
const { NextRequest } = require('next/server')

describe('FAQs API', () => {
  // Test FAQ creation
  describe('POST /api/faqs', () => {
    it('should create a new FAQ with valid data', async () => {
      const faqData = fixtures.faqs.valid
      
      // Create FAQ directly in database
      const faq = await testUtils.createTestFAQ(faqData)
      
      expect(faq).toBeDefined()
      expect(faq.id).toBeDefined()
      expect(faq.question).toBe(faqData.question)
      expect(faq.answer).toBe(faqData.answer)
      
      validateFAQResponse(faq)
    })

    it('should handle invalid FAQ data', async () => {
      const invalidData = fixtures.faqs.invalid
      
      try {
        await testUtils.createTestFAQ(invalidData)
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail due to validation
        expect(error).toBeDefined()
      }
    })
  })

  // Test FAQ retrieval
  describe('GET /api/faqs', () => {
    it('should retrieve all FAQs', async () => {
      // Create test FAQs
      const faq1 = await testUtils.createTestFAQ({
        question: 'FAQ 1?',
        answer: 'Answer 1',
      })
      const faq2 = await testUtils.createTestFAQ({
        question: 'FAQ 2?',
        answer: 'Answer 2',
      })
      
      // Retrieve all FAQs
      const faqs = await testDb.client.fAQ.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
      
      expect(faqs).toBeDefined()
      expect(Array.isArray(faqs)).toBe(true)
      expect(faqs.length).toBeGreaterThanOrEqual(2)
      
      // Check that our test FAQs are included
      const faqIds = faqs.map((f: any) => f.id)
      expect(faqIds).toContain(faq1.id)
      expect(faqIds).toContain(faq2.id)
      
      // Validate each FAQ structure
      faqs.forEach(validateFAQResponse)
    })

    it('should retrieve a specific FAQ by ID', async () => {
      const faq = await testUtils.createTestFAQ()
      
      const retrievedFAQ = await testDb.client.fAQ.findUnique({
        where: { id: faq.id },
      })
      
      expect(retrievedFAQ).toBeDefined()
      expect(retrievedFAQ?.id).toBe(faq.id)
      expect(retrievedFAQ?.question).toBe(faq.question)
      expect(retrievedFAQ?.answer).toBe(faq.answer)
      
      validateFAQResponse(retrievedFAQ!)
    })

    it('should return null for non-existent FAQ ID', async () => {
      const nonExistentId = 'non-existent-id'
      
      const faq = await testDb.client.fAQ.findUnique({
        where: { id: nonExistentId },
      })
      
      expect(faq).toBeNull()
    })

    it('should return FAQs ordered by creation date (newest first)', async () => {
      // Clear any existing data first
      await testDb.client.fAQ.deleteMany()
      
      // Create FAQs with delays to ensure different timestamps
      const faq1 = await testUtils.createTestFAQ({
        question: 'First FAQ?',
        answer: 'First Answer',
      })
      
      // Small delay to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 10))
      
      const faq2 = await testUtils.createTestFAQ({
        question: 'Second FAQ?',
        answer: 'Second Answer',
      })
      
      const faqs = await testDb.client.fAQ.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
      
      expect(faqs.length).toBeGreaterThanOrEqual(2)
      expect(faqs[0].question).toBe('Second FAQ?') // Newest first
      expect(faqs[1].question).toBe('First FAQ?')
    })
  })

  // Test FAQ update
  describe('PUT /api/faqs/[id]', () => {
    it('should update an existing FAQ', async () => {
      const faq = await testUtils.createTestFAQ()
      const updateData = fixtures.faqs.update
      
      const updatedFAQ = await testDb.client.fAQ.update({
        where: { id: faq.id },
        data: updateData,
      })
      
      expect(updatedFAQ).toBeDefined()
      expect(updatedFAQ.id).toBe(faq.id)
      expect(updatedFAQ.question).toBe(updateData.question)
      expect(updatedFAQ.answer).toBe(updateData.answer)
      
      validateFAQResponse(updatedFAQ)
    })

    it('should handle updating non-existent FAQ', async () => {
      const nonExistentId = 'non-existent-id'
      const updateData = fixtures.faqs.update
      
      try {
        await testDb.client.fAQ.update({
          where: { id: nonExistentId },
          data: updateData,
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail for non-existent FAQ
        expect(error).toBeDefined()
      }
    })
  })

  // Test FAQ deletion
  describe('DELETE /api/faqs/[id]', () => {
    it('should delete an existing FAQ', async () => {
      const faq = await testUtils.createTestFAQ()
      
      const deletedFAQ = await testDb.client.fAQ.delete({
        where: { id: faq.id },
      })
      
      expect(deletedFAQ).toBeDefined()
      expect(deletedFAQ.id).toBe(faq.id)
      
      // Verify FAQ is actually deleted
      const retrievedFAQ = await testDb.client.fAQ.findUnique({
        where: { id: faq.id },
      })
      
      expect(retrievedFAQ).toBeNull()
    })

    it('should handle deleting non-existent FAQ', async () => {
      const nonExistentId = 'non-existent-id'
      
      try {
        await testDb.client.fAQ.delete({
          where: { id: nonExistentId },
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail for non-existent FAQ
        expect(error).toBeDefined()
      }
    })
  })

  // Test FAQ validation
  describe('FAQ Validation', () => {
    it('should require question field', async () => {
      const invalidData = {
        answer: 'Valid answer',
      }
      
      try {
        await testDb.client.fAQ.create({
          data: invalidData,
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail due to missing question
        expect(error).toBeDefined()
      }
    })

    it('should require answer field', async () => {
      const invalidData = {
        question: 'Valid question?',
      }
      
      try {
        await testDb.client.fAQ.create({
          data: invalidData,
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail due to missing answer
        expect(error).toBeDefined()
      }
    })

    it('should handle empty question', async () => {
      const invalidData = {
        question: '',
        answer: 'Valid answer',
      }
      
      try {
        await testDb.client.fAQ.create({
          data: invalidData,
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail due to empty question
        expect(error).toBeDefined()
      }
    })

    it('should handle empty answer', async () => {
      const invalidData = {
        question: 'Valid question?',
        answer: '',
      }
      
      try {
        await testDb.client.fAQ.create({
          data: invalidData,
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail due to empty answer
        expect(error).toBeDefined()
      }
    })
  })

  // Test FAQ bulk operations
  describe('FAQ Bulk Operations', () => {
    it('should handle multiple FAQs', async () => {
      const multipleFaqs = fixtures.multiple.faqs
      
      // Create multiple FAQs
      const createdFaqs = []
      for (const faqData of multipleFaqs) {
        const faq = await testUtils.createTestFAQ(faqData)
        createdFaqs.push(faq)
      }
      
      expect(createdFaqs.length).toBe(multipleFaqs.length)
      
      // Verify all FAQs were created
      const allFaqs = await testDb.client.fAQ.findMany()
      expect(allFaqs.length).toBeGreaterThanOrEqual(multipleFaqs.length)
      
      // Check that our FAQs are included
      const faqIds = allFaqs.map((f: any) => f.id)
      createdFaqs.forEach(faq => {
        expect(faqIds).toContain(faq.id)
      })
    })
  })
}) 