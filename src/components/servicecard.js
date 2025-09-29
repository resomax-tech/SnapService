"use client";

import Link from "next/link";

export default function ServiceCard({ service, onViewMore }) {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex justify-evenly items-center">
      {/* Left Side - Image */}
      <div className="m-3 w-42">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-32 object-cover rounded-2xl"
        />
      </div>

      {/* Right Side - Content */}
      <div className="py-4 w-64 ms-10">
        <div>
          <h2 className="text-xl font-bold">{service.name}</h2>

          {/* Price */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm text-[#1c1b1b]">
              {service.price}
            </span>
          </div>

          {/* View More → Opens modal */}
          <button
            onClick={() => onViewMore(service.id)}
            className="text-md text-[#092F9C] font-semibold hover:underline mb-2"
          >
            View More
          </button>
        </div>

        {/* Book Now → Still navigates */}
        <Link href={`/services/${service.id}/community`}>
          <button className="w-2/3 bg-[#2d2c2b] text-white py-2 px-2 rounded-lg font-semibold transition">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
