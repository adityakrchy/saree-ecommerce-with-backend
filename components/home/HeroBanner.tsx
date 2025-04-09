"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    id: 1,
    title: "Festive Collection 2023",
    description: "Celebrate in style with our exquisite festive collection",
    image: "/images/banner/festive-banner.jpg",
    cta: "Shop Festive Collection",
    link: "/collections/festive",
  },
  {
    id: 2,
    title: "Wedding Season Special",
    description: "Find the perfect saree for your special day",
    image: "/images/banner/wedding-banner.jpg",
    cta: "Explore Wedding Collection",
    link: "/collections/wedding",
  },
  {
    id: 3,
    title: "New Arrivals",
    description: "Discover our latest designs and patterns",
    image: "/images/banner/new-arrivals-banner.jpg",
    cta: "View New Arrivals",
    link: "/new-arrivals",
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Return a simple placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-muted/20">
        <div className="container relative h-full px-4 md:px-6 flex items-center">
          <div className="max-w-lg">
            <div className="h-12 w-3/4 bg-muted/30 rounded mb-4"></div>
            <div className="h-6 w-full bg-muted/30 rounded mb-6"></div>
            <div className="h-10 w-40 bg-muted/30 rounded"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative h-full px-4 md:px-6 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/90">{slides[currentSlide].description}</p>
            <Button asChild size="lg" className="group">
              <Link href={slides[currentSlide].link}>
                {slides[currentSlide].cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

