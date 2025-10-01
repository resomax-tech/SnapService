"use client";

import { useState } from "react";
import Link from "next/link";
import ViewMoreModal from "./ViewMoreModal";

export default function PlanCard({ plan, serviceId, community }) {
  const [showModal, setShowModal] = useState(false);

  // Map plan IDs to images inside PlanCard
  const planImages = {
    "classic-2w": "/cleaning7.jpg",
    "classic-4w": "/cleaning6.png",
    "deep-2w": "/cleaning5.jpg",
    "deep-4w": "/cleaning4.jpg",
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex items-center">
        {/* Left Side - Image */}
        <div className="m-3 w-42">
          <img
            src={planImages[plan.id] || "/cleaning-placeholder.jpg"}
            alt={plan.name}
            className="w-full h-32 object-cover rounded-2xl"
          />
        </div>

        {/* Right Side - Content */}
        <div className="py-4 w-64 ms-10 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>

            {/* Price */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-[#1c1b1b]">
                ${plan.price}
              </span>
            </div>

            {/* View More → Opens modal */}
            <button
              onClick={() => setShowModal(true)}
              className="text-md text-[#092F9C] font-semibold hover:underline mb-2"
            >
              View More
            </button>
          </div>

          {/* Book Now → navigates to next step */}
          <Link
            href={`/customer/services/${serviceId}/planselection?community=${community}&plan=${plan.id}`}
          >
            <button className="w-2/3 bg-[#2d2c2b] text-white py-2 px-2 rounded-lg font-semibold transition hover:bg-[#1c1b1b]">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ViewMoreModal
          serviceType={plan.name}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
