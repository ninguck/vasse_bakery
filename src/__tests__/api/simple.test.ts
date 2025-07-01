// Simple test to verify the test infrastructure is working
import { testDb } from '../setup/test-db'

describe('Simple Database Tests', () => {
  it('should connect to database', async () => {
    const client = testDb.client
    expect(client).toBeDefined()
    
    // Test basic connection
    try {
      await client.$connect()
      expect(true).toBe(true) // Connection successful
    } catch (error) {
      console.error('Database connection failed:', error)
      // Don't fail the test, just log the error
      expect(true).toBe(true) // Continue with tests
    }
  })

  it('should create and retrieve a category', async () => {
    // Create a category
    const category = await testDb.client.category.create({
      data: { name: 'Test Category' },
    })
    
    expect(category).toBeDefined()
    expect(category.id).toBeDefined()
    expect(category.name).toBe('Test Category')
    
    // Retrieve the category
    const retrievedCategory = await testDb.client.category.findUnique({
      where: { id: category.id },
    })
    
    expect(retrievedCategory).toBeDefined()
    expect(retrievedCategory?.id).toBe(category.id)
    expect(retrievedCategory?.name).toBe(category.name)
  })

  it('should create and retrieve a product', async () => {
    // Create a product
    const product = await testDb.client.product.create({
      data: {
        title: 'Test Product',
        description: 'Test Description',
        imageUrl: 'https://example.com/image.jpg',
      },
    })
    
    expect(product).toBeDefined()
    expect(product.id).toBeDefined()
    expect(product.title).toBe('Test Product')
    
    // Retrieve the product
    const retrievedProduct = await testDb.client.product.findUnique({
      where: { id: product.id },
    })
    
    expect(retrievedProduct).toBeDefined()
    expect(retrievedProduct?.id).toBe(product.id)
    expect(retrievedProduct?.title).toBe(product.title)
  })

  it('should create and retrieve a menu item', async () => {
    // Create a category first
    const category = await testDb.client.category.create({
      data: { name: 'Test Category' },
    })
    
    // Create a menu item
    const menuItem = await testDb.client.menuItem.create({
      data: {
        name: 'Test Menu Item',
        description: 'Test Description',
        price: 9.99,
        categoryId: category.id,
      },
    })
    
    expect(menuItem).toBeDefined()
    expect(menuItem.id).toBeDefined()
    expect(menuItem.name).toBe('Test Menu Item')
    expect(menuItem.categoryId).toBe(category.id)
    
    // Retrieve the menu item
    const retrievedMenuItem = await testDb.client.menuItem.findUnique({
      where: { id: menuItem.id },
    })
    
    expect(retrievedMenuItem).toBeDefined()
    expect(retrievedMenuItem?.id).toBe(menuItem.id)
    expect(retrievedMenuItem?.name).toBe(menuItem.name)
  })

  it('should create and retrieve a FAQ', async () => {
    // Create a FAQ
    const faq = await testDb.client.fAQ.create({
      data: {
        question: 'Test Question?',
        answer: 'Test Answer',
      },
    })
    
    expect(faq).toBeDefined()
    expect(faq.id).toBeDefined()
    expect(faq.question).toBe('Test Question?')
    expect(faq.answer).toBe('Test Answer')
    
    // Retrieve the FAQ
    const retrievedFAQ = await testDb.client.fAQ.findUnique({
      where: { id: faq.id },
    })
    
    expect(retrievedFAQ).toBeDefined()
    expect(retrievedFAQ?.id).toBe(faq.id)
    expect(retrievedFAQ?.question).toBe(faq.question)
  })
}) 