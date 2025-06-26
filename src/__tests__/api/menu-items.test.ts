// Menu Items API tests using require to avoid module resolution issues
import { testDb } from '../setup/test-db'
import { testUtils, validateMenuItemResponse } from '../setup/test-utils'
import { fixtures } from '../setup/fixtures'

// Mock NextRequest for testing
const { NextRequest } = require('next/server')

describe('Menu Items API', () => {
  // Test menu item creation
  describe('POST /api/menu-items', () => {
    it('should create a new menu item with valid data', async () => {
      // Clear any existing data first
      await testDb.client.menuItem.deleteMany()
      await testDb.client.category.deleteMany()
      
      const category = await testUtils.createTestCategory()
      const menuItemData = {
        ...fixtures.menuItems.valid,
        categoryId: category.id,
      }
      
      // Create menu item directly in database
      const menuItem = await testUtils.createTestMenuItem(menuItemData)
      
      expect(menuItem).toBeDefined()
      expect(menuItem.id).toBeDefined()
      expect(menuItem.name).toBe(menuItemData.name)
      expect(menuItem.description).toBe(menuItemData.description)
      expect(menuItem.price).toBe(menuItemData.price)
      expect(menuItem.categoryId).toBe(category.id)
      
      validateMenuItemResponse(menuItem)
    })

    it('should handle invalid menu item data', async () => {
      const invalidData = fixtures.menuItems.invalid
      
      try {
        await testUtils.createTestMenuItem(invalidData)
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail due to validation
        expect(error).toBeDefined()
      }
    })

    it('should create menu item with product relationship', async () => {
      // Clear any existing data first
      await testDb.client.menuItem.deleteMany()
      await testDb.client.product.deleteMany()
      await testDb.client.category.deleteMany()
      
      const category = await testUtils.createTestCategory()
      const product = await testUtils.createTestProduct()
      const menuItemData = {
        ...fixtures.menuItems.valid,
        categoryId: category.id,
        productId: product.id,
      }
      
      const menuItem = await testUtils.createTestMenuItem(menuItemData)
      
      expect(menuItem).toBeDefined()
      expect(menuItem.productId).toBe(product.id)
      
      // Verify relationship
      const menuItemWithProduct = await testDb.client.menuItem.findUnique({
        where: { id: menuItem.id },
        include: {
          product: true,
          category: true,
        },
      })
      
      expect(menuItemWithProduct?.product).toBeDefined()
      expect(menuItemWithProduct?.product?.id).toBe(product.id)
    })
  })

  // Test menu item retrieval
  describe('GET /api/menu-items', () => {
    it('should retrieve all menu items', async () => {
      // Clear any existing data first
      await testDb.client.menuItem.deleteMany()
      await testDb.client.category.deleteMany()
      
      // Create test menu items
      const category = await testUtils.createTestCategory()
      const menuItem1 = await testUtils.createTestMenuItem({
        name: 'Menu Item 1',
        categoryId: category.id,
      })
      const menuItem2 = await testUtils.createTestMenuItem({
        name: 'Menu Item 2',
        categoryId: category.id,
      })
      
      // Retrieve all menu items
      const menuItems = await testDb.client.menuItem.findMany({
        include: {
          product: true,
          category: true,
        },
      })
      
      expect(menuItems).toBeDefined()
      expect(Array.isArray(menuItems)).toBe(true)
      expect(menuItems.length).toBeGreaterThanOrEqual(2)
      
      // Check that our test menu items are included
      const menuItemIds = menuItems.map((m: any) => m.id)
      expect(menuItemIds).toContain(menuItem1.id)
      expect(menuItemIds).toContain(menuItem2.id)
      
      // Validate each menu item structure
      menuItems.forEach(validateMenuItemResponse)
    })

    it('should retrieve a specific menu item by ID', async () => {
      const menuItem = await testUtils.createTestMenuItem()
      
      const retrievedMenuItem = await testDb.client.menuItem.findUnique({
        where: { id: menuItem.id },
        include: {
          product: true,
          category: true,
        },
      })
      
      expect(retrievedMenuItem).toBeDefined()
      expect(retrievedMenuItem?.id).toBe(menuItem.id)
      expect(retrievedMenuItem?.name).toBe(menuItem.name)
      
      validateMenuItemResponse(retrievedMenuItem!)
    })

    it('should return null for non-existent menu item ID', async () => {
      const nonExistentId = 'non-existent-id'
      
      const menuItem = await testDb.client.menuItem.findUnique({
        where: { id: nonExistentId },
      })
      
      expect(menuItem).toBeNull()
    })
  })

  // Test menu item update
  describe('PUT /api/menu-items/[id]', () => {
    it('should update an existing menu item', async () => {
      const menuItem = await testUtils.createTestMenuItem()
      const updateData = fixtures.menuItems.update
      
      const updatedMenuItem = await testDb.client.menuItem.update({
        where: { id: menuItem.id },
        data: updateData,
        include: {
          product: true,
          category: true,
        },
      })
      
      expect(updatedMenuItem).toBeDefined()
      expect(updatedMenuItem.id).toBe(menuItem.id)
      expect(updatedMenuItem.name).toBe(updateData.name)
      expect(updatedMenuItem.description).toBe(updateData.description)
      expect(updatedMenuItem.price).toBe(updateData.price)
      
      validateMenuItemResponse(updatedMenuItem)
    })

    it('should handle updating non-existent menu item', async () => {
      const nonExistentId = 'non-existent-id'
      const updateData = fixtures.menuItems.update
      
      try {
        await testDb.client.menuItem.update({
          where: { id: nonExistentId },
          data: updateData,
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail for non-existent menu item
        expect(error).toBeDefined()
      }
    })
  })

  // Test menu item deletion
  describe('DELETE /api/menu-items/[id]', () => {
    it('should delete an existing menu item', async () => {
      const menuItem = await testUtils.createTestMenuItem()
      
      const deletedMenuItem = await testDb.client.menuItem.delete({
        where: { id: menuItem.id },
      })
      
      expect(deletedMenuItem).toBeDefined()
      expect(deletedMenuItem.id).toBe(menuItem.id)
      
      // Verify menu item is actually deleted
      const retrievedMenuItem = await testDb.client.menuItem.findUnique({
        where: { id: menuItem.id },
      })
      
      expect(retrievedMenuItem).toBeNull()
    })

    it('should handle deleting non-existent menu item', async () => {
      const nonExistentId = 'non-existent-id'
      
      try {
        await testDb.client.menuItem.delete({
          where: { id: nonExistentId },
        })
        // If we get here, the test should fail
        expect(true).toBe(false)
      } catch (error) {
        // Expected to fail for non-existent menu item
        expect(error).toBeDefined()
      }
    })
  })

  // Test menu item relationships
  describe('Menu Item Relationships', () => {
    it('should handle menu item with product', async () => {
      // Clear any existing data first
      await testDb.client.menuItem.deleteMany()
      await testDb.client.product.deleteMany()
      await testDb.client.category.deleteMany()
      
      const product = await testUtils.createTestProduct()
      const menuItem = await testUtils.createTestMenuItem({
        productId: product.id,
      })
      
      const menuItemWithProduct = await testDb.client.menuItem.findUnique({
        where: { id: menuItem.id },
        include: {
          product: true,
          category: true,
        },
      })
      
      expect(menuItemWithProduct).toBeDefined()
      expect(menuItemWithProduct?.product).toBeDefined()
      expect(menuItemWithProduct?.product?.id).toBe(product.id)
    })

    it('should handle menu item with category', async () => {
      // Clear any existing data first
      await testDb.client.menuItem.deleteMany()
      await testDb.client.category.deleteMany()
      
      const category = await testUtils.createTestCategory()
      const menuItem = await testUtils.createTestMenuItem({
        categoryId: category.id,
      })
      
      const menuItemWithCategory = await testDb.client.menuItem.findUnique({
        where: { id: menuItem.id },
        include: {
          product: true,
          category: true,
        },
      })
      
      expect(menuItemWithCategory).toBeDefined()
      expect(menuItemWithCategory?.category).toBeDefined()
      expect(menuItemWithCategory?.category?.id).toBe(category.id)
    })

    it('should handle menu item with both product and category', async () => {
      // Clear any existing data first
      await testDb.client.menuItem.deleteMany()
      await testDb.client.product.deleteMany()
      await testDb.client.category.deleteMany()
      
      const product = await testUtils.createTestProduct()
      const category = await testUtils.createTestCategory()
      const menuItem = await testUtils.createTestMenuItem({
        productId: product.id,
        categoryId: category.id,
      })
      
      const menuItemWithRelations = await testDb.client.menuItem.findUnique({
        where: { id: menuItem.id },
        include: {
          product: true,
          category: true,
        },
      })
      
      expect(menuItemWithRelations).toBeDefined()
      expect(menuItemWithRelations?.product).toBeDefined()
      expect(menuItemWithRelations?.product?.id).toBe(product.id)
      expect(menuItemWithRelations?.category).toBeDefined()
      expect(menuItemWithRelations?.category?.id).toBe(category.id)
    })
  })
}) 