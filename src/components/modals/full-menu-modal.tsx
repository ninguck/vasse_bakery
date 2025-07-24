import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CroissantIcon } from "lucide-react";
import type { Category } from "@/types/categories";
import type { MenuItem } from "@/types/menuItems";
import { modalVariants } from "@/lib/animations";

interface FullMenuModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  menuItemsByCategory: Record<string, MenuItem[]>;
  setShowMenu: (show: boolean) => void;
}

export function FullMenuModal({ open, onOpenChange, categories, menuItemsByCategory, setShowMenu }: FullMenuModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                {(Array.isArray(categories) ? categories : []).map((category, categoryIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    className="space-y-4"
                  >
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold text-chocolate border-b-2 border-caramel/30 pb-2"
                      whileHover={{ color: "#D6A77A" }}
                    >
                      {category.name}
                    </motion.h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {(menuItemsByCategory[category.id] || []).map((item, itemIndex) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-start space-x-3 p-3 bg-beige/30 rounded-lg"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: itemIndex * 0.2 }}
                            className="w-2 h-2 bg-caramel rounded-full flex-shrink-0 mt-2"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium text-chocolate text-sm sm:text-base">{item.name}</h4>
                              <span className="font-bold text-caramel text-sm sm:text-base ml-2 flex-shrink-0">
                                ${item.price?.toFixed(2) ?? "-"}
                              </span>
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
                  <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                    Close Menu
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
} 