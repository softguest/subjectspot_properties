// components/HeroCarousel.tsx
'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'

const CallToAction = () => {

  return (
    <section className="relative w-full h-[500px] bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-green/40" />

      <div className="relative z-10 h-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-6">
        <div className="w-full lg:w-1/2 flex items-center justify-center h-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Information</h1>
            <p className="text-lg">Lacation: Douala & Bamenda</p>
            <p className="text-xl font-semibold mt-2">Contact: 6 73 58 99 99</p>
            <Link
              href='/SOMETHING'
              className="mt-4 inline-block bg-white text-black px-6 py-2 rounded hover:bg-gray-100 font-medium transition"
            >
              View Details
            </Link>
          </div>
        </div>
        {/* Map Section - only on large screens */}
         <div className="hidden lg:block w-1/2 h-[350px] relative ml-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Property Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent("Douala, Cameroon")}&output=embed`}
          />
        </div>
      </div>
    </section>
  )
}

export default CallToAction;