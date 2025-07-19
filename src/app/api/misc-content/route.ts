import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/misc-content?section=hero
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section')
  const where = section ? { section } : undefined
  const items = await prisma.miscContent.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(items)
}

// POST /api/misc-content
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { section, imageUrl, icon, largeText, smallText, message } = body
  if (!section) {
    return NextResponse.json({ error: 'Section is required' }, { status: 400 })
  }
  const item = await prisma.miscContent.create({
    data: { section, imageUrl, icon, largeText, smallText, message },
  })
  return NextResponse.json(item, { status: 201 })
} 