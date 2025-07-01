import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/categories/[id] - Get a specific category
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const category = await prisma.category.findUnique({
        where: { id: params.id },
        include: {
            products: true,
            menuItems: true,
        },
        })

        if (!category) {
        return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
        )
        }

        return NextResponse.json(category)
    } catch (error) {
        console.error('Error fetching category:', error)
        return NextResponse.json(
        { error: 'Failed to fetch category' },
        { status: 500 }
        )
    }
}

// PUT /api/categories/[id] - Update a specific category
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const body = await request.json()
        const { name } = body

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
        where: { id: params.id },
        })

        if (!existingCategory) {
        return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
        )
        }

        // Validate required fields
        if (!name) {
        return NextResponse.json(
            { error: 'Category name is required' },
            { status: 400 }
        )
        }

        // Check if another category with the same name exists
        const duplicateCategory = await prisma.category.findFirst({
        where: {
            name: name.trim(),
            id: { not: params.id },
        },
        })

        if (duplicateCategory) {
        return NextResponse.json(
            { error: 'Category with this name already exists' },
            { status: 409 }
        )
        }

        const updatedCategory = await prisma.category.update({
        where: { id: params.id },
        data: {
            name: name.trim(),
        },
        include: {
            products: true,
            menuItems: true,
        },
        })

        return NextResponse.json(updatedCategory)
    } catch (error) {
        console.error('Error updating category:', error)
        return NextResponse.json(
        { error: 'Failed to update category' },
        { status: 500 }
        )
    }
}

// DELETE /api/categories/[id] - Delete a specific category
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
        where: { id: params.id },
        include: {
            products: true,
            menuItems: true,
        },
        })

        if (!existingCategory) {
        return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
        )
        }

        // Check if category has associated products or menu items
        if (existingCategory.products.length > 0 || existingCategory.menuItems.length > 0) {
        return NextResponse.json(
            { 
            error: 'Cannot delete category with associated products or menu items. Please remove or reassign them first.' 
            },
            { status: 400 }
        )
        }

        // Delete the category
        await prisma.category.delete({
        where: { id: params.id },
        })

        return NextResponse.json(
        { message: 'Category deleted successfully' },
        { status: 200 }
        )
    } catch (error) {
        console.error('Error deleting category:', error)
        return NextResponse.json(
        { error: 'Failed to delete category' },
        { status: 500 }
        )
    }
} 