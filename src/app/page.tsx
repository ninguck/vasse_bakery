"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProductsSection } from "@/components/sections/products"
import { LocationSection } from "@/components/sections/location"
import { CTASection } from "@/components/sections/cta"
import { FAQSection } from "@/components/sections/faq"

export default function VasseBakery() {

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProductsSection selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
      <LocationSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  )
}