"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PlanCard from "@/components/PlanCard";

export default function CommunityPage() {
  const { id: serviceId } = useParams();
  const [communities] = useState([
    "Greenwood",
    "Maplewood",
    "Sunnyvale",
    "Brookfield",
    "Riverside",
  ]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [plans, setPlans] = useState([]);

  const communityPricing = {
    Greenwood: [
      { id: "classic-2w", name: "Classic Cleaning", type: "Classic", weeks: "2weeks/Month" },
      { id: "classic-4w", name: "Classic Cleaning", type: "Classic", weeks: "4weeks/Month" },
      { id: "deep-2w", name: "Deep Cleaning", type: "Deep", weeks: "2weeks/Month" },
      { id: "deep-4w", name: "Deep Cleaning", type: "Deep", weeks: "4weeks/Month" },
    ],
    Maplewood: [
      { id: "classic-2w", name: "Classic Cleaning", type: "Classic", weeks: "2weeks/Month" },
      { id: "classic-4w", name: "Classic Cleaning", type: "Classic", weeks: "4weeks/Month" },
      { id: "deep-2w", name: "Deep Cleaning", type: "Deep", weeks: "2weeks/Month" },
      { id: "deep-4w", name: "Deep Cleaning", type: "Deep", weeks: "4weeks/Month" },
    ],
    Sunnyvale: [
      { id: "classic-2w", name: "Classic Cleaning", type: "Classic", weeks: "2weeks/Month" },
      { id: "classic-4w", name: "Classic Cleaning", type: "Classic", weeks: "4weeks/Month" },
      { id: "deep-2w", name: "Deep Cleaning", type: "Deep", weeks: "2weeks/Month" },
      { id: "deep-4w", name: "Deep Cleaning", type: "Deep", weeks: "4weeks/Month" },
    ],
    Brookfield: [
      { id: "classic-2w", name: "Classic Cleaning", type: "Classic", weeks: "2weeks/Month" },
      { id: "classic-4w", name: "Classic Cleaning", type: "Classic", weeks: "4weeks/Month" },
      { id: "deep-2w", name: "Deep Cleaning", type: "Deep", weeks: "2weeks/Month" },
      { id: "deep-4w", name: "Deep Cleaning", type: "Deep", weeks: "4weeks/Month" },
    ],
    Riverside: [
      { id: "classic-2w", name: "Classic Cleaning", type: "Classic", weeks: "2weeks/Month" },
      { id: "classic-4w", name: "Classic Cleaning", type: "Classic", weeks: "4weeks/Month" },
      { id: "deep-2w", name: "Deep Cleaning", type: "Deep", weeks: "2weeks/Month" },
      { id: "deep-4w", name: "Deep Cleaning", type: "Deep", weeks: "4weeks/Month" },
    ],
  };

  useEffect(() => {
    if (selectedCommunity) setPlans(communityPricing[selectedCommunity] || []);
    else setPlans([]);
  }, [selectedCommunity]);

  return (
    <main className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 ">
        Select Your Community for {serviceId.replace("-", " ")}
      </h1>

      {/* Community Dropdown */}
      <div className="mb-6 w-full max-w-sm relative">
        <select
          value={selectedCommunity}
          onChange={(e) => setSelectedCommunity(e.target.value)}
          className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-100 appearance-none cursor-pointer"
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
      </div>

      {/* Disclaimer if community not found */}
      <div className="bg-gray-100 shadow-sm  p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Can’t find your community? You can register your community with us.
        </p>
        <a
          href="/customer/contact"
          className="inline-block mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-gray-500"
        >
          Contact Us
        </a>
      </div>

      {/* Plans */}
      {selectedCommunity && plans.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Available Plans in {selectedCommunity}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
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
