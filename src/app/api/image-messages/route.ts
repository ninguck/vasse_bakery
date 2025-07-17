import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/image-messages
export async function GET() {
  const imageMessages = await prisma.imageMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(imageMessages)
}

// POST /api/image-messages
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { imageUrl, message, icon } = body
  if (!imageUrl || !message || !icon) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const imageMessage = await prisma.imageMessage.create({
    data: { imageUrl, message, icon },
  })
  return NextResponse.json(imageMessage, { status: 201 })
} 