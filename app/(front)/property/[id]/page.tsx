// app/property/[id]/page.tsx
import Image from 'next/image'
import { FC } from 'react';

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}

const mockProperty = {
  id: '1',
  title: 'Lakefront Villa with Infinity Pool',
  address: 'Kalayaan, Philippines',
  imageUrl: '/images/property03.jpg',
  distance: '5 miles to Pagsanjan Gorge National Park',
  price: '₱41,653 for 5 nights',
  dateRange: 'May 9 – 14',
  rating: 5.0,
  description:
    'Escape to this beautiful lakeside villa nestled in lush greenery. Enjoy peaceful mornings on the deck, swim in the infinity pool, and relax in a modern glasshouse-style interior. Perfect for families or romantic getaways.',
  gallery: [
    '/images/property02.jpg',
    '/images/property01.jpg',
    '/images/28.webp',
    '/images/property03.jpg'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual land video URL
}

const properties = [
  {
    id: '1',
    imageUrl: '/images/property01.jpg',
    title: 'Cabin Retreat',
    description:
    'Escape to this beautiful lakeside villa nestled in lush greenery. Enjoy peaceful mornings on the deck, swim in the infinity pool, and relax in a modern glasshouse-style interior. Perfect for families or romantic getaways.',
    address: 'Cavinti, Philippines',
    distance: '2 miles to Pagsanjan Gorge National Park',
    rating: 4.93,
    price: '₱41,014 for 5 nights',
    dateRange: 'Jun 7 – 12',
    isFavorite: true,
         gallery: [
    '/images/property02.jpg',
    '/images/property01.jpg',
    '/images/28.webp',
    '/images/property03.jpg'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual land video URL
  },
  {
    id: '2',
    imageUrl: '/images/property02.jpg',
    title: 'Modern Villa',
    description:
    'Escape to this beautiful lakeside villa nestled in lush greenery. Enjoy peaceful mornings on the deck, swim in the infinity pool, and relax in a modern glasshouse-style interior. Perfect for families or romantic getaways.',
    address: 'Tagaytay, Philippines',
    distance: '34 miles to Mounts-Palay-Palay-Mataas-Na-Gulod',
    rating: 5.0,
    price: '₱94,283 for 5 nights',
    dateRange: 'May 25 – 30',
    isFavorite: true,
     gallery: [
    '/images/property02.jpg',
    '/images/property01.jpg',
    '/images/28.webp',
    '/images/property03.jpg'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual land video URL
  },
  {
    id: '3',
    imageUrl: '/images/property03.jpg',
    title: 'Lake House',
    description:
    'Escape to this beautiful lakeside villa nestled in lush greenery. Enjoy peaceful mornings on the deck, swim in the infinity pool, and relax in a modern glasshouse-style interior. Perfect for families or romantic getaways.',
    address: 'Kalayaan, Philippines',
    distance: '5 miles to Pagsanjan Gorge National Park',
    rating: 5.0,
    price: '₱41,653 for 5 nights',
    dateRange: 'May 9 – 14',
    isFavorite: true,
     gallery: [
    '/images/property02.jpg',
    '/images/property01.jpg',
    '/images/28.webp',
    '/images/property03.jpg'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual land video URL
  },
  {
    id: '4',
    imageUrl: '/images/28.webp',
    title: 'Luxury Cabin',
    description:
    'Escape to this beautiful lakeside villa nestled in lush greenery. Enjoy peaceful mornings on the deck, swim in the infinity pool, and relax in a modern glasshouse-style interior. Perfect for families or romantic getaways.',
    address: 'Cavinti, Philippines',
    distance: '4 miles to Pagsanjan Gorge National Park',
    rating: 4.87,
    price: '₱157,482 for 5 nights',
    dateRange: 'May 11 – 16',
    isFavorite: false,
     gallery: [
    '/images/property02.jpg',
    '/images/property01.jpg',
    '/images/28.webp',
    '/images/property03.jpg'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual land video URL
  },
  {
    id: '5',
    imageUrl: '/images/29.webp',
    title: 'Modern Villa',
  
    description:
    'Escape to this beautiful lakeside villa nestled in lush greenery. Enjoy peaceful mornings on the deck, swim in the infinity pool, and relax in a modern glasshouse-style interior. Perfect for families or romantic getaways.',
    address: 'Tagaytay, Philippines',
    distance: '34 miles to Mounts-Palay-Palay-Mataas-Na-Gulod',
    rating: 5.0,
    price: '₱94,283 for 5 nights',
    dateRange: 'May 25 – 30',
    isFavorite: true,
     gallery: [
    '/images/property02.jpg',
    '/images/property01.jpg',
    '/images/28.webp',
    '/images/property03.jpg'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual land video URL
  }
]

const PropertyDetails: FC<PropertyDetailPageProps> = async ({params}) => {
  const propertyDetail = mockProperty  
  // const property = properties
  //   const propertyDetail = property.findLast({
  //     where: {
  //       id: params.id,
  //     },
  //     include: {
  //       author: true,
  //     },
  //   });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Title + Info */}
      <div>
        <h1 className="text-3xl font-bold mb-1">{propertyDetail?.title}</h1>
        <p className="text-gray-500 text-sm">{propertyDetail?.address} • ⭐ {propertyDetail?.rating}</p>
      </div>

      {/* Hero Image */}
      {/* <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div> */}

      {/* 📹 YouTube Video Embed */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Watch the Land Tour</h2>
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={propertyDetail?.videoUrl}
            title="YouTube video player"
            allowFullScreen
          />
        </div>
      </section>

      {/* 🖼️ Land Image Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Land Image Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {propertyDetail?.gallery.map((src, idx) => (
            <div key={idx} className="relative w-full h-52 rounded-lg overflow-hidden">
              <Image src={src} alt={`Gallery image ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Description + Sidebar */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <p className="text-gray-700">{propertyDetail?.description}</p>
          <p className="text-sm text-gray-500">
            📍 {propertyDetail?.distance} <br />
            📅 {propertyDetail?.dateRange}
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-md space-y-4">
          <p className="text-xl font-semibold">{propertyDetail?.price}</p>
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            Reserve
          </button>
        </div>
      </div>
    </main>
  )
}
export default PropertyDetails;