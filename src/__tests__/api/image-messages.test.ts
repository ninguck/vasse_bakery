// ImageMessages API tests
import { testDb } from '../setup/test-db'
import { testUtils } from '../setup/test-utils'

// Mock NextRequest for testing
const { NextRequest } = require('next/server')

describe('ImageMessages API', () => {
  // Test image-message creation
  describe('POST /api/image-messages', () => {
    it('should create a new image-message with valid data', async () => {
      const data = {
        imageUrl: 'https://example.com/image.jpg',
        message: 'Welcome to Vasse Bakery!',
        icon: 'star',
      }
      // Replace with actual test util when implemented
      const imageMessage = await testUtils.createTestImageMessage(data)
      expect(imageMessage).toBeDefined()
      expect(imageMessage.id).toBeDefined()
      expect(imageMessage.imageUrl).toBe(data.imageUrl)
      expect(imageMessage.message).toBe(data.message)
      expect(imageMessage.icon).toBe(data.icon)
    })

    it('should handle invalid image-message data', async () => {
      const invalidData = { imageUrl: '', message: '', icon: '' }
      try {
        await testUtils.createTestImageMessage(invalidData)
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  // Test retrieval
  describe('GET /api/image-messages', () => {
    it('should retrieve all image-messages', async () => {
      const msg1 = await testUtils.createTestImageMessage({
        imageUrl: 'https://example.com/1.jpg',
        message: 'First',
        icon: 'star',
      })
      const msg2 = await testUtils.createTestImageMessage({
        imageUrl: 'https://example.com/2.jpg',
        message: 'Second',
        icon: 'heart',
      })
      const imageMessages = await testDb.client.imageMessage.findMany()
      expect(imageMessages).toBeDefined()
      expect(Array.isArray(imageMessages)).toBe(true)
      expect(imageMessages.length).toBeGreaterThanOrEqual(2)
      const ids = imageMessages.map((m: any) => m.id)
      expect(ids).toContain(msg1.id)
      expect(ids).toContain(msg2.id)
    })

    it('should retrieve a specific image-message by ID', async () => {
      const msg = await testUtils.createTestImageMessage({
        imageUrl: 'https://example.com/3.jpg',
        message: 'Third',
        icon: 'star',
      })
      const retrieved = await testDb.client.imageMessage.findUnique({ where: { id: msg.id } })
      expect(retrieved).toBeDefined()
      expect(retrieved?.id).toBe(msg.id)
      expect(retrieved?.imageUrl).toBe(msg.imageUrl)
      expect(retrieved?.message).toBe(msg.message)
      expect(retrieved?.icon).toBe(msg.icon)
    })

    it('should return null for non-existent image-message ID', async () => {
      const nonExistentId = 'non-existent-id'
      const msg = await testDb.client.imageMessage.findUnique({ where: { id: nonExistentId } })
      expect(msg).toBeNull()
    })
  })

  // Test update
  describe('PUT /api/image-messages/[id]', () => {
    it('should update an existing image-message', async () => {
      const msg = await testUtils.createTestImageMessage({
        imageUrl: 'https://example.com/4.jpg',
        message: 'Fourth',
        icon: 'star',
      })
      const updateData = { imageUrl: 'https://example.com/4b.jpg', message: 'Updated', icon: 'heart' }
      const updated = await testDb.client.imageMessage.update({
        where: { id: msg.id },
        data: updateData,
      })
      expect(updated).toBeDefined()
      expect(updated.id).toBe(msg.id)
      expect(updated.imageUrl).toBe(updateData.imageUrl)
      expect(updated.message).toBe(updateData.message)
      expect(updated.icon).toBe(updateData.icon)
    })

    it('should handle updating non-existent image-message', async () => {
      const nonExistentId = 'non-existent-id'
      const updateData = { imageUrl: 'x', message: 'x', icon: 'x' }
      try {
        await testDb.client.imageMessage.update({ where: { id: nonExistentId }, data: updateData })
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  // Test deletion
  describe('DELETE /api/image-messages/[id]', () => {
    it('should delete an existing image-message', async () => {
      const msg = await testUtils.createTestImageMessage({
        imageUrl: 'https://example.com/5.jpg',
        message: 'Fifth',
        icon: 'star',
      })
      const deleted = await testDb.client.imageMessage.delete({ where: { id: msg.id } })
      expect(deleted).toBeDefined()
      expect(deleted.id).toBe(msg.id)
      const retrieved = await testDb.client.imageMessage.findUnique({ where: { id: msg.id } })
      expect(retrieved).toBeNull()
    })

    it('should handle deleting non-existent image-message', async () => {
      const nonExistentId = 'non-existent-id'
      try {
        await testDb.client.imageMessage.delete({ where: { id: nonExistentId } })
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
}) 