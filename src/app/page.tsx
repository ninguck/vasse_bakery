"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"

export default function VasseBakery() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  )
}