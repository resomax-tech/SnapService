"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignInModal from "./SignInModal";

export default function CommunityForm({ serviceId }) {
  const [community, setCommunity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Dummy check: replace with real auth check (e.g., from context or next-auth)
  const isSignedIn = false;

  const handleNext = () => {
    if (!community) return alert("Please select a community!");

    if (isSignedIn) {
      router.push(`/services/${serviceId}/booking`);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <label className="block mb-2 font-semibold">Choose your Community:</label>
      <select
        value={community}
        onChange={(e) => setCommunity(e.target.value)}
        className="w-full border p-2 rounded-md mb-4"
      >
        <option value="">-- Select --</option>
        <option value="Community A">Community A</option>
        <option value="Community B">Community B</option>
        <option value="Community C">Community C</option>
      </select>

      <button
        onClick={handleNext}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md"
      >
        Next
      </button>

      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
