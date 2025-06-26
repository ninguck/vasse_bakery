import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/faqs/[id] - Get a specific FAQ
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const faq = await prisma.fAQ.findUnique({
        where: { id: params.id },
        })

        if (!faq) {
        return NextResponse.json(
            { error: 'FAQ not found' },
            { status: 404 }
        )
        }

        return NextResponse.json(faq)
    } catch (error) {
        console.error('Error fetching FAQ:', error)
        return NextResponse.json(
        { error: 'Failed to fetch FAQ' },
        { status: 500 }
        )
    }
}

// PUT /api/faqs/[id] - Update a specific FAQ
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const body = await request.json()
        const { question, answer } = body

        // Check if FAQ exists
        const existingFAQ = await prisma.fAQ.findUnique({
        where: { id: params.id },
        })

        if (!existingFAQ) {
        return NextResponse.json(
            { error: 'FAQ not found' },
            { status: 404 }
        )
        }

        // Validate required fields
        if (!question || !answer) {
        return NextResponse.json(
            { error: 'Question and answer are required' },
            { status: 400 }
        )
        }

        const updatedFAQ = await prisma.fAQ.update({
        where: { id: params.id },
        data: {
            question: question.trim(),
            answer: answer.trim(),
        },
        })

        return NextResponse.json(updatedFAQ)
    } catch (error) {
        console.error('Error updating FAQ:', error)
        return NextResponse.json(
        { error: 'Failed to update FAQ' },
        { status: 500 }
        )
    }
}

// DELETE /api/faqs/[id] - Delete a specific FAQ
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        // Check if FAQ exists
        const existingFAQ = await prisma.fAQ.findUnique({
        where: { id: params.id },
        })

        if (!existingFAQ) {
        return NextResponse.json(
            { error: 'FAQ not found' },
            { status: 404 }
        )
        }

        // Delete the FAQ
        await prisma.fAQ.delete({
        where: { id: params.id },
        })

        return NextResponse.json(
        { message: 'FAQ deleted successfully' },
        { status: 200 }
        )
    } catch (error) {
        console.error('Error deleting FAQ:', error)
        return NextResponse.json(
        { error: 'Failed to delete FAQ' },
        { status: 500 }
        )
    }
} 