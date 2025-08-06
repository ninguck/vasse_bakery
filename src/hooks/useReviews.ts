import { useState, useEffect } from 'react'
import { fetchGoogleReviews, fetchReviewsFromDatabase } from '@/lib/google-reviews'

interface ReviewsData {
  overallRating: number
  totalReviews: number
  reviews: Array<{
    id: string
    authorName: string
    authorImage?: string
    rating: number
    text: string
    date: string
  }>
}

interface UseReviewsOptions {
  source: 'google' | 'database'
  placeId?: string // Required if source is 'google'
  autoFetch?: boolean
  maxReviews?: number
  minRating?: number
  requireImages?: boolean
  minLength?: number
}

export function useReviews({ 
  source, 
  placeId, 
  autoFetch = true,
  maxReviews,
  minRating,
  requireImages,
  minLength
}: UseReviewsOptions) {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = async () => {
    if (source === 'google' && !placeId) {
      setError('Place ID is required for Google Reviews')
      return
    }

    setLoading(true)
    setError(null)

    try {
      let reviewsData: ReviewsData

      if (source === 'google') {
        reviewsData = await fetchGoogleReviews(placeId!, {
          maxReviews,
          minRating,
          requireImages,
          minLength
        })
      } else {
        reviewsData = await fetchReviewsFromDatabase()
      }

      setData(reviewsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchReviews()
    }
  }, [source, placeId, autoFetch])

  return {
    data,
    loading,
    error,
    refetch: fetchReviews
  }
} 