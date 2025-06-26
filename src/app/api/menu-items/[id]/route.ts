import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/menu-items/[id] - Get a specific menu item
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const menuItem = await prisma.menuItem.findUnique({
        where: { id: params.id },
        include: {
            product: true,
            category: true,
        },
        })

        if (!menuItem) {
        return NextResponse.json(
            { error: 'Menu item not found' },
            { status: 404 }
        )
        }

        return NextResponse.json(menuItem)
    } catch (error) {
        console.error('Error fetching menu item:', error)
        return NextResponse.json(
        { error: 'Failed to fetch menu item' },
        { status: 500 }
        )
    }
}

// PUT /api/menu-items/[id] - Update a specific menu item
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const body = await request.json()
        const { name, description, price, productId, categoryId } = body

        // Check if menu item exists
        const existingMenuItem = await prisma.menuItem.findUnique({
        where: { id: params.id },
        })

        if (!existingMenuItem) {
        return NextResponse.json(
            { error: 'Menu item not found' },
            { status: 404 }
        )
        }

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

        const updatedMenuItem = await prisma.menuItem.update({
        where: { id: params.id },
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

        return NextResponse.json(updatedMenuItem)
    } catch (error) {
        console.error('Error updating menu item:', error)
        return NextResponse.json(
        { error: 'Failed to update menu item' },
        { status: 500 }
        )
    }
}

// DELETE /api/menu-items/[id] - Delete a specific menu item
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        // Check if menu item exists
        const existingMenuItem = await prisma.menuItem.findUnique({
        where: { id: params.id },
        })

        if (!existingMenuItem) {
        return NextResponse.json(
            { error: 'Menu item not found' },
            { status: 404 }
        )
        }

        // Delete the menu item
        await prisma.menuItem.delete({
        where: { id: params.id },
        })

        return NextResponse.json(
        { message: 'Menu item deleted successfully' },
        { status: 200 }
        )
    } catch (error) {
        console.error('Error deleting menu item:', error)
        return NextResponse.json(
        { error: 'Failed to delete menu item' },
        { status: 500 }
        )
    }
} 