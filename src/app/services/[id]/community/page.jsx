"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import SignInModal from "@/components/SignInModal";

export default function CommunityPage() {
  const { id } = useParams();
  const router = useRouter();

  const [community, setCommunity] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Dummy login check → replace with real auth
  const isSignedIn = false;

  const communities = [
    "Greenwood",
    "Maplewood",
    "Sunnyvale",
    "Brookfield",
    "Riverside",
  ];

  const handleNext = () => {
    if (!community) return alert("Please select your community!");

    if (isSignedIn) {
      router.push(`/services/${id}/booking`);
    } else {
      setShowModal(true);
    }
  };

  return (
    <main className="max-w-lg mx-auto p-6 min-h-screen flex flex-col overflow-hidden">
      <h1 className="text-xl font-bold mb-6 text-center text-amber-500">
        Community List
      </h1>

      <h2 className="text-md font-semibold mb-4">Select Your Community</h2>

      {/* Dropdown field */}
      <select
        value={community}
        onChange={(e) => setCommunity(e.target.value)}
        className="w-full p-2 mb-6 border rounded-md text-sm"
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

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!community}
        className={`px-6 py-3 rounded-md w-full text-lg font-semibold transition-colors ${
          community
            ? "bg-amber-400 text-white hover:bg-white hover:text-amber-400 border border-amber-400"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>

      {/* SignIn Modal */}
      {showModal && (
        <SignInModal
          onClose={() => setShowModal(false)}
          redirectTo={`/services/${id}/booking`}
        />
      )}
    </main>
  );
}
