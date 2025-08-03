'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Property = {
  id: string
  gallery: string[]
  title: string
  address: string
  distance: string
  rating: number
  price: string
  dateRange: string
  videoUrl?: string
  isFavorite?: boolean
}

const HeroCarousel: FC<{ properties: Property[] }> = ({ properties }) => {
  const [propertyIndex, setPropertyIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [hovering, setHovering] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const imageTimerRef = useRef<NodeJS.Timeout | null>(null)

  const current = properties[propertyIndex]
  const gallery = current.gallery.length > 0 ? current.gallery : ['/images/fallback.jpg']
  const currentImage = gallery[imageIndex]

  const handleNextProperty = () => {
    setPropertyIndex((prev) => (prev + 1) % properties.length)
    setImageIndex(0)
    setImageLoading(true)
  }

  const handlePrevProperty = () => {
    setPropertyIndex((prev) => (prev - 1 + properties.length) % properties.length)
    setImageIndex(0)
    setImageLoading(true)
  }

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % gallery.length)
    setImageLoading(true)
  }

  useEffect(() => {
    const propertyInterval = setInterval(() => {
      if (!hovering) handleNextProperty()
    }, 16000)
    return () => clearInterval(propertyInterval)
  }, [hovering, propertyIndex])

  useEffect(() => {
    if (!hovering) {
      imageTimerRef.current = setInterval(() => {
        handleNextImage()
      }, 6000)
    }

    return () => {
      if (imageTimerRef.current) clearInterval(imageTimerRef.current)
    }
  }, [hovering, imageIndex, gallery.length])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (deltaX > 50) handlePrevProperty()
    else if (deltaX < -50) handleNextProperty()
    touchStartX.current = null
  }

  return (
    <section
      className="relative w-full h-[600px] bg-gray-900 text-white overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 group cursor-zoom-in" onClick={() => setZoomed(true)}>
        <Image
          src={currentImage}
          alt={current.title}
          fill
          priority
          className={`object-cover transition duration-700 group-hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          placeholder="blur"
          blurDataURL="/images/blur-placeholder.jpg"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Zoom Modal */}
      {zoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setZoomed(false)}
        >
          <div className="relative w-full h-full max-w-4xl mx-auto">
            <Image
              src={currentImage}
              alt="Zoomed view"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 flex items-center justify-center h-full">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{current.title}</h1>
            <p className="text-lg">{current.address}</p>
            <p className="text-xl font-semibold mt-2">{current.price}</p>
            <Link
              href={`/property/${current.id}`}
              className="mt-4 inline-block bg-white text-black px-6 py-2 rounded hover:bg-gray-100 font-medium transition"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Map */}
        <div className="hidden lg:block w-full lg:w-1/2 h-[350px] relative ml-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Property Location Map"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="rounded-xl border-0"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(current.address)}&output=embed`}
          />
        </div>
      </div>

      {/* Prev/Next Buttons */}
      <div className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2">
        <button
          onClick={handlePrevProperty}
          className="bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2">
        <button
          onClick={handleNextProperty}
          className="bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails with Video Support */}
      {gallery.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-4xl px-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {gallery.map((src, idx) => {
              const isVideo = current.videoUrl && idx === 0
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (isVideo) {
                      window.open(current.videoUrl!, '_blank')
                    } else {
                      setImageIndex(idx)
                      setImageLoading(true)
                    }
                  }}
                  className={`relative flex-shrink-0 w-20 h-12 rounded overflow-hidden border-2 snap-start ${
                    idx === imageIndex ? 'border-white' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumb ${idx + 1}`}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/images/blur-placeholder.jpg"
                  />
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        className="opacity-80"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Inner Gallery Progress Dots */}
          <div className="mt-4 mb-8 flex justify-center gap-2">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setImageIndex(idx)
                  setImageLoading(true)
                }}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  idx === imageIndex ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Property Pagination Progress Bar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[80%] h-2 bg-white/20 rounded-full overflow-hidden z-30">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${((propertyIndex + 1) / properties.length) * 100}%` }}
        />
      </div>
    </section>
  )
}

export default HeroCarousel
