"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import Image from "next/image"

interface CarGalleryProps {
  images: string[]
  carName: string
}

export function CarGallery({ images, carName }: CarGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Main Image */}
        <div className="relative aspect-[4/3] bg-muted">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`${carName} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Fullscreen Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="p-4 bg-muted/30">
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? "border-primary" : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
