"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, Coffee } from "lucide-react"
import Image from "next/image"
import { containerVariants, itemVariants } from "@/lib/animations"

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-73px)] flex items-center bg-gradient-to-br from-beige to-cream overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-beige to-cream"
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block bg-sage/20 text-chocolate px-4 py-2 rounded-full text-sm font-medium"
            >
              Est. in the Heart of Vasse Village
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-chocolate leading-tight">
              Freshly Baked
              <motion.span
                variants={itemVariants}
                className="text-caramel block"
                animate={{ color: ["#D6A77A", "#5C3A21", "#D6A77A"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                Every Morning
              </motion.span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-chocolate/80 leading-relaxed">
              Welcome to Vasse Bakery, your local destination for artisanal pies, pastries, fresh bread, and premium
              coffee. Located in the vibrant Vasse Village, we've been serving the Margaret River region with warmth,
              quality, and that homely touch you can taste.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-caramel hover:bg-caramel/90 text-white">
                  <MapPin className="mr-2 h-5 w-5" />
                  Visit Our Bakery
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-chocolate text-chocolate hover:bg-chocolate hover:text-white"
                >
                  View Our Menu
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Fresh baked goods at Vasse Bakery"
                width={600}
                height={500}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate/20 to-transparent"></div>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Coffee className="h-6 w-6 text-caramel" />
                </motion.div>
                <div>
                  <p className="font-semibold text-chocolate">Premium Coffee</p>
                  <p className="text-sm text-chocolate/70">Freshly brewed daily</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
