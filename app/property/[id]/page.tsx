import Image from 'next/image';

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}

const property = {
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
      '/images/property03.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  }

const PropertyDetails =() => {

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Title + Info */}
      <div>
        <h1 className="text-3xl font-bold mb-1">{property.title}</h1>
        <p className="text-gray-500 text-sm">
          {property.address} • ⭐ {property.rating}
        </p>
      </div>

      {/* YouTube Video Embed */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Watch the Land Tour</h2>
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={property.videoUrl}
            title="YouTube video player"
            allowFullScreen
          />
        </div>
      </section>

      {/* Image Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Land Image Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {property.gallery.map((src, idx) => (
            <div key={idx} className="relative w-full h-52 rounded-lg overflow-hidden">
              <Image src={src} alt={`Gallery image ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Description + Sidebar */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <p className="text-gray-700">{property.description}</p>
          <p className="text-sm text-gray-500">
            📍 {property.distance} <br />
            📅 {property.dateRange}
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-md space-y-4">
          <p className="text-xl font-semibold">{property.price}</p>
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            Reserve
          </button>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
