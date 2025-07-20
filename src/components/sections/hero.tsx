"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Coffee, 
  Heart, 
  Sparkles, 
  Flame, 
  Leaf, 
  Clock, 
  Utensils, 
  Gift, 
  Star 
} from "lucide-react"
import Image from "next/image"
import { containerVariants, itemVariants } from "@/lib/animations"
import { useMiscContent } from "@/hooks/useMiscContent"
import { useState, useEffect } from "react"

// Helper function to render icon from string value
const renderIcon = (iconValue: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    coffee: Coffee,
    cake: Coffee, // Using Coffee as fallback for cake
    cookie: Coffee, // Using Coffee as fallback for cookie
    heart: Heart,
    sparkles: Sparkles,
    flame: Flame,
    leaf: Leaf,
    'map-pin': MapPin,
    clock: Clock,
    utensils: Utensils,
    gift: Gift,
    star: Star,
  }
  
  const IconComponent = iconMap[iconValue] || Coffee
  return <IconComponent className="h-6 w-6 text-caramel" />
}

export function HeroSection() {
  const { miscContent, isLoading, error } = useMiscContent('hero')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Filter hero content and ensure we have valid items
  const heroItems = miscContent.filter(item => 
    item.section === 'hero' && 
    item.imageUrl && 
    item.largeText
  )
  
  // Auto-rotate through hero items if there are multiple
  useEffect(() => {
    if (heroItems.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length)
    }, 5000) // Change every 5 seconds
    
    return () => clearInterval(interval)
  }, [heroItems.length])
  
  // If no hero content or loading, show fallback
  if (isLoading) {
    return (
      <section className="relative h-[calc(100vh-73px)] flex items-center bg-gradient-to-br from-beige to-cream overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-block bg-sage/20 text-chocolate px-4 py-2 rounded-full text-sm font-medium">
                Loading...
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  if (error || heroItems.length === 0) {
    // Fallback to original hardcoded content
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
                <div className="relative w-full h-[500px]">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="Fresh baked goods at Vasse Bakery"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
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
  
  // Use dynamic hero content
  const currentHero = heroItems[currentIndex]
  
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
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl lg:text-5xl font-bold text-chocolate leading-tight"
            >
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
              <motion.div
                key={`image-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-[500px]"
              >
                <Image
                  src={currentHero.imageUrl}
                  alt={currentHero.largeText || "Hero image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
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
                  {currentHero.icon ? renderIcon(currentHero.icon) : <Coffee className="h-6 w-6 text-caramel" />}
                </motion.div>
                <div>
                  <p className="font-semibold text-chocolate">{currentHero.largeText}</p>
                  <p className="text-sm text-chocolate/70">{currentHero.smallText || "Freshly brewed daily"}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Hero rotation indicators */}
        {heroItems.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {heroItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-caramel' : 'bg-sage/30'
                }`}
                aria-label={`Go to hero ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
