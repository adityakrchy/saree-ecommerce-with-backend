"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "I ordered a silk saree for my sister's wedding and was amazed by the quality. The colors were vibrant and the fabric was luxurious. Received so many compliments!",
    image: "/images/testimonials/customer1.jpg",
  },
  {
    id: 2,
    name: "Ananya Patel",
    location: "Mumbai",
    rating: 5,
    text: "The cotton sarees I purchased are perfect for daily wear. So comfortable and the designs are unique. The delivery was prompt and packaging was excellent.",
    image: "/images/testimonials/customer2.jpg",
  },
  {
    id: 3,
    name: "Meera Reddy",
    location: "Bangalore",
    rating: 4,
    text: "I've been shopping with Saree Elegance for years now. Their collection is always up-to-date with the latest trends while maintaining traditional aesthetics.",
    image: "/images/testimonials/customer3.jpg",
  },
  {
    id: 4,
    name: "Kavita Iyer",
    location: "Chennai",
    rating: 5,
    text: "The Kanjivaram saree I bought exceeded my expectations. The craftsmanship is exceptional and it arrived well before the expected delivery date.",
    image: "/images/testimonials/customer4.jpg",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      const width = window.innerWidth
      let count = 1

      if (width >= 1024) count = 3
      else if (width >= 768) count = 2

      const indices = []
      for (let i = 0; i < count; i++) {
        indices.push((activeIndex + i) % testimonials.length)
      }

      setVisibleTestimonials(indices)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeIndex])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  if (!mounted) {
    return <div className="h-[300px] w-full bg-muted/20 animate-pulse rounded-lg"></div>
  }

  return (
    <div className="relative">
      <div className="overflow-hidden py-4">
        <AnimatePresence mode="wait">
          <div className="flex gap-6">
            {visibleTestimonials.map((index) => (
              <motion.div
                key={testimonials[index].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonials[index].image || "/placeholder.svg"}
                          alt={testimonials[index].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonials[index].name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonials[index].location}</p>
                      </div>
                    </div>

                    <div className="flex mb-3">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonials[index].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>

                    <p className="text-muted-foreground">{testimonials[index].text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <Button variant="outline" size="icon" onClick={handlePrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

