import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/products/[id] - Get a specific product
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: {
            category: true,
            menuItems: true,
        },
        })

        if (!product) {
        return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
        )
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error('Error fetching product:', error)
        return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
        )
    }
}

// PUT /api/products/[id] - Update a specific product
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const body = await request.json()
        const { title, description, imageUrl, badgeText, badgeColor, badgeIcon, categoryId } = body

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
        where: { id: params.id },
        })

        if (!existingProduct) {
        return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
        )
        }

        // Validate required fields
        if (!title || !description || !imageUrl) {
        return NextResponse.json(
            { error: 'Title, description, and imageUrl are required' },
            { status: 400 }
        )
        }

        const updatedProduct = await prisma.product.update({
        where: { id: params.id },
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

        return NextResponse.json(updatedProduct)
    } catch (error) {
        console.error('Error updating product:', error)
        return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
        )
    }
}

// DELETE /api/products/[id] - Delete a specific product
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
        where: { id: params.id },
        })

        if (!existingProduct) {
        return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
        )
        }

        // Delete the product (this will also delete related menu items due to cascade)
        await prisma.product.delete({
        where: { id: params.id },
        })

        return NextResponse.json(
        { message: 'Product deleted successfully' },
        { status: 200 }
        )
    } catch (error) {
        console.error('Error deleting product:', error)
        return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
        )
    }
} 