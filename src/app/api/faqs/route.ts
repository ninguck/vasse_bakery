import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/faqs - Get all FAQs
export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        })

        return NextResponse.json(faqs)
    } catch (error) {
        console.error('Error fetching FAQs:', error)
        return NextResponse.json(
        { error: 'Failed to fetch FAQs' },
        { status: 500 }
        )
    }
    }

    // POST /api/faqs - Create a new FAQ
    export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { question, answer } = body

        // Validate required fields
        if (!question || !answer) {
        return NextResponse.json(
            { error: 'Question and answer are required' },
            { status: 400 }
        )
        }

        const faq = await prisma.fAQ.create({
        data: {
            question: question.trim(),
            answer: answer.trim(),
        },
        })

        return NextResponse.json(faq, { status: 201 })
    } catch (error) {
        console.error('Error creating FAQ:', error)
        return NextResponse.json(
        { error: 'Failed to create FAQ' },
        { status: 500 }
        )
    }
} 