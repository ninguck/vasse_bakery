import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // This is a placeholder - you'll need to create a reviews table in your database
    // For now, returning sample data
    const reviews = [
      {
        id: "1",
        authorName: "Sarah Johnson",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "The sourdough bread here is absolutely incredible! Fresh every morning and the perfect texture. The staff is so friendly and the coffee is top-notch too.",
        date: "2024-01-15"
      },
      {
        id: "2",
        authorName: "Michael Chen",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Best bakery in the area! Their croissants are flaky perfection and the cinnamon rolls are to die for. Highly recommend stopping by for breakfast.",
        date: "2024-01-10"
      },
      {
        id: "3",
        authorName: "Emma Davis",
        authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4,
        text: "Love the cozy atmosphere and the smell of fresh bread. The sandwiches are delicious and the prices are reasonable. Great local spot!",
        date: "2024-01-08"
      }
    ]

    // Calculate overall rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const overallRating = totalRating / reviews.length

    return NextResponse.json({
      overallRating: Math.round(overallRating * 10) / 10, // Round to 1 decimal place
      totalReviews: reviews.length,
      reviews
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
} 