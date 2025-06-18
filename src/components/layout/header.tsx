"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Croissant } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b border-sage/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <Croissant className="h-8 w-8 text-[#E6C366]" />
            <div>
              <h1 className="text-2xl font-bold text-chocolate">Vasse Bakery</h1>
              <p className="text-sm text-caramel">Fresh • Local • Delicious</p>
            </div>
          </motion.div>
          <motion.nav
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center space-x-6"
          >
            <Link href="#about" className="text-chocolate hover:text-caramel transition-colors">
              About
            </Link>
            <Link href="#products" className="text-chocolate hover:text-caramel transition-colors">
              Products
            </Link>
            <Link href="#location" className="text-chocolate hover:text-caramel transition-colors">
              Visit Us
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-caramel hover:bg-caramel/90 text-white">Order Now</Button>
            </motion.div>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  )
}
