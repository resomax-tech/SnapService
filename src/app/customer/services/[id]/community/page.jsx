"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import PlanCard from "@/components/PlanCard";
import axios from "axios";

export default function CommunityPage() {
  const { id: serviceId } = useParams();

  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [plans, setPlans] = useState({});

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('/api/community/')
        // console.log("communities: ", response.data.communities);
        
        setCommunities(response.data.communities)
      } catch (error) {
      }
    };
    fetchCommunities();
  }, []);

  // Mapping plan details
  const PLAN_DETAILS = {
    twoweekclassic: {
      id: "classic-2w",
      title: "Classic Cleaning",
      type: "classic",
      weeks: "2 Weeks/Month",
      price: 0,
    },
    twoweekdeep: {
      id: "deep-2w",
      title: "Deep Cleaning",
      type: "deep",
      weeks: "2 Weeks/Month",
      price: 0,
    },
    fourweekclassic: {
      id: "classic-4w",
      title: "Classic Cleaning",
      type: "classic",
      weeks: "4 Weeks/Month",
      price: 0,
    },
    fourweekdeep: {
      id: "deep-4w",
      title: "Deep Cleaning",
      type: "deep",
      weeks: "4 Weeks/Month",
      price: 0,
    },
  };

  // Handle community selection
  const handleCommunitySelect = (name) => {
    const communityObject = communities.find((c) => c.name === name);
    if (communityObject) {
      setSelectedCommunity(communityObject);
      setPlans(communityObject.plans);
    } else {
      setSelectedCommunity(null);
      setPlans({});
    }
  };

  // Reusable Contact Us section
  const ContactSection = () => (
    <div className="bg-gray-100 shadow-sm p-4 rounded-lg mb-6 mt-10">
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
  );

  return (
    <main className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Select Your Community for {serviceId.replace("-", " ")}
      </h1>

      {/* Community Dropdown */}
      <div className="mb-6 w-full max-w-sm relative">
        <select
          value={selectedCommunity?.name || ""}
          onChange={(e) => handleCommunitySelect(e.target.value)}
          className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-100 appearance-none cursor-pointer"
        >
          <option value="" disabled>
            -- Select your community --
          </option>
          {communities.map((comm) => (
            <option key={comm._id} value={comm.name}>
              {comm.name}
            </option>
          ))}
        </select>
      </div>

      {/* Show Contact section first if no community selected */}
      {!selectedCommunity && <ContactSection />}

      {/* Plans */}
      {selectedCommunity && Object.keys(plans).length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Available Plans in {selectedCommunity.name}
          </h2>
          <div className="grid md:grid-cols-3  gap-2">
            {Object.entries(plans).map(([planName]) => {
              const baseDetails = PLAN_DETAILS[planName];
              if (!baseDetails) return null;

              const details = { ...baseDetails, price: plans[planName] };

              return (
                <PlanCard
                  key={details.id}
                  plan={details}
                  serviceId={serviceId}
                  community={selectedCommunity}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Show Contact section last if community selected */}
      {selectedCommunity && <ContactSection />}
    </main>
  );
}
