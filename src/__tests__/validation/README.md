# Validation Testing System

This directory contains comprehensive tests for the Zod validation system implemented in the Vasse Bakery backend.

## Overview

The validation testing system ensures that:
- All Zod schemas work correctly
- API endpoints properly validate incoming requests
- Error responses are consistent and informative
- Edge cases are handled appropriately

## Test Files

### 1. `schemas.test.ts`
Tests all Zod schemas to ensure they:
- Accept valid data
- Reject invalid data with appropriate error messages
- Handle required vs optional fields correctly
- Validate data types and formats
- Support partial updates for PUT operations

**Coverage:**
- Product schemas (create, update)
- Category schemas (create, update)
- Menu item schemas (create, update)
- FAQ schemas (create, update)

### 2. `utils.test.ts`
Tests the validation utility functions:
- `validateRequest()` - Main validation function
- `createValidationError()` - Error response formatter

**Coverage:**
- Success cases with valid data
- Error cases with invalid data
- Nested object validation
- Array validation
- Edge cases (null, undefined, empty objects)
- Error response format consistency

### 3. `api-endpoints.test.ts`
Tests API endpoints to ensure they:
- Use validation properly
- Return correct HTTP status codes
- Provide consistent error responses
- Handle malformed requests gracefully

**Coverage:**
- POST endpoints (create operations)
- PUT endpoints (update operations)
- Error response format validation
- Malformed JSON handling
- Empty/null request body handling

## Running Tests

### Run All Validation Tests
```bash
npm run test:validation
```

### Run Specific Test Files
```bash
# Schema tests only
npx jest --testPathPattern=validation/schemas

# Utility tests only
npx jest --testPathPattern=validation/utils

# API endpoint tests only
npx jest --testPathPattern=validation/api-endpoints
```

### Run with Coverage
```bash
npm run test:validation
# This automatically includes coverage reporting
```

## Test Structure

### Schema Tests
Each schema test follows this pattern:
```typescript
describe('Product Schema', () => {
  it('should accept valid product data', () => {
    // Test valid data
  })
  
  it('should reject invalid product data', () => {
    // Test invalid data
  })
  
  it('should handle required fields', () => {
    // Test missing required fields
  })
})
```

### Utility Tests
Tests the core validation functions:
```typescript
describe('validateRequest', () => {
  it('should return success for valid data', () => {
    // Test successful validation
  })
  
  it('should return error for invalid data', () => {
    // Test failed validation
  })
})
```

### API Endpoint Tests
Tests actual API endpoints:
```typescript
describe('POST /api/products', () => {
  it('should accept valid product data', async () => {
    // Test successful API call
  })
  
  it('should reject invalid product data', async () => {
    // Test failed API call
  })
})
```

## Validation Rules Tested

### Products
- Title: Required, max 100 characters
- Description: Required, max 500 characters
- Image URL: Required, valid URL format

### Categories
- Name: Required, max 50 characters
- Description: Optional, max 200 characters

### Menu Items
- Name: Required, max 100 characters
- Description: Required, max 500 characters
- Price: Required, positive number
- Category ID: Required, valid UUID

### FAQs
- Question: Required, max 200 characters
- Answer: Required, max 1000 characters

## Error Response Format

All validation errors follow this consistent format:
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## Best Practices

### Writing New Tests
1. **Test both success and failure cases**
2. **Test edge cases** (empty strings, null values, etc.)
3. **Test all validation rules** for each schema
4. **Use descriptive test names** that explain what's being tested
5. **Group related tests** using describe blocks

### Adding New Schemas
1. Create schema tests in `schemas.test.ts`
2. Test all validation rules
3. Test partial updates if applicable
4. Add API endpoint tests if the schema is used in endpoints

### Updating Existing Schemas
1. Update corresponding tests
2. Ensure backward compatibility
3. Test migration scenarios if needed

## Troubleshooting

### Common Issues

**Test Failing: Schema Not Found**
- Ensure the schema is properly exported from the schemas file
- Check import paths in test files

**Test Failing: API Endpoint Not Found**
- Ensure the API route file exists
- Check that the route exports the expected functions

**Test Failing: Database Connection**
- Ensure test database is properly configured
- Check that database mocks are working correctly

### Debugging Tips

1. **Run tests in isolation:**
   ```bash
   npx jest --testPathPattern=specific-test-name
   ```

2. **Enable verbose output:**
   ```bash
   npm run test:validation -- --verbose
   ```

3. **Check test coverage:**
   ```bash
   npm run test:validation
   # Coverage report will be generated
   ```

## Continuous Integration

These tests should be run:
- Before each commit
- In CI/CD pipelines
- Before production deployments
- When updating validation schemas

## Maintenance

### Regular Tasks
- Review test coverage quarterly
- Update tests when schemas change
- Add tests for new validation rules
- Remove tests for deprecated features

### Performance
- Tests should run quickly (< 30 seconds)
- Use mocks for external dependencies
- Avoid unnecessary database calls in tests

## Contributing

When adding new validation features:
1. Write tests first (TDD approach)
2. Ensure all existing tests pass
3. Add comprehensive test coverage
4. Update this README if needed

## Related Files

- `src/backend/validations/schemas/` - Zod schema definitions
- `src/backend/validations/utils.ts` - Validation utility functions
- `src/backend/*/route.ts` - API endpoints that use validation
- `jest.config.js` - Jest configuration for testing 