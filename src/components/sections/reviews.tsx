"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useReviews } from "@/hooks/useReviews"

interface ReviewsSectionProps {
  source?: 'google' | 'database'
  placeId?: string // Required if source is 'google'
  googleReviewsUrl?: string // URL for the "Leave a Review" button
  maxReviews?: number
  minRating?: number
  requireImages?: boolean
  minLength?: number
}

export function ReviewsSection({ 
  source = 'google', 
  placeId, 
  googleReviewsUrl = 'https://g.page/r/CQ...',
  maxReviews = 6,
  minRating = 0,
  requireImages = false,
  minLength = 20
}: ReviewsSectionProps) {
  const { data, loading, error } = useReviews({ 
    source, 
    placeId, 
    autoFetch: true,
    maxReviews,
    minRating,
    requireImages,
    minLength
  })

  console.log('ReviewsSection Debug:', {
    source,
    placeId,
    loading,
    error,
    hasData: !!data,
    dataLength: data?.reviews?.length || 0
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">Failed to load reviews: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-chocolate text-white px-6 py-3 rounded-lg font-semibold hover:bg-chocolate/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  // Use fallback data if no data is available
  const reviewsData = data || {
    overallRating: 4.8,
    totalReviews: 127,
    reviews: [
      {
        id: "fallback-1",
        authorName: "Sarah Johnson",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "The sourdough bread here is absolutely incredible! Fresh every morning and the perfect texture.",
        date: "2024-01-15"
      },
      {
        id: "fallback-2",
        authorName: "Michael Chen",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Best bakery in the area! Their croissants are flaky perfection and the cinnamon rolls are to die for.",
        date: "2024-01-10"
      }
    ]
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-cream"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-chocolate mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {renderStars(reviewsData.overallRating)}
            <span className="text-lg font-semibold text-chocolate ml-2">
              {reviewsData.overallRating.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-600">
            Based on {reviewsData.totalReviews} Google Reviews
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Review Header */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage 
                    src={review.authorImage} 
                    alt={review.authorName}
                    onError={(e) => {
                      // Hide the image on error and show fallback
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <AvatarFallback className="bg-chocolate text-white">
                    {review.authorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-chocolate">{review.authorName}</h4>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 line-clamp-4">
                "{review.text}"
              </p>

              {/* Review Date */}
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA to leave review */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Had a great experience? Share your thoughts with us!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-chocolate text-white px-6 py-3 rounded-lg font-semibold hover:bg-chocolate/90 transition-colors"
            onClick={() => window.open(googleReviewsUrl, '_blank')}
          >
            Leave a Review
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
} 