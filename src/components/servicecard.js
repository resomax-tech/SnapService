"use client";

import { useState } from "react";
import Link from "next/link";

export default function ServiceCard({ service }) {
  const [isOpen, setIsOpen] = useState(false);

  // Optional: service type

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex">
      {/* Left Side - Image */}
      <div className="w-1/2 m-3">
        <img
          src={service.image}
          alt={service.name}
          className="w-fulll h-full object-cover rounded-2xl"
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold  ">{service.name}</h2>

          {/* Price + View More */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm text-[#1c1b1b]">{service.price}</span>
          </div>
            <Link href={`/services/${service.id}/viewmore`}>
              <button className="text-md text-[#092F9C] font-semibold hover:underline mb-2">
                View More
              </button>
            </Link>
        </div>

        {/* Book Now */}
        <Link href={`/services/${service.id}/community`}>
          <button className="w-full bg-[#2d2c2b] text-white py-3 px-3 rounded-lg font-bold transition">
            Book Now
          </button>
        </Link>
      </div>

  </div>
  );
}
