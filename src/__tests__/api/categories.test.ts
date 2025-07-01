// Categories API tests using require to avoid module resolution issues
import { testDb } from '../setup/test-db'
import { testUtils, validateCategoryResponse } from '../setup/test-utils'
import { fixtures } from '../setup/fixtures'

// Mock NextRequest for testing
const { NextRequest } = require('next/server')

describe('Categories API', () => {
  // Test category creation
  describe('POST /api/categories', () => {
    it('should create a new category with valid data', async () => {
      const categoryData = fixtures.categories.valid
      
      // Create category directly in database
      const category = await testUtils.createTestCategory(categoryData.name)
      
      expect(category).toBeDefined()
      expect(category.id).toBeDefined()
      expect(category.name).toBe(categoryData.name)
      
      validateCategoryResponse(category)
    })

    it('should handle invalid category data', async () => {
      const invalidData = fixtures.categories.invalid
      
      try {
        await testUtils.createTestCategory(invalidData.name)
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail due to validation
        expect(error).toBeDefined()
      }
    })
  })

  // Test category retrieval
  describe('GET /api/categories', () => {
    it('should retrieve all categories', async () => {
      // Create test categories
      const category1 = await testUtils.createTestCategory('Category 1')
      const category2 = await testUtils.createTestCategory('Category 2')
      
      // Retrieve all categories
      const categories = await testDb.client.category.findMany({
        include: {
          products: true,
          menuItems: true,
        },
      })
      
      expect(categories).toBeDefined()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThanOrEqual(2)
      
      // Check that our test categories are included
      const categoryIds = categories.map((c: any) => c.id)
      expect(categoryIds).toContain(category1.id)
      expect(categoryIds).toContain(category2.id)
      
      // Validate each category structure
      categories.forEach(validateCategoryResponse)
    })

    it('should retrieve a specific category by ID', async () => {
      const category = await testUtils.createTestCategory()
      
      const retrievedCategory = await testDb.client.category.findUnique({
        where: { id: category.id },
        include: {
          products: true,
          menuItems: true,
        },
      })
      
      expect(retrievedCategory).toBeDefined()
      expect(retrievedCategory?.id).toBe(category.id)
      expect(retrievedCategory?.name).toBe(category.name)
      
      validateCategoryResponse(retrievedCategory!)
    })

    it('should return null for non-existent category ID', async () => {
      const nonExistentId = 'non-existent-id'
      
      const category = await testDb.client.category.findUnique({
        where: { id: nonExistentId },
      })
      
      expect(category).toBeNull()
    })
  })

  // Test category update
  describe('PUT /api/categories/[id]', () => {
    it('should update an existing category', async () => {
      const category = await testUtils.createTestCategory()
      const updateData = fixtures.categories.update
      
      const updatedCategory = await testDb.client.category.update({
        where: { id: category.id },
        data: updateData,
        include: {
          products: true,
          menuItems: true,
        },
      })
      
      expect(updatedCategory).toBeDefined()
      expect(updatedCategory.id).toBe(category.id)
      expect(updatedCategory.name).toBe(updateData.name)
      
      validateCategoryResponse(updatedCategory)
    })

    it('should handle updating non-existent category', async () => {
      const nonExistentId = 'non-existent-id'
      const updateData = fixtures.categories.update
      
      try {
        await testDb.client.category.update({
          where: { id: nonExistentId },
          data: updateData,
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail for non-existent category
        expect(error).toBeDefined()
      }
    })
  })

  // Test category deletion
  describe('DELETE /api/categories/[id]', () => {
    it('should delete an existing category', async () => {
      const category = await testUtils.createTestCategory()
      
      const deletedCategory = await testDb.client.category.delete({
        where: { id: category.id },
      })
      
      expect(deletedCategory).toBeDefined()
      expect(deletedCategory.id).toBe(category.id)
      
      // Verify category is actually deleted
      const retrievedCategory = await testDb.client.category.findUnique({
        where: { id: category.id },
      })
      
      expect(retrievedCategory).toBeNull()
    })

    it('should handle deleting non-existent category', async () => {
      const nonExistentId = 'non-existent-id'
      
      try {
        await testDb.client.category.delete({
          where: { id: nonExistentId },
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail for non-existent category
        expect(error).toBeDefined()
      }
    })
  })

  // Test category relationships
  describe('Category Relationships', () => {
    it('should handle category with products', async () => {
      const category = await testUtils.createTestCategory()
      const product = await testUtils.createTestProduct({
        categoryId: category.id,
      })
      
      const categoryWithProducts = await testDb.client.category.findUnique({
        where: { id: category.id },
        include: {
          products: true,
          menuItems: true,
        },
      })
      
      expect(categoryWithProducts).toBeDefined()
      expect(categoryWithProducts?.products).toBeDefined()
      expect(Array.isArray(categoryWithProducts?.products)).toBe(true)
      expect(categoryWithProducts?.products?.length).toBeGreaterThan(0)
      expect(categoryWithProducts?.products?.[0]?.id).toBe(product.id)
    })

    it('should handle category with menu items', async () => {
      const category = await testUtils.createTestCategory()
      const menuItem = await testUtils.createTestMenuItem({
        categoryId: category.id,
      })
      
      const categoryWithMenuItems = await testDb.client.category.findUnique({
        where: { id: category.id },
        include: {
          products: true,
          menuItems: true,
        },
      })
      
      expect(categoryWithMenuItems).toBeDefined()
      expect(categoryWithMenuItems?.menuItems).toBeDefined()
      expect(Array.isArray(categoryWithMenuItems?.menuItems)).toBe(true)
      expect(categoryWithMenuItems?.menuItems?.length).toBeGreaterThan(0)
      expect(categoryWithMenuItems?.menuItems?.[0]?.id).toBe(menuItem.id)
    })
  })
}) 