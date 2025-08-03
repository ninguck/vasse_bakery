"use client"

import { motion } from "framer-motion"
import { Clock, Heart } from "lucide-react"
import { containerVariants } from "@/lib/animations"
import Image from "next/image"
import { useMiscContent } from "@/hooks/useMiscContent"

export function OurStory() {
  const { miscContent, isLoading, error } = useMiscContent()

  // Filter content by section and parse milestone data
  const ourStoryContent = miscContent.filter(item => item.section === 'our-story')
  
  const historyMilestones = ourStoryContent.map(item => {
    try {
      if (item.message) {
        const milestoneData = JSON.parse(item.message)
        return {
          year: milestoneData.year || '',
          title: milestoneData.title || item.largeText || '',
          description: milestoneData.description || '',
          image: milestoneData.imageUrl || item.imageUrl || "/placeholder.svg?height=200&width=300&text=Milestone",
          imageAlt: milestoneData.imageAlt || "Timeline milestone"
        }
      }
      return {
        year: '',
        title: item.largeText || '',
        description: '',
        image: item.imageUrl || "/placeholder.svg?height=200&width=300&text=Milestone",
        imageAlt: "Timeline milestone"
      }
    } catch (error) {
      return {
        year: '',
        title: item.largeText || '',
        description: '',
        image: item.imageUrl || "/placeholder.svg?height=200&width=300&text=Milestone",
        imageAlt: "Timeline milestone"
      }
    }
  }).filter(milestone => milestone.title && milestone.description) // Only show milestones with content

  // Show loading state
  if (isLoading) {
    return (
      <section id="our-story" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-beige/10 to-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-caramel"></div>
            <span className="ml-4 text-chocolate">Loading our story...</span>
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error) {
    return (
      <section id="our-story" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-beige/10 to-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center py-12">
            <p className="text-chocolate/70">Unable to load our story at this time.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="our-story" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-beige/10 to-white relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="w-12 h-12 bg-caramel/20 rounded-full flex items-center justify-center mr-4"
                >
                  <Heart className="h-6 w-6 text-chocolate" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate">Our Story</h3>
              </div>
              <p className="text-chocolate/80 leading-relaxed mb-6 text-sm sm:text-base">
                What started as a dream between two passionate food lovers has grown into the heart of Vasse Village.
                Sarah and Michael Thompson opened Vasse Bakery with a simple mission: to create a place where the
                community could gather over exceptional baked goods and great coffee.
              </p>
              <p className="text-chocolate/80 leading-relaxed text-sm sm:text-base">
                Every recipe tells a story, from Sarah's grandmother's sourdough starter that still lives in our kitchen
                today, to the innovative fusion of traditional European techniques with local Australian ingredients.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src="/placeholder.svg?height=400&width=500&text=Bakery+Interior"
                  alt="Inside Vasse Bakery"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/20 to-transparent"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline Section */}
        {historyMilestones.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 sm:mb-20"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mr-4"
                >
                  <Clock className="h-6 w-6 text-chocolate" />
                </motion.div>
                <h4 className="text-2xl sm:text-3xl font-bold text-chocolate">Our Journey</h4>
              </div>
              <p className="text-chocolate/70 max-w-2xl mx-auto text-sm sm:text-base">
                From humble beginnings to becoming a cornerstone of the Vasse community
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-caramel/30 transform sm:-translate-x-1/2"></div>

              <div className="space-y-8 sm:space-y-12">
                {historyMilestones.map((milestone, index) => (
                  <motion.div
                    key={`${milestone.year}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="absolute left-4 sm:left-1/2 w-4 h-4 bg-caramel rounded-full transform sm:-translate-x-1/2 z-10 border-4 border-white shadow-lg"
                    />

                    {/* Image */}
                    <div className={`hidden sm:block sm:w-1/2 ${index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"}`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-xl overflow-hidden shadow-lg"
                      >
                        <Image
                          src={milestone.image}
                          alt={milestone.imageAlt}
                          width={400}
                          height={300}
                          className="w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/10 to-transparent"></div>
                      </motion.div>
                    </div>

                    {/* Text Content */}
                    <div className={`ml-12 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pl-8" : "sm:pr-8"}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: index % 2 === 0 ? -5 : 5 }}
                        className="bg-white p-6 rounded-xl shadow-lg border border-sage/20"
                      >
                        <div className="flex items-center mb-3">
                          <span className="text-2xl font-bold text-caramel mr-3">{milestone.year}</span>
                          <h5 className="text-lg font-semibold text-chocolate">{milestone.title}</h5>
                        </div>
                        <p className="text-chocolate/70 text-sm sm:text-base">{milestone.description}</p>
                      </motion.div>
                    </div>

                    {/* Mobile: Image below text */}
                    <div className="sm:hidden w-full mt-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-lg overflow-hidden shadow-lg"
                      >
                        <Image
                          src={milestone.image}
                          alt={milestone.imageAlt}
                          width={400}
                          height={300}
                          className="w-full h-56 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/10 to-transparent"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
} 