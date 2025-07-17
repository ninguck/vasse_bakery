import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/image-messages/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const imageMessage = await prisma.imageMessage.findUnique({ where: { id } })
  if (!imageMessage) {
    return NextResponse.json(null, { status: 404 })
  }
  return NextResponse.json(imageMessage)
}

// PUT /api/image-messages/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json()
  const { imageUrl, message, icon } = body
  try {
    const updated = await prisma.imageMessage.update({
      where: { id },
      data: { imageUrl, message, icon },
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Not found or update failed' }, { status: 404 })
  }
}

// DELETE /api/image-messages/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const deleted = await prisma.imageMessage.delete({ where: { id } })
    return NextResponse.json(deleted)
  } catch (error) {
    return NextResponse.json({ error: 'Not found or delete failed' }, { status: 404 })
  }
} 