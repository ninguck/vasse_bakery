"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-r from-caramel to-chocolate text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-bold mb-4"
        >
          Experience the Warmth of Vasse Bakery
        </motion.h3>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
        >
          Join our community of locals and visitors who start their day with our fresh baked goods and premium coffee.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-white text-chocolate hover:bg-cream">
              Order for Pickup
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-chocolate">
              View Full Menu
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
