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
  Star,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Diamond,
  Zap,
  Droplets,
  Sun,
  Moon,
  Cloud,
  ChevronDown
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

// Floating background icons component
const FloatingBackgroundIcons = () => {
  const bakeryIcons = [
    { Icon: Coffee, delay: 0, duration: 8, x: 10, y: 20 },
    { Icon: Star, delay: 2, duration: 10, x: 85, y: 15 },
    { Icon: Circle, delay: 1, duration: 12, x: 20, y: 80 },
    { Icon: Heart, delay: 3, duration: 9, x: 75, y: 75 },
    { Icon: Square, delay: 0.5, duration: 11, x: 90, y: 60 },
    { Icon: Triangle, delay: 2.5, duration: 7, x: 15, y: 40 },
    { Icon: Droplets, delay: 1.5, duration: 13, x: 80, y: 25 },
    { Icon: Hexagon, delay: 0.8, duration: 9.5, x: 5, y: 70 },
    { Icon: Diamond, delay: 3.2, duration: 8.5, x: 70, y: 85 },
    { Icon: Zap, delay: 1.8, duration: 10.5, x: 25, y: 10 },
    { Icon: Sun, delay: 0.3, duration: 9.2, x: 60, y: 30 },
    { Icon: Moon, delay: 2.8, duration: 11.8, x: 40, y: 90 },
    { Icon: Cloud, delay: 1.2, duration: 8.7, x: 95, y: 45 },
    { Icon: Gift, delay: 3.5, duration: 10.2, x: 30, y: 65 },
    { Icon: Sparkles, delay: 0.7, duration: 12.3, x: 50, y: 15 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bakeryIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon 
            className="h-8 w-8 lg:h-12 lg:w-12 text-sage/20 blur-[0.5px]" 
          />
        </motion.div>
      ))}
    </div>
  )
}

// Scroll down animation component
const ScrollDownAnimation = () => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
    >
      <motion.button
        onClick={scrollToNextSection}
        className="flex flex-col items-center space-y-2 text-sage/60 hover:text-caramel transition-colors duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center space-y-1"
        >
          <span className="text-sm font-medium tracking-wider uppercase group-hover:text-inherit">Scroll</span>
          <ChevronDown className="h-6 w-6 group-hover:text-inherit transition-colors duration-300" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-sage/40 to-transparent"
        />
      </motion.button>
    </motion.div>
  )
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
      <section className="relative min-h-[calc(100vh-73px)] flex items-center bg-gradient-to-b from-beige to-cream overflow-hidden">
        <FloatingBackgroundIcons />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-block bg-sage/20 text-chocolate px-4 py-2 rounded-full text-sm font-medium">
                Loading...
              </div>
            </div>
          </div>
        </div>
        <ScrollDownAnimation />
      </section>
    )
  }
  
  if (error || heroItems.length === 0) {
    // Fallback to original hardcoded content
    return (
      <section className="relative min-h-[calc(100vh-73px)] flex items-center bg-gradient-to-b from-beige to-cream overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-beige to-cream"
        />
        <FloatingBackgroundIcons />
        <div className="container mx-auto px-4 pt-16 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="inline-block bg-sage/20 text-chocolate px-6 py-3 rounded-full text-base font-medium"
              >
                Est. in the Heart of Vasse Village
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-bold text-chocolate leading-tight">
                Freshly Baked
                <motion.span
                  variants={itemVariants}
                  className="text-caramel block mt-2"
                  animate={{ color: ["#D6A77A", "#5C3A21", "#D6A77A"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  Every Morning
                </motion.span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg lg:text-xl text-chocolate/80 leading-relaxed max-w-2xl">
                Welcome to Vasse Bakery, your local destination for artisanal pies, pastries, fresh bread, and premium
                coffee. Located in the vibrant Vasse Village, we've been serving the Margaret River region with warmth,
                quality, and that homely touch you can taste.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-caramel hover:bg-caramel/90 text-white text-lg px-8 py-4">
                    <MapPin className="mr-3 h-6 w-6" />
                    Visit Our Bakery
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-chocolate text-chocolate hover:bg-chocolate hover:text-white text-lg px-8 py-4"
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
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="relative w-full h-[600px]">
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
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Coffee className="h-8 w-8 text-caramel" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-chocolate text-lg">Premium Coffee</p>
                    <p className="text-base text-chocolate/70">Freshly brewed daily</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <ScrollDownAnimation />
      </section>
    )
  }
  
  // Use dynamic hero content
  const currentHero = heroItems[currentIndex]
  
  return (
    <section className="relative min-h-[calc(100vh-73px)] flex items-center bg-gradient-to-b from-beige to-cream overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-beige to-cream"
      />
      <FloatingBackgroundIcons />
      <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
                      <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="inline-block bg-sage/20 text-chocolate px-6 py-3 rounded-full text-base font-medium"
              >
                Est. in the Heart of Vasse Village
              </motion.div>
              <motion.h2 
                variants={itemVariants} 
                className="text-5xl lg:text-7xl font-bold text-chocolate leading-tight"
              >
                Freshly Baked
                <motion.span
                  variants={itemVariants}
                  className="text-caramel block mt-2"
                  animate={{ color: ["#D6A77A", "#5C3A21", "#D6A77A"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  Every Morning
                </motion.span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg lg:text-xl text-chocolate/80 leading-relaxed max-w-2xl">
                Welcome to Vasse Bakery, your local destination for artisanal pies, pastries, fresh bread, and premium
                coffee. Located in the vibrant Vasse Village, we've been serving the Margaret River region with warmth,
                quality, and that homely touch you can taste.
              </motion.p>
                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-caramel hover:bg-caramel/90 text-white text-lg px-8 py-4">
                    <MapPin className="mr-3 h-6 w-6" />
                    Visit Our Bakery
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-chocolate text-chocolate hover:bg-chocolate hover:text-white text-lg px-8 py-4"
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
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div
                key={`image-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-[600px]"
              >
                <Image
                  src={currentHero.imageUrl || "/placeholder.svg?height=500&width=600"}
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
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  {currentHero.icon ? renderIcon(currentHero.icon) : <Coffee className="h-8 w-8 text-caramel" />}
                </motion.div>
                <div>
                  <p className="font-semibold text-chocolate text-lg">{currentHero.largeText}</p>
                  <p className="text-base text-chocolate/70">{currentHero.smallText || "Freshly brewed daily"}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero rotation indicators */}
          {heroItems.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
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
      </div>
      <ScrollDownAnimation />
    </section>
  )
}
