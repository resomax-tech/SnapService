"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import SignInModal from "@/components/SignInModal";
import Loader from "@/components/Preloader/Loader";
import { useBooking } from "@/lib/bookingContext";
import { useAuth } from "@/lib/authContext";
import axios from "axios";

export default function CommunityPage() {
  const { id } = useParams();
  const router = useRouter();

  const [community, setCommunity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {isLoggedIn, loading } = useAuth()
  const [data, setData] = useState([])

  const { bookingData, updateBooking } = useBooking();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/community')
        const data = response.data.communities
        setData(data)

      } catch (error) {
        console.log("Error: ", error.message)
      }
    }
    fetchData()
  }, [])


  const handleNext = () => {
    if (!community) return alert("Please select your community!");

    if (isLoggedIn) {
      router.push(`/services/${id}/booking`);
    } else {
      setShowModal(true);
    }
  };

  if (loading) return <Loader/>



  return (
    <main className="max-w-lg mx-auto p-6 min-h-screen flex flex-col overflow-hidden">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
        Select Your Community
      </h1>
      <h2 className="text-md font-semibold mb-4"></h2>

      {/* Dropdown field */}
      <select
        value={community?._id || ""}
        onChange={(e) => {
          const selected = data.find(c => c._id === e.target.value);
          setCommunity(selected);
          updateBooking({ community: selected })
        }} className="w-full p-2 mb-6 border border-gray-800 rounded-md text-sm outline-0"
      >
        <option value="" disabled>
          -- Select your community --
        </option>
        {data.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!community}
        className={`px-6 py-3 rounded-md w-full text-lg font-semibold transition-colors ${community
          ? "bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-300 border border-gray-700"
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
