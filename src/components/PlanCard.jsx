"use client";

import { useState } from "react";
import Link from "next/link";
import ViewMoreModal from "./ViewMoreModal";

export default function PlanCard({ plan, serviceId, community }) {
  const [showModal, setShowModal] = useState(false);
  const [bathrooms, setBathrooms] = useState(1);

  const planImages = {
    "classic-2w": "/cleaning7.jpg",
    "classic-4w": "/cleaning6.png",
    "deep-2w": "/cleaning5.jpg",
    "deep-4w": "/cleaning4.jpg",
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-row p-4 gap-4 items-center">
        {/* Image Left */}
        <img
          src={planImages[plan.id] || "/cleaning-placeholder.jpg"}
          alt={plan.name}
          className="w-32 h-32 object-cover rounded-2xl "
        />

        {/* Right Content */}
        <div className="flex-1 flex flex-col items-center ">
          {/* Plan Details */}
          <div>
            <h2 className="text-lg font-bold ">{plan.name}</h2>
            <span className="text-sm font-semibold ">{plan.weeks}</span>
            <div className="flex items-center">

              <button
                onClick={() => setShowModal(true)}
                className="text-md text-[#092F9C] font-semibold hover:underline "
              >   
                View More
              </button>


            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center mb-4 mt-3 shadow justify-center w-30 border border-gray-100 h-8 rounded-md">
            <button
              onClick={() => setBathrooms((prev) => Math.max(1, prev - 1))}
              className=" px-3 py-1 rounded-l hover:bg-gray-400"
            >
              -
            </button>
            <span className="px-4">{bathrooms}</span>
            <button
              onClick={() => setBathrooms((prev) => prev + 1)}
              className=" px-3 py-1 rounded-r hover:bg-gray-400"
            >
              +
            </button>
          </div>
          <div className="flex items-center">
            <Link
              href={`/customer/services/${serviceId}/booking?community=${community}&plan=${plan.id}&bathrooms=${bathrooms}`}
            >
              <button className="bg-[#2d2c2b] text-white py-2 px-10 rounded-lg font-semibold hover:bg-[#1c1b1b]">
                Book Now
              </button>
            </Link>

          </div>
        </div>
      </div>

      {showModal && (
        <ViewMoreModal serviceType={plan.type} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
