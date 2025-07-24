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
import { CroissantIcon } from "lucide-react"
import { useProducts } from "@/hooks/useProducts";
import { useMenuItems } from "@/hooks/useMenuItems";
import useSWR from "swr";
import { categoryApi } from "@/lib/api";
import { MenuItem } from "@/types/menuItems";
import { badgeColorClassMap } from "@/lib/badgeColors";
import { useState } from "react";
import type { Category } from "@/types/categories";
import { FullMenuModal } from "@/components/modals/full-menu-modal";

interface ProductsSectionProps {
  selectedProduct: string | null
  setSelectedProduct: (product: string | null) => void
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}

export function ProductsSection({ selectedProduct, setSelectedProduct, showMenu, setShowMenu }: ProductsSectionProps) {
  const { products, isLoading, error } = useProducts();
  const { menuItems, isLoading: menuItemsLoading, error: menuItemsError } = useMenuItems();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useSWR("/api/categories", categoryApi.getAll);

  // Fallback to old hardcoded products if no data
  const fallbackProducts = [
    {
      key: "pies",
      title: "Artisanal Pies",
      description: "Savory and sweet pies made with premium ingredients and traditional recipes.",
      image: "/placeholder.svg?height=250&width=300&text=Fresh Pies",
      badge: { text: "Pies", color: "bg-caramel" },
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

  // Map backend products to the format expected by the carousel
  const mappedProducts = products?.map((product) => ({
    key: product.id,
    title: product.title,
    description: product.description,
    image: product.mainImageUrl || "/placeholder.svg?height=250&width=300&text=Product",
    badge: {
      text: product.badgeText || "Product",
      color: badgeColorClassMap[product.badgeColor || "caramel"],
      // Optionally add icon logic if you want to map badgeIcon
    },
  })) || fallbackProducts;

  // Find the selected product from the fetched products
  const selectedProductObj = products?.find(p => p.id === selectedProduct) || null;

  // Group menu items by category
  const menuItemsByCategory: Record<string, MenuItem[]> = {};
  if (Array.isArray(categories) && Array.isArray(menuItems)) {
    for (const category of categories) {
      menuItemsByCategory[category.id] = menuItems.filter((item) => item.categoryId === category.id);
    }
  }

  if (isLoading) {
    return (
      <section id="products" className="py-12 sm:py-16 lg:py-20 bg-beige/30">
        <div className="container mx-auto px-4 text-center">
          <div className="text-chocolate text-lg">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-12 sm:py-16 lg:py-20 bg-beige/30">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-600 text-lg">Failed to load products.</div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 bg-beige/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate mb-4">Our Signature Offerings</h3>
          <p className="text-base sm:text-lg text-chocolate/70 max-w-2xl mx-auto px-4">
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
            <CarouselContent className="-ml-2 sm:-ml-4">
              {mappedProducts.map((product, index) => (
                <CarouselItem key={product.key} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-1 sm:p-2"
                  >
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProduct(product.key)}
                    >
                      <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={300}
                            height={250}
                            className="w-full h-48 sm:h-64 object-cover"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          className={`absolute top-3 left-3 sm:top-4 sm:left-4 ${product.badge.color} text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium`}
                        >
                          {/* Optionally add icon here if you want */}
                          {product.badge.text}
                        </motion.div>
                      </div>
                      <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                        className="text-lg sm:text-xl font-semibold text-chocolate mb-2"
                      >
                        {product.title}
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        className="text-sm sm:text-base text-chocolate/70"
                      >
                        {product.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CarouselPrevious className="relative static translate-y-0" />
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
              <DialogContent className="max-w-2xl mx-4 sm:mx-auto">
                <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                  <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-chocolate">
                      {selectedProductObj?.title || "Product"}
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base text-chocolate/70">
                      {selectedProductObj?.description || ""}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="relative overflow-hidden rounded-xl"
                    >
                      <Carousel className="w-full">
                        <CarouselContent className="flex gap-4">
                          {[selectedProductObj?.mainImageUrl, ...(selectedProductObj?.galleryImageUrls || [])]
                            .filter(Boolean)
                            .map((imgUrl, idx) => (
                              <CarouselItem key={imgUrl || idx} className="!basis-auto">
                                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-beige/30 rounded-lg flex items-center justify-center overflow-hidden border border-sage/20">
                                  <Image
                                    src={imgUrl || "/placeholder.svg?height=300&width=500"}
                                    alt={selectedProductObj?.title || "Product"}
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center mt-2 space-x-2">
                          <CarouselPrevious />
                          <CarouselNext />
                        </div>
                      </Carousel>
                    </motion.div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base sm:text-lg font-semibold text-chocolate">Menu Items:</h4>
                        {selectedProductObj?.menuItems && selectedProductObj.menuItems.length > 6 && (
                          <span className="text-xs sm:text-sm text-chocolate/60 italic">
                            Showing 6 of {selectedProductObj.menuItems.length}
                          </span>
                        )}
                      </div>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                      >
                        {(selectedProductObj?.menuItems || []).slice(0, 6).map((item, index) => (
                          <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="flex items-start space-x-3 p-3 bg-beige/30 rounded-lg"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                              className="w-2 h-2 bg-caramel rounded-full flex-shrink-0 mt-2"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <p className="font-medium text-chocolate text-sm sm:text-base">{item.name}</p>
                                <span className="font-bold text-caramel text-sm sm:text-base ml-2 flex-shrink-0">
                                  ${item.price?.toFixed(2) ?? "-"}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-chocolate/70">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                      {selectedProductObj?.menuItems && selectedProductObj.menuItems.length > 6 && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-center text-sm text-chocolate/60 italic"
                        >
                          View our full menu to see all {selectedProductObj.menuItems.length} items in this category
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                      <Button
                        className="bg-caramel hover:bg-caramel/90 text-white w-full sm:w-auto"
                        onClick={() => setShowMenu(true)}
                      >
                        View Menu
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                      <Button variant="outline" onClick={() => setSelectedProduct(null)} className="w-full sm:w-auto">
                        Close
                      </Button>
                    </motion.div>
                  </DialogFooter>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

        {/* Full Menu Modal */}
        <FullMenuModal
          open={showMenu}
          onOpenChange={setShowMenu}
          categories={Array.isArray(categories) ? categories : []}
          menuItemsByCategory={menuItemsByCategory}
          setShowMenu={setShowMenu}
        />
      </div>
    </section>
  )
}
