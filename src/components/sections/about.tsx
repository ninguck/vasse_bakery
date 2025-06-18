"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Croissant, MapPin, Coffee } from "lucide-react"
import { containerVariants, cardVariants } from "@/lib/animations"

export function AboutSection() {
  const features = [
    {
      icon: Croissant,
      title: "Fresh Daily",
      description: "Everything is baked fresh each morning using high-quality ingredients and traditional methods.",
      bgColor: "bg-sage/20",
    },
    {
      icon: MapPin,
      title: "Local Community",
      description:
        "Proudly serving locals and tourists in the beautiful Busselton area with friendly, welcoming service.",
      bgColor: "bg-caramel/20",
    },
    {
      icon: Coffee,
      title: "Coastal Charm",
      description: "Experience the warm, rustic atmosphere that reflects the relaxed lifestyle of Western Australia.",
      bgColor: "bg-beige/60",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-chocolate mb-4">A Taste of Home in Vasse Village</h3>
          <p className="text-lg text-chocolate/70 max-w-2xl mx-auto">
            Nestled in the heart of Vasse Village shopping precinct, our bakery embodies the relaxed, coastal charm of
            the Margaret River region with every bite.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((item, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover">
              <Card className="border-sage/20 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <item.icon className="h-8 w-8 text-chocolate" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-chocolate mb-2">{item.title}</h4>
                  <p className="text-chocolate/70">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
