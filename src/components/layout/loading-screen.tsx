"use client"

import { motion, Variants } from "framer-motion"
import { CroissantIcon as Bread } from "lucide-react"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  isLoading: boolean
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [exitXY, setExitXY] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setExitXY({
        x: -window.innerWidth / 2 + 100,
        y: -window.innerHeight / 2 + 50,
      })
    }
  }, [])

  const loadingVariants: Variants = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
    },
    exit: {
      scale: 0.3,
      x: exitXY.x,
      y: exitXY.y,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  }

  const logoVariants: Variants = {
    spinning: {
      rotate: [0, 360, 720],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: 1,
        ease: "easeInOut",
      },
    },
  }

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  const titleContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.2,
      },
    },
  }

  const subtitleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 2.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed inset-0 bg-cream z-50 flex items-center justify-center min-h-screen relative overflow-hidden"
    >
      {/* Modern background animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-radial from-caramel/20 to-transparent"
      />

      <motion.div
        variants={loadingVariants}
        initial="initial"
        animate={!isLoading ? "exit" : "initial"}
        className="flex flex-col items-center justify-center space-y-4 relative z-10"
      >
        <div className="flex items-center space-x-4">
          <motion.div variants={logoVariants} animate="spinning" className="relative">
            <Bread className="h-16 w-16 text-chocolate" />
          </motion.div>
          <div className="overflow-hidden">
            <motion.div variants={titleContainerVariants} initial="hidden" animate="visible" className="flex">
              {"Vasse Bakery".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="text-4xl font-bold text-chocolate inline-block"
                  style={{
                    transformOrigin: "50% 50% -50px",
                    display: letter === " " ? "inline" : "inline-block",
                    width: letter === " " ? "0.5em" : "auto",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.p variants={subtitleVariants} initial="hidden" animate="visible" className="text-caramel text-lg">
          Fresh • Local • Delicious
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
