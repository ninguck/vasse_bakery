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
import { badgeColorClassMap } from "@/lib/badgeColors";

interface ProductsSectionProps {
  selectedProduct: string | null
  setSelectedProduct: (product: string | null) => void
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}

export function ProductsSection({ selectedProduct, setSelectedProduct, showMenu, setShowMenu }: ProductsSectionProps) {
  const { products, isLoading, error } = useProducts();

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

  const fullMenu = {
    "Fresh Baked Daily": [
      { name: "Sourdough Loaf", price: "$8.50", description: "24-hour fermented with crispy crust" },
      { name: "Multigrain Bread", price: "$7.50", description: "Packed with seeds and grains" },
      { name: "White Sandwich Loaf", price: "$6.50", description: "Soft and fluffy" },
      { name: "Rye Bread", price: "$8.00", description: "Dense with caraway seeds" },
    ],
    "Artisanal Pies": [
      { name: "Beef & Mushroom", price: "$12.50", description: "Tender beef with fresh mushrooms" },
      { name: "Chicken & Leek", price: "$11.50", description: "Free-range chicken with garden leeks" },
      { name: "Vegetarian Delight", price: "$10.50", description: "Seasonal vegetables in herb sauce" },
      { name: "Apple & Cinnamon", price: "$9.50", description: "Sweet dessert pie with local apples" },
    ],
    "Fresh Pastries": [
      { name: "Butter Croissants", price: "$4.50", description: "Classic French with 64 layers" },
      { name: "Pain au Chocolat", price: "$5.50", description: "Croissant with dark chocolate" },
      { name: "Danish Pastries", price: "$5.00", description: "Sweet with seasonal fruit" },
      { name: "Almond Croissants", price: "$6.00", description: "Filled with almond cream" },
    ],
    "Premium Coffee": [
      { name: "Flat White", price: "$4.50", description: "Double shot with steamed milk" },
      { name: "Cappuccino", price: "$4.50", description: "Espresso with foam art" },
      { name: "Long Black", price: "$4.00", description: "Double shot with hot water" },
      { name: "Iced Coffee", price: "$5.50", description: "Cold brew with ice cream" },
    ],
    "Custom Cakes": [
      { name: "Birthday Cakes", price: "From $45", description: "Custom designs for all ages" },
      { name: "Wedding Cakes", price: "From $150", description: "Elegant multi-tier cakes" },
      { name: "Chocolate Mud Cake", price: "$35", description: "Rich with ganache" },
      { name: "Lemon Drizzle", price: "$28", description: "Light sponge with lemon glaze" },
    ],
    "Sushi & Rolls": [
      { name: "Salmon Avocado Roll", price: "$8.50", description: "Fresh salmon with avocado" },
      { name: "Chicken Teriyaki Roll", price: "$7.50", description: "Grilled chicken with teriyaki" },
      { name: "Vegetarian Roll", price: "$6.50", description: "Cucumber and pickled vegetables" },
      { name: "Tuna Sashimi", price: "$12.00", description: "Fresh tuna sliced to perfection" },
    ],
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
        <AnimatePresence>
          {showMenu && (
            <Dialog open={showMenu} onOpenChange={() => setShowMenu(false)}>
              <DialogContent className="max-w-6xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
                <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                  <DialogHeader className="sticky top-0 z-10 pb-4">
                    <div className="bg-gradient-to-r from-beige/95 to-cream/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-sage/20">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            <CroissantIcon className="h-8 w-8 sm:h-10 sm:w-10 text-caramel mr-3" />
                          </motion.div>
                          <div>
                            <DialogTitle className="text-2xl sm:text-3xl font-bold text-chocolate">
                              Vasse Bakery Menu
                            </DialogTitle>
                            <DialogDescription className="text-sm sm:text-base text-chocolate/70">
                              Fresh baked goods, premium coffee, and artisanal treats made daily
                            </DialogDescription>
                          </div>
                        </div>

                        <div className="relative w-full sm:w-80">
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="relative"
                          >
                            <input
                              type="text"
                              placeholder="Search menu items..."
                              className="w-full pl-10 pr-4 py-2 bg-white/80 border border-sage/30 rounded-lg text-chocolate placeholder-chocolate/50 focus:outline-none focus:ring-2 focus:ring-caramel/50 focus:border-caramel transition-all"
                            />
                            <motion.div
                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            >
                              <svg
                                className="h-4 w-4 text-chocolate/60"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6 sm:space-y-8">
                    {Object.entries(fullMenu).map(([category, items], categoryIndex) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        className="space-y-4"
                      >
                        <motion.h3
                          className="text-xl sm:text-2xl font-bold text-chocolate border-b-2 border-caramel/30 pb-2"
                          whileHover={{ color: "#D6A77A" }}
                        >
                          {category}
                        </motion.h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {items.map((item, itemIndex) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                              whileHover={{ scale: 1.02, x: 5 }}
                              className="flex justify-between items-start p-4 bg-beige/20 rounded-lg hover:bg-beige/40 transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-semibold text-chocolate text-sm sm:text-base">{item.name}</h4>
                                  <span className="font-bold text-caramel text-sm sm:text-base ml-2">{item.price}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-chocolate/70">{item.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}

                    {/* Special Notes */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-sage/20 p-4 sm:p-6 rounded-xl"
                    >
                      <h4 className="font-bold text-chocolate mb-3 text-base sm:text-lg">Special Notes</h4>
                      <div className="space-y-2 text-xs sm:text-sm text-chocolate/70">
                        <p>• All bread and pastries baked fresh daily from 5:00 AM</p>
                        <p>• Gluten-free options available - please ask our staff</p>
                        <p>• Custom cake orders require 48 hours notice</p>
                        <p>• Prices subject to change based on seasonal availability</p>
                      </div>
                    </motion.div>
                  </div>

                  <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 mt-6 sticky bottom-0 pt-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                      <Button className="bg-caramel hover:bg-caramel/90 text-white w-full sm:w-auto">Order Now</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                      <Button variant="outline" onClick={() => setShowMenu(false)} className="w-full sm:w-auto">
                        Close Menu
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
