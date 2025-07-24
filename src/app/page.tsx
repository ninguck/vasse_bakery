"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProductsSection } from "@/components/sections/products"
import { LocationSection } from "@/components/sections/location"
import { CTASection } from "@/components/sections/cta"
import { FAQSection } from "@/components/sections/faq"
import { LoadingScreen } from "@/components/layout/loading-screen"
import { AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import ScrollVelocity from "@/components/ui/reactBits/TextAnimations/ScrollVelocity/ScrollVelocity";
import CurvedLoop from "@/components/ui/reactBits/TextAnimations/CurvedLoop/CurvedLoop";

export default function VasseBakeryLanding() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Loading sequence
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setShowContent(true)
      }, 1000) // Allow time for the transition animation
    }, 2500) // 2.5 seconds loading time

    // Toast notification after loading
    const toastTimer = setTimeout(() => {
      if (!isLoading) {
        toast.success("Today's Special: Sourdough bread fresh from the oven! 20% off until noon.")
      }
    }, 4000)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(toastTimer)
    }
  }, [isLoading])

  return (
    <div className="min-h-screen bg-cream">
      {/* Loading Screen */}
      <AnimatePresence>{isLoading && <LoadingScreen isLoading={isLoading} />}</AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <>
            <Header />
            <HeroSection />
            <AboutSection />
            <section aria-hidden="true" className="relative z-[99] w-full h-[20rem] sm:h-[32rem] -mt-4 flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full" style={{background: "linear-gradient(to bottom, white 0%, rgba(245,236,224,0.3) 100%)"}} />
              {/* Chocolate background curve */}
              <div className="absolute z-10 left-1/2 -translate-x-1/2 translate-y-36 sm:translate-y-36 pointer-events-none w-full flex items-end justify-center">
                <CurvedLoop
                  marqueeText="Fresh • Local • Delicious • "
                  speed={4}
                  className="fill-chocolate opacity-60 blur-[1px] text-5xl sm:text-7xl"
                  curveAmount={-250}
                  direction="left"
                  interactive={false}
                />
              </div>
              {/* Caramel foreground curve */}
              <div className="absolute z-10 left-1/2 -translate-x-1/2 -translate-y-36 sm:-translate-y-36 pointer-events-none w-full flex items-end justify-center">
                <CurvedLoop
                  marqueeText="Fresh • Local • Delicious • "
                  speed={2}
                  className="fill-caramel drop-shadow-lg text-5xl sm:text-7xl"
                  curveAmount={250}
                  direction="left"
                  interactive={false}
                />
              </div>
            </section>
            {/*
            <div className="relative z-[99] w-full py-10 bg-cream">
              <ScrollVelocity
                texts={["Freshly Baked", "Vasse Bakery"]}
                velocity={80}
                className="text-chocolate"
              />
            </div>*/}
            <ProductsSection selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} showMenu={showMenu} setShowMenu={setShowMenu} />
            <LocationSection />
            <CTASection setShowMenu={setShowMenu} />
            <FAQSection />
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
