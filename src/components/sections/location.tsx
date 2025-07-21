"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Coffee, Heart, Sparkles, Flame, Leaf, Utensils, Gift, Star } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/animations"
import { useMiscContent } from "@/hooks/useMiscContent"

// Helper function to render icon from string value
const renderIcon = (iconValue: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'map-pin': MapPin,
    clock: Clock,
    coffee: Coffee,
    heart: Heart,
    sparkles: Sparkles,
    flame: Flame,
    leaf: Leaf,
    utensils: Utensils,
    gift: Gift,
    star: Star,
  }
  // Defensive: fallback to MapPin if icon is not found
  const IconComponent = iconMap[iconValue] || MapPin
  return <IconComponent className="h-6 w-6 text-chocolate" />
}

export function LocationSection() {
  const { miscContent, isLoading, error } = useMiscContent('location')
  
  // Filter location content
  const locationItems = miscContent.filter(item => item.section === 'location')
  
  // Fallback location info if no data or loading
  const fallbackLocationInfo = [
    {
      icon: "map-pin",
      title: "Address",
      content: "12 Napoleon Promenade\nVasse, Western Australia",
      bgColor: "bg-caramel/20",
    },
    {
      icon: "clock",
      title: "Opening Hours",
      content: "Monday - Friday: 6:00 AM - 4:00 PM\nSaturday - Sunday: 6:30 AM - 3:00 PM",
      bgColor: "bg-sage/20",
    },
    {
      icon: "star",
      title: "Contact",
      content: "Call us for special orders\nor any inquiries",
      bgColor: "bg-beige/60",
    },
  ]

  // Use dynamic data if available, otherwise use fallback
  const locationInfo = locationItems.length > 0 
    ? locationItems.map(item => ({
        icon: item.icon || "map-pin",
        title: item.largeText || "Location Info",
        content: item.message || "",
        bgColor: "bg-caramel/20", // Default color
      }))
      // Ensure order: Address, Opening Hours, Contact
      .sort((a, b) => {
        const order = ["Address", "Opening Hours", "Contact"];
        return order.indexOf(a.title) - order.indexOf(b.title);
      })
    : fallbackLocationInfo

  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-chocolate mb-6">Visit Us in Vasse Village</h3>
            <p className="text-lg text-chocolate/70 mb-8">
              Find us at the heart of Vasse Village shopping precinct, where community meets quality. We're easily
              accessible and surrounded by the charm of this vibrant local area.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {locationInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    {renderIcon(item.icon)}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-chocolate mb-1">{item.title}</h4>
                    <p className="text-chocolate/70 whitespace-pre-line">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-caramel hover:bg-caramel/90 text-white">
                  Get Directions
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-sage/10 rounded-2xl p-8 h-96 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <MapPin className="h-16 w-16 text-caramel mx-auto mb-4" />
                </motion.div>
                <h4 className="text-xl font-semibold text-chocolate mb-2">Interactive Map</h4>
                <p className="text-chocolate/70">Located in the heart of Vasse Village</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
