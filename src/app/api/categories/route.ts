import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/categories - Get all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
        include: {
            products: true,
            menuItems: true,
        },
        orderBy: {
            name: 'asc',
        },
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
        )
    }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name } = body

        // Validate required fields
        if (!name) {
        return NextResponse.json(
            { error: 'Category name is required' },
            { status: 400 }
        )
        }

        // Check if category already exists
        const existingCategory = await prisma.category.findFirst({
        where: { name: name.trim() },
        })

        if (existingCategory) {
        return NextResponse.json(
            { error: 'Category with this name already exists' },
            { status: 409 }
        )
        }

        const category = await prisma.category.create({
        data: {
            name: name.trim(),
        },
        include: {
            products: true,
            menuItems: true,
        },
        })

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json(
        { error: 'Failed to create category' },
        { status: 500 }
        )
    }
} 