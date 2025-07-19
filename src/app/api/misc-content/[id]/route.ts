import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/misc-content/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const item = await prisma.miscContent.findUnique({ where: { id } })
  if (!item) return NextResponse.json(null, { status: 404 })
  return NextResponse.json(item)
}

// PUT /api/misc-content/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json()
  const { section, imageUrl, icon, largeText, smallText, message } = body
  if (section === undefined || section === null || section === "") {
    return NextResponse.json({ error: 'Section is required' }, { status: 400 })
  }
  try {
    const updated = await prisma.miscContent.update({
      where: { id },
      data: { section, imageUrl, icon, largeText, smallText, message },
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Not found or update failed' }, { status: 404 })
  }
}

// DELETE /api/misc-content/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const deleted = await prisma.miscContent.delete({ where: { id } })
    return NextResponse.json(deleted)
  } catch (error) {
    return NextResponse.json({ error: 'Not found or delete failed' }, { status: 404 })
  }
} 