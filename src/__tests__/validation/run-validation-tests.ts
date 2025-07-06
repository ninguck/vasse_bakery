#!/usr/bin/env node

/**
 * Validation Test Runner
 * 
 * This script runs all validation-related tests to ensure the Zod validation system
 * is working correctly across the entire backend.
 * 
 * Usage:
 * npm run test:validation
 * or
 * npx jest --testPathPattern=validation
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(__dirname, 'validation')

console.log('🧪 Running Validation Tests...\n')

// Check if test files exist
const testFiles = [
  'schemas.test.ts',
  'utils.test.ts',
  'api-endpoints.test.ts'
]

console.log('📋 Test Files to Run:')
testFiles.forEach(file => {
  const filePath = join(TEST_DIR, file)
  if (existsSync(filePath)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} (missing)`)
  }
})

console.log('\n🚀 Starting test execution...\n')

try {
  // Run Jest with specific test pattern
  const command = 'npx jest --testPathPattern=validation --verbose --coverage'
  execSync(command, { 
    stdio: 'inherit',
    cwd: process.cwd()
  })
  
  console.log('\n✅ All validation tests completed successfully!')
  console.log('\n📊 Test Coverage Summary:')
  console.log('- Schema validation: Ensures all Zod schemas work correctly')
  console.log('- Utility functions: Tests validateRequest and createValidationError')
  console.log('- API endpoints: Verifies validation is properly integrated')
  
} catch (error) {
  console.error('\n❌ Validation tests failed!')
  console.error('Please check the test output above for details.')
  process.exit(1)
}

console.log('\n📝 Validation Test Categories:')
console.log('1. Schema Tests:')
console.log('   - Product schema validation')
console.log('   - Category schema validation')
console.log('   - Menu item schema validation')
console.log('   - FAQ schema validation')
console.log('   - Partial update schemas')
console.log('   - Edge cases and error handling')

console.log('\n2. Utility Tests:')
console.log('   - validateRequest function')
console.log('   - createValidationError function')
console.log('   - Error response formatting')
console.log('   - Nested object validation')
console.log('   - Array validation')

console.log('\n3. API Integration Tests:')
console.log('   - POST endpoint validation')
console.log('   - PUT endpoint validation')
console.log('   - Error response consistency')
console.log('   - Malformed request handling')

console.log('\n🎯 Next Steps:')
console.log('- Review any failing tests')
console.log('- Update schemas if validation rules need adjustment')
console.log('- Add more specific test cases as needed')
console.log('- Run tests before deploying to production') 