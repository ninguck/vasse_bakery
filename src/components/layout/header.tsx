"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Croissant } from "lucide-react"
import Link from "next/link"

export function Header() {
  const { scrollY } = useScroll()

  // Transform values for scroll-based animations
  const logoScale = useTransform(scrollY, [0, 100], [1.3, 1])
  const logoY = useTransform(scrollY, [0, 100], [60, 0])
  const iconSize = useTransform(scrollY, [0, 100], [40, 32]) // h-10 to h-8
  const textSize = useTransform(scrollY, [0, 100], [28, 24]) // text-3xl to text-2xl
  const navY = useTransform(scrollY, [0, 100], [60, 0])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-beige sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ y: navY }}
            className="hidden md:flex items-center space-x-8"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="text-chocolate hover:text-caramel transition-colors font-medium text-lg"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-chocolate hover:text-caramel transition-colors font-medium text-lg"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('our-story')}
              className="text-chocolate hover:text-caramel transition-colors font-medium text-lg"
            >
              Our Story
            </button>
          </motion.nav>

          {/* Centered Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ scale: logoScale, y: logoY }}
            className="flex items-center space-x-2"
          >
            <motion.div style={{ width: iconSize, height: iconSize }}>
              <Croissant className="w-full h-full text-[#E6C366]" />
            </motion.div>
            <div>
              <motion.h1 
                style={{ fontSize: textSize }}
                className="font-bold text-chocolate leading-tight"
              >
                Vasse Bakery
              </motion.h1>
              <p className="text-sm text-caramel">Fresh • Local • Delicious</p>
            </div>
          </motion.div>

          {/* Right side navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ y: navY }}
            className="hidden md:flex items-center space-x-8"
          >
            <button
              onClick={() => scrollToSection('location')}
              className="text-chocolate hover:text-caramel transition-colors font-medium text-lg"
            >
              Visit Us
            </button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollToSection('products')}
                className="bg-caramel hover:bg-caramel/90 text-white"
              >
                Order Now
              </Button>
            </motion.div>
          </motion.nav>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden"
          >
            <Button variant="outline" size="sm" className="border-chocolate text-chocolate">
              Menu
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
