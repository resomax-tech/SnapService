"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PlanCard from "@/components/PlanCard";

export default function CommunityPage() {
  const { id: serviceId } = useParams();
  const [communities] = useState(["Greenwood", "Maplewood", "Sunnyvale", "Brookfield", "Riverside"]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [plans, setPlans] = useState([]);

  // Temporary plan pricing data
  const communityPricing = {
    Greenwood: [
      { id: "classic-2w", name: "Classic Cleaning 2 Weeks", price: 200 },
      { id: "classic-4w", name: "Classic Cleaning 4 Weeks", price: 350 },
      { id: "deep-2w", name: "Deep Cleaning 2 Weeks", price: 400 },
      { id: "deep-4w", name: "Deep Cleaning 4 Weeks", price: 650 },
    ],
    Maplewood: [
      { id: "classic-2w", name: "Classic Cleaning 2 Weeks", price: 220 },
      { id: "classic-4w", name: "Classic Cleaning 4 Weeks", price: 370 },
      { id: "deep-2w", name: "Deep Cleaning 2 Weeks", price: 420 },
      { id: "deep-4w", name: "Deep Cleaning 4 Weeks", price: 670 },
    ],
    Sunnyvale: [
      { id: "classic-2w", name: "Classic Cleaning 2 Weeks", price: 210 },
      { id: "classic-4w", name: "Classic Cleaning 4 Weeks", price: 360 },
      { id: "deep-2w", name: "Deep Cleaning 2 Weeks", price: 410 },
      { id: "deep-4w", name: "Deep Cleaning 4 Weeks", price: 660 },
    ],
    Brookfield: [
      { id: "classic-2w", name: "Classic Cleaning 2 Weeks", price: 230 },
      { id: "classic-4w", name: "Classic Cleaning 4 Weeks", price: 380 },
      { id: "deep-2w", name: "Deep Cleaning 2 Weeks", price: 430 },
      { id: "deep-4w", name: "Deep Cleaning 4 Weeks", price: 680 },
    ],
    Riverside: [
      { id: "classic-2w", name: "Classic Cleaning 2 Weeks", price: 240 },
      { id: "classic-4w", name: "Classic Cleaning 4 Weeks", price: 390 },
      { id: "deep-2w", name: "Deep Cleaning 2 Weeks", price: 440 },
      { id: "deep-4w", name: "Deep Cleaning 4 Weeks", price: 690 },
    ],
  };

  useEffect(() => {
    if (selectedCommunity) {
      setPlans(communityPricing[selectedCommunity] || []);
    } else {
      setPlans([]);
    }
  }, [selectedCommunity]);

  return (
    <main className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-amber-500">
        Select Your Community for {serviceId.replace("-", " ")}
      </h1>

      {/* Dropdown for communities */}
      <div className="mb-6 w-full max-w-sm relative">
        <select
          value={selectedCommunity}
          onChange={(e) => setSelectedCommunity(e.target.value)}
          className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 appearance-none cursor-pointer"
        >
          <option value="" disabled>
            -- Select your community --
          </option>
          {communities.map((comm) => (
            <option key={comm} value={comm}>
              {comm}
            </option>
          ))}
        </select>

        {/* Custom arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Show selected community */}
      {selectedCommunity && (
        <div className="mb-6">
          <span className="font-semibold">
            Selected Community: {selectedCommunity}
          </span>
        </div>
      )}

      {/* Plans displayed after community selection */}
      {selectedCommunity && plans.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Available Plans in {selectedCommunity}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                serviceId={serviceId}
                community={selectedCommunity}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
