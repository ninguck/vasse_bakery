"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { MapPin, Clock, Phone } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/animations"

export function LocationSection() {
  const locationInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "12 Napoleon Promenade\nVasse, Western Australia",
      bgColor: "bg-caramel/20",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      content: "Monday - Friday: 6:00 AM - 4:00 PM\nSaturday - Sunday: 6:30 AM - 3:00 PM",
      bgColor: "bg-sage/20",
    },
    {
      icon: Phone,
      title: "Contact",
      content: "Call us for special orders\nor any inquiries",
      bgColor: "bg-beige/60",
    },
  ]

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
                    <item.icon className="h-6 w-6 text-chocolate" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-chocolate mb-1">{item.title}</h4>
                    {item.title === "Address" ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <p className="text-chocolate/70 underline decoration-dotted cursor-help whitespace-pre-line">
                            {item.content}
                          </p>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex justify-between space-x-4"
                          >
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">Vasse Village</h4>
                              <p className="text-sm">
                                Located in the vibrant Vasse Village shopping precinct, surrounded by local shops and
                                cafes.
                              </p>
                              <div className="flex items-center pt-2">
                                <MapPin className="h-4 w-4 opacity-70 mr-1" />
                                <span className="text-xs text-muted-foreground">15 minutes from Busselton</span>
                              </div>
                            </div>
                          </motion.div>
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <p className="text-chocolate/70 whitespace-pre-line">{item.content}</p>
                    )}
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
