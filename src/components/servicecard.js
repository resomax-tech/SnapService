"use client";

import Link from "next/link";
import Image from "next/image";

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm">
      {/* Optimized Image */}
      <div className="relative w-full h-48">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content below image */}
      <div className="p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-2">{service.name}</h2>

        {/* Book Now button */}
        <Link href={`/customer/services/${service.id}/community`}>
          <button className="bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500 transition-colors">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
