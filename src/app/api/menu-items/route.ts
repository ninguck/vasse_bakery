import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/menu-items - Get all menu items
export async function GET() {
    try {
        const menuItems = await prisma.menuItem.findMany({
        include: {
            product: true,
            category: true,
        },
        orderBy: [
            { category: { name: 'asc' } },
            { name: 'asc' },
        ],
        })

        return NextResponse.json(menuItems)
    } catch (error) {
        console.error('Error fetching menu items:', error)
        return NextResponse.json(
        { error: 'Failed to fetch menu items' },
        { status: 500 }
        )
    }
}

// POST /api/menu-items - Create a new menu item
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, description, price, productId, categoryId } = body

        // Validate required fields
        if (!name || !description || price === undefined || price === null) {
        return NextResponse.json(
            { error: 'Name, description, and price are required' },
            { status: 400 }
        )
        }

        // Validate price is a positive number
        if (typeof price !== 'number' || price < 0) {
        return NextResponse.json(
            { error: 'Price must be a positive number' },
            { status: 400 }
        )
        }

        // Check if at least one of productId or categoryId is provided
        if (!productId && !categoryId) {
        return NextResponse.json(
            { error: 'Either productId or categoryId must be provided' },
            { status: 400 }
        )
        }

        // Validate productId if provided
        if (productId) {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        })
        if (!product) {
            return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
            )
        }
        }

        // Validate categoryId if provided
        if (categoryId) {
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        })
        if (!category) {
            return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
            )
        }
        }

        const menuItem = await prisma.menuItem.create({
        data: {
            name: name.trim(),
            description: description.trim(),
            price,
            productId: productId || null,
            categoryId: categoryId || null,
        },
        include: {
            product: true,
            category: true,
        },
        })

        return NextResponse.json(menuItem, { status: 201 })
    } catch (error) {
        console.error('Error creating menu item:', error)
        return NextResponse.json(
        { error: 'Failed to create menu item' },
        { status: 500 }
        )
    }
} 