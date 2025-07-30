"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, Heart } from "lucide-react"
import { containerVariants, cardVariants } from "@/lib/animations"
import Image from "next/image"

export function OurStory() {
  const historyMilestones = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Founded by Sarah and Michael Thompson with a dream to bring artisanal baking to Vasse Village.",
    },
    {
      year: "2019",
      title: "Community Favorite",
      description: "Became the go-to spot for locals, winning 'Best Bakery' in the Margaret River Region.",
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Added our signature sushi bar and expanded seating to accommodate our growing family of customers.",
    },
    {
      year: "2024",
      title: "Today",
      description:
        "Continuing to serve the community with the same passion and commitment to quality that started it all.",
    },
  ]

  const teamMembers = [
    {
      name: "Sarah Thompson",
      role: "Head Baker & Co-Owner",
      description: "With 15 years of baking experience, Sarah brings European techniques to every loaf and pastry.",
      image: "/placeholder.svg?height=200&width=200&text=Sarah",
    },
    {
      name: "Michael Thompson",
      role: "Business Manager & Co-Owner",
      description: "Michael ensures every customer feels welcome while maintaining our high standards of service.",
      image: "/placeholder.svg?height=200&width=200&text=Michael",
    },
    {
      name: "Emma Chen",
      role: "Pastry Chef",
      description: "Emma's creative flair brings innovative seasonal pastries and beautiful custom cakes to life.",
      image: "/placeholder.svg?height=200&width=200&text=Emma",
    },
  ]

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
                  key={milestone.year}
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

                  {/* Content */}
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
                      className="bg-white p-6 rounded-xl shadow-lg border border-sage/20"
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-2xl font-bold text-caramel mr-3">{milestone.year}</span>
                        <h5 className="text-lg font-semibold text-chocolate">{milestone.title}</h5>
                      </div>
                      <p className="text-chocolate/70 text-sm sm:text-base">{milestone.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Meet Our Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-12 h-12 bg-beige/60 rounded-full flex items-center justify-center mr-4"
              >
                <Users className="h-6 w-6 text-chocolate" />
              </motion.div>
              <h4 className="text-2xl sm:text-3xl font-bold text-chocolate">Meet Our Team</h4>
            </div>
            <p className="text-chocolate/70 max-w-2xl mx-auto text-sm sm:text-base">
              The passionate people behind every delicious creation
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={member.name} variants={cardVariants} whileHover="hover">
                <Card className="border-sage/20 hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden"
                    >
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="w-full h-48 sm:h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-chocolate/40 to-transparent"></div>
                    </motion.div>
                    <div className="p-4 sm:p-6">
                      <h5 className="text-lg sm:text-xl font-bold text-chocolate mb-1">{member.name}</h5>
                      <p className="text-caramel font-medium mb-3 text-sm sm:text-base">{member.role}</p>
                      <p className="text-chocolate/70 text-sm sm:text-base">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 