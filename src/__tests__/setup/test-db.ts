// Simple test database setup using require to avoid module resolution issues
const { PrismaClient } = require('@prisma/client')

// Create a separate Prisma client for testing
const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/vasse_bakery_test',
    },
  },
  log: process.env.NODE_ENV === 'test' ? [] : ['query'], // Disable logging in tests
})

// Test database utilities
export const testDb = {
  // Initialize test database
  async init() {
    try {
      // Test the connection
      await testPrisma.$connect()
      
      // Clear all data before tests
      await this.cleanup()
      
      console.log('Test database initialized')
    } catch (error) {
      console.error('Failed to initialize test database:', error)
      console.log('Make sure your test database is running and accessible')
      throw error
    }
  },

  // Clean up all data after tests
  async cleanup() {
    try {
      // Delete in order to respect foreign key constraints
      await testPrisma.menuItem.deleteMany()
      await testPrisma.product.deleteMany()
      await testPrisma.category.deleteMany()
      await testPrisma.fAQ.deleteMany()
      await testPrisma.adminUser.deleteMany()
      
      console.log('Test database cleaned up')
    } catch (error) {
      console.error('Failed to cleanup test database:', error)
      // Don't throw error during cleanup to avoid masking test failures
    }
  },

  // Close database connection
  async disconnect() {
    try {
      await testPrisma.$disconnect()
    } catch (error) {
      console.error('Failed to disconnect from test database:', error)
    }
  },

  // Get the test Prisma client
  get client() {
    return testPrisma
  },
}

// Global test setup and teardown
beforeAll(async () => {
  try {
    await testDb.init()
  } catch (error) {
    console.error('Test setup failed:', error)
    // Continue with tests even if database setup fails
  }
})

afterAll(async () => {
  await testDb.cleanup()
  await testDb.disconnect()
})

// Add back afterEach cleanup for proper test isolation
afterEach(async () => {
  await testDb.cleanup()
}) 