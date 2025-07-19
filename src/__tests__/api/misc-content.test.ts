import { testDb } from '../setup/test-db'
// Mock NextRequest for testing
const { NextRequest } = require('next/server')

describe('MiscContent API', () => {
  let createdId: string

  it('should create a new misc content item with valid data', async () => {
    const data = {
      section: 'hero',
      imageUrl: 'https://example.com/hero.jpg',
      icon: 'star',
      largeText: 'Premium Coffee',
      smallText: 'Freshly brewed daily',
      message: 'Welcome!'
    }
    const item = await testDb.client.miscContent.create({ data })
    expect(item).toBeDefined()
    expect(item.id).toBeDefined()
    expect(item.section).toBe(data.section)
    expect(item.imageUrl).toBe(data.imageUrl)
    expect(item.icon).toBe(data.icon)
    expect(item.largeText).toBe(data.largeText)
    expect(item.smallText).toBe(data.smallText)
    expect(item.message).toBe(data.message)
    createdId = item.id
  })

  it('should retrieve all misc content items', async () => {
    const items = await testDb.client.miscContent.findMany()
    expect(Array.isArray(items)).toBe(true)
    expect(items.length).toBeGreaterThan(0)
  })

  it('should retrieve a misc content item by id', async () => {
    const item = await testDb.client.miscContent.findUnique({ where: { id: createdId } })
    expect(item).toBeDefined()
    expect(item?.id).toBe(createdId)
  })

  it('should update a misc content item', async () => {
    const updateData = { section: 'about', message: 'Updated message' }
    const updated = await testDb.client.miscContent.update({ where: { id: createdId }, data: updateData })
    expect(updated).toBeDefined()
    expect(updated.section).toBe('about')
    expect(updated.message).toBe('Updated message')
  })

  it('should delete a misc content item', async () => {
    const deleted = await testDb.client.miscContent.delete({ where: { id: createdId } })
    expect(deleted).toBeDefined()
    expect(deleted.id).toBe(createdId)
    const item = await testDb.client.miscContent.findUnique({ where: { id: createdId } })
    expect(item).toBeNull()
  })

  it('should not create item without section', async () => {
    try {
      await testDb.client.miscContent.create({ data: { message: 'No section' } })
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
}) 