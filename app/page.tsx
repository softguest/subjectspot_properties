// app/properties/page.tsx or app/listings/page.tsx
import { db } from "@/lib/db";
import HeroCarousel from "@/components/frontPage/HeroCarousel";
import PropertyCard from "@/components/frontPage/PropertyCard";
import CallToAction from "@/components/frontPage/CallToAction";

export default async function PropertyList() {
  const properties = await db.property.findMany({
    orderBy: { createdAt: "desc" },
    take: 8, // optional: limit how many properties are shown
  });

  return (
    <div>
      <HeroCarousel properties={properties} />
      <main className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Available Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={{
                ...property,
                imageUrl: property.gallery[0] || "/images/property02.jpg", // fallback image
              }}
            />
          ))}
        </div>
      </main>
      <CallToAction />
    </div>
  );
}
