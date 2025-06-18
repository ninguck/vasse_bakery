"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Coffee, Cake, CroissantIcon as Bread, PieChart } from "lucide-react"
import Image from "next/image"
import { PRODUCT_DETAILS } from "@/lib/data"
import { containerVariants, itemVariants, modalVariants } from "@/lib/animations"

interface ProductsSectionProps {
  selectedProduct: string | null
  setSelectedProduct: (product: string | null) => void
}

export function ProductsSection({ selectedProduct, setSelectedProduct }: ProductsSectionProps) {
  const products = [
    {
      key: "pies",
      title: "Artisanal Pies",
      description: "Savory and sweet pies made with premium ingredients and traditional recipes.",
      image: "/placeholder.svg?height=250&width=300&text=Fresh Pies",
      badge: { icon: PieChart, text: "Pies", color: "bg-caramel" },
    },
    {
      key: "pastries",
      title: "Fresh Pastries",
      description: "Buttery croissants, Danish pastries, and seasonal specialties baked daily.",
      image: "/placeholder.svg?height=250&width=300&text=Fresh Pastries",
      badge: { text: "Pastries", color: "bg-sage" },
    },
    {
      key: "bread",
      title: "Artisan Bread",
      description: "Crusty sourdoughs, soft sandwich loaves, and specialty breads made fresh.",
      image: "/placeholder.svg?height=250&width=300&text=Artisan Bread",
      badge: { icon: Bread, text: "Bread", color: "bg-chocolate" },
    },
    {
      key: "cakes",
      title: "Custom Cakes",
      description: "Beautiful celebration cakes and daily treats perfect for any occasion.",
      image: "/placeholder.svg?height=250&width=300&text=Custom Cakes",
      badge: { icon: Cake, text: "Cakes", color: "bg-beige text-chocolate" },
    },
    {
      key: "coffee",
      title: "Premium Coffee",
      description: "Freshly roasted beans and expertly crafted espresso drinks.",
      image: "/placeholder.svg?height=250&width=300&text=Premium Coffee",
      badge: { icon: Coffee, text: "Coffee", color: "bg-caramel" },
    },
    {
      key: "sushi",
      title: "Sushi & Rolls",
      description: "Fresh sushi and gourmet rolls made daily with quality ingredients.",
      image: "/placeholder.svg?height=250&width=300&text=Sushi & Rolls",
      badge: { text: "Sushi & Rolls", color: "bg-sage" },
    },
  ]

  return (
    <section id="products" className="py-20 bg-beige/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-chocolate mb-4">Our Signature Offerings</h3>
          <p className="text-lg text-chocolate/70 max-w-2xl mx-auto">
            From flaky pastries to hearty pies, every item is crafted with care and baked to perfection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Carousel className="w-full">
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={product.key} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-2"
                  >
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProduct(product.key)}
                    >
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={300}
                            height={250}
                            className="w-full h-64 object-cover"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          className={`absolute top-4 left-4 ${product.badge.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                        >
                          {product.badge.icon && <product.badge.icon className="inline h-4 w-4 mr-1" />}
                          {product.badge.text}
                        </motion.div>
                      </div>
                      <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                        className="text-xl font-semibold text-chocolate mb-2"
                      >
                        {product.title}
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        className="text-chocolate/70"
                      >
                        {product.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CarouselPrevious className="relative static translate-y-0 mr-2" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CarouselNext className="relative static translate-y-0" />
              </motion.div>
            </div>
          </Carousel>
        </motion.div>

        {/* Product Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
              <DialogContent className="max-w-2xl">
                <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-chocolate">
                      {PRODUCT_DETAILS[selectedProduct]?.title}
                    </DialogTitle>
                    <DialogDescription className="text-chocolate/70">
                      {PRODUCT_DETAILS[selectedProduct]?.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="relative overflow-hidden rounded-xl"
                    >
                      <Image
                        src={PRODUCT_DETAILS[selectedProduct]?.image || "/placeholder.svg?height=300&width=500"}
                        alt={PRODUCT_DETAILS[selectedProduct]?.title || "Product"}
                        width={500}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-chocolate">Popular Items:</h4>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {PRODUCT_DETAILS[selectedProduct]?.items.map((item, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="flex items-center space-x-3 p-3 bg-beige/30 rounded-lg"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                              className="w-2 h-2 bg-caramel rounded-full"
                            />
                            <div>
                              <p className="font-medium text-chocolate">{item.name}</p>
                              <p className="text-sm text-chocolate/70">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                  <DialogFooter>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-caramel hover:bg-caramel/90 text-white">Order Now</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                        Close
                      </Button>
                    </motion.div>
                  </DialogFooter>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
