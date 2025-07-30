// app/properties/page.tsx or app/listings/page.tsx
'use client'

import CallToAction from '@/components/frontPage/CallToAction'
import HeroCarousel from '@/components/frontPage/HeroCarousel'
import PropertyCard from '@/components/frontPage/PropertyCard'

const properties = [
  {
    id: '1',
    imageUrl: '/images/property01.jpg',
    title: 'Cabin Retreat',
    address: 'Cavinti, Philippines',
    distance: '2 miles to Pagsanjan Gorge National Park',
    rating: 4.93,
    price: '₱41,014 for 5 nights',
    dateRange: 'Jun 7 – 12',
    isFavorite: true
  },
  {
    id: '2',
    imageUrl: '/images/property02.jpg',
    title: 'Modern Villa',
    address: 'Tagaytay, Philippines',
    distance: '34 miles to Mounts-Palay-Palay-Mataas-Na-Gulod',
    rating: 5.0,
    price: '₱94,283 for 5 nights',
    dateRange: 'May 25 – 30',
    isFavorite: true
  },
  {
    id: '3',
    imageUrl: '/images/property03.jpg',
    title: 'Lake House',
    address: 'Kalayaan, Philippines',
    distance: '5 miles to Pagsanjan Gorge National Park',
    rating: 5.0,
    price: '₱41,653 for 5 nights',
    dateRange: 'May 9 – 14',
    isFavorite: true
  },
  {
    id: '4',
    imageUrl: '/images/28.webp',
    title: 'Luxury Cabin',
    address: 'Cavinti, Philippines',
    distance: '4 miles to Pagsanjan Gorge National Park',
    rating: 4.87,
    price: '₱157,482 for 5 nights',
    dateRange: 'May 11 – 16',
    isFavorite: false
  },
  {
    id: '5',
    imageUrl: '/images/29.webp',
    title: 'Modern Villa',
    address: 'Tagaytay, Philippines',
    distance: '34 miles to Mounts-Palay-Palay-Mataas-Na-Gulod',
    rating: 5.0,
    price: '₱94,283 for 5 nights',
    dateRange: 'May 25 – 30',
    isFavorite: true
  },
    {
    id: '6',
    imageUrl: '/images/property01.jpg',
    title: 'Cabin Retreat',
    address: 'Cavinti, Philippines',
    distance: '2 miles to Pagsanjan Gorge National Park',
    rating: 4.93,
    price: '₱41,014 for 5 nights',
    dateRange: 'Jun 7 – 12',
    isFavorite: true
  },
  {
    id: '7',
    imageUrl: '/images/property02.jpg',
    title: 'Modern Villa',
    address: 'Tagaytay, Philippines',
    distance: '34 miles to Mounts-Palay-Palay-Mataas-Na-Gulod',
    rating: 5.0,
    price: '₱94,283 for 5 nights',
    dateRange: 'May 25 – 30',
    isFavorite: true
  },
  {
    id: '8',
    imageUrl: '/images/property03.jpg',
    title: 'Lake House',
    address: 'Kalayaan, Philippines',
    distance: '5 miles to Pagsanjan Gorge National Park',
    rating: 5.0,
    price: '₱41,653 for 5 nights',
    dateRange: 'May 9 – 14',
    isFavorite: true
  },
]

export default function PropertyList() {
  return (
    <div>
      <HeroCarousel properties={properties}/>
      <main className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Avialable Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
      <CallToAction />
    </div>
  )
}
