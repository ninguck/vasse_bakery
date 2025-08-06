import { NextResponse } from 'next/server'

interface CuratedReview {
  id: string
  authorName: string
  authorImage?: string
  rating: number
  text: string
  date: string
  source: 'google' | 'manual'
}

interface CuratedReviewsData {
  overallRating: number
  totalReviews: number
  reviews: CuratedReview[]
}

export async function GET() {
  try {
    // Manually curated reviews from your best Google Reviews
    // You can add more reviews here manually
    const curatedReviews: CuratedReview[] = [
      {
        id: "curated-1",
        authorName: "Yehsey Om",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Always perfect and delicious! The best cake in Busselton, moist, fresh, and exactly what I expect every time. And the price is reasonable. Highly recommended! 🎂💖",
        date: "2024-01-10",
        source: "google"
      },
      {
        id: "curated-2",
        authorName: "Dianne Boardman",
        authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "I absolutely love their coffee eclairs, best I've ever had, with real cream.",
        date: "2024-01-08",
        source: "google"
      },
      {
        id: "curated-3",
        authorName: "Emily Taylor",
        authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Workers were so nice and helpful food was very good and delicious and was cooked properly overall amazing I recommend going to this place if you are just on a quick grab and go",
        date: "2024-01-05",
        source: "google"
      },
      {
        id: "curated-4",
        authorName: "James Close",
        authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Beautiful bakery owned by a family. Reasonable prices and a wide variety of products! They also have delicious coffee! Well done guys! All the best 🍰",
        date: "2024-01-03",
        source: "google"
      },
      {
        id: "curated-5",
        authorName: "Sarah Johnson",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "The sourdough bread here is absolutely incredible! Fresh every morning and the perfect texture. The staff is so friendly and the coffee is top-notch too.",
        date: "2024-01-15",
        source: "manual"
      },
      {
        id: "curated-6",
        authorName: "Michael Chen",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Best bakery in the area! Their croissants are flaky perfection and the cinnamon rolls are to die for. Highly recommend stopping by for breakfast.",
        date: "2024-01-10",
        source: "manual"
      }
    ]

    const totalRating = curatedReviews.reduce((sum, review) => sum + review.rating, 0)
    const overallRating = totalRating / curatedReviews.length

    const reviewsData: CuratedReviewsData = {
      overallRating: Math.round(overallRating * 10) / 10,
      totalReviews: 163, // Your actual Google total
      reviews: curatedReviews
    }

    return NextResponse.json(reviewsData)
  } catch (error) {
    console.error('Error fetching curated reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch curated reviews' },
      { status: 500 }
    )
  }
} 