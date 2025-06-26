import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/products - Get all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
        include: {
            category: true,
            menuItems: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        })

        return NextResponse.json(products)
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
        )
    }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title, description, imageUrl, badgeText, badgeColor, badgeIcon, categoryId } = body

        // Validate required fields
        if (!title || !description || !imageUrl) {
        return NextResponse.json(
            { error: 'Title, description, and imageUrl are required' },
            { status: 400 }
        )
        }

        const product = await prisma.product.create({
        data: {
            title,
            description,
            imageUrl,
            badgeText,
            badgeColor,
            badgeIcon,
            categoryId: categoryId || null,
        },
        include: {
            category: true,
            menuItems: true,
        },
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
        )
    }
} 