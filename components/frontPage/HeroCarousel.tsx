// components/HeroCarousel.tsx
'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Property = {
  id: string
  imageUrl: string
  title: string
  address: string
  distance: string
  rating: number
  price: string
  dateRange: string
  isFavorite?: boolean
}

const HeroCarousel: FC<{ properties: Property[] }> = ({ properties }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % properties.length)
    }, 4000) // 4 seconds

    return () => clearInterval(interval)
  }, [properties.length])

  const current = properties[index]

  return (
    <section className="relative w-full h-[500px] bg-gray-900 text-white overflow-hidden">
      <Image
        src={current.imageUrl}
        alt={current.title}
        fill
        className="object-cover opacity-70 transition-opacity duration-1000"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-6">
        <div className="w-full lg:w-1/2 flex items-center justify-center h-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{current.title}</h1>
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
        {/* Map Section - only on large screens */}
        {/* <div className="hidden lg:block w-1/2 h-[350px] relative ml-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Property Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(current.location)}&output=embed`}
          />
        </div> */}
      </div>
    </section>
  )
}

export default HeroCarousel;