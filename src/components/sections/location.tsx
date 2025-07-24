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
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.311279855223!2d115.250711!3d-33.6750032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a2e471e84c5907f%3A0xace1499655a819c!2sVasse%20Bakery!5e0!3m2!1sen!2sau!4v1753355570233!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vasse Bakery Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
