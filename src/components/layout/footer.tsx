"use client"

import { motion } from "framer-motion"
import { Croissant } from "lucide-react"
import Link from "next/link"
import { containerVariants, itemVariants } from "@/lib/animations"
import { ScrollVelocity } from "@/components/ui/reactBits/TextAnimations/ScrollVelocity/ScrollVelocity"

export function Footer() {
  const quickLinks = ["About Us", "Our Products", "Visit Us", "Special Orders"]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-chocolate text-white py-12"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Croissant className="h-6 w-6" />
              </motion.div>
              <h4 className="text-xl font-bold">Vasse Bakery</h4>
            </div>
            <p className="text-white/70 mb-4">
              Your local destination for fresh baked goods, premium coffee, and warm hospitality in the heart of Vasse
              Village.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.div key={link} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="#" className="block text-white/70 hover:text-white transition-colors">
                    {link}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h5 className="font-semibold mb-4">Contact Info</h5>
            <div className="space-y-2 text-white/70">
              <p>12 Napoleon Promenade</p>
              <p>Vasse, Western Australia</p>
              <p>Open Daily from 6:00 AM</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Full-width ScrollVelocity section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <ScrollVelocity
          texts={["VASSE BAKERY"]}
          velocity={50}
          className="text-caramel font-bold text-6xl md:text-8xl lg:text-9xl cursor-grab active:cursor-grabbing"
          parallaxClassName="py-6"
          scrollerClassName="text-cream select-none"
          numCopies={8}
        />
      </motion.div>
      
      {/* Copyright section below ScrollVelocity */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        viewport={{ once: true }}
        className="border-t border-white/20 py-4 text-center text-white/70"
      >
        <p>&copy; {new Date().getFullYear()} Vasse Bakery. All rights reserved. Made with ❤️ in Western Australia.</p>
      </motion.div>
    </motion.footer>
  )
}
