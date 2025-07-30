// components/PropertyCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

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

const PropertyCard: FC<{ property: Property }> = ({ property }) => {
  return (
      <div className="block group cursor-pointer">
        <Link href={`/property/${property.id}`} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group-hover:scale-[1.01]">
          <div className="relative w-full h-60">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
            />
            {property.isFavorite && (
              <span className="absolute top-2 left-2 bg-white text-sm px-2 py-1 rounded font-medium shadow">
                🏆 Guest favorite
              </span>
            )}
          </div>
          <div className="p-4 space-y-1">
            <p className="font-semibold">{property.address}</p>
            <p className="text-sm text-gray-500">{property.distance}</p>
            <p className="text-sm text-gray-500">{property.dateRange}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">{property.price}</p>
              <p className="text-sm">⭐ {property.rating.toFixed(2)}</p>
            </div>
          </div>
        </Link>
      </div>
  )
}

export default PropertyCard
