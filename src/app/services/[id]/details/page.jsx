"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
 
export default function ServiceDetails() {
  const { id } = useParams();
  const [selected, setSelected] = useState("Select a Community");
  const router = useRouter();
 
  // build items
  const items = [];
  for (let i = 1; i <= 5; i++) {
    items.push(
      <option
        key={i}
        className="px-4 py-2 text-sm text-gray-700 cursor-pointer"
        value={`Community ${i}`}
      >
        Community {i}
      </option>
    );
  }
 
  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold mt-10 text-center mb-10">
        All Service List
      </h1>
 
      {/* Dropdown section */}
      <div className="mt-8 sm:mt-10 w-full max-w-xs sm:max-w-sm px-2">
        <p className="text-lg sm:text-xl font-bold mb-2 text-center text-gray-600">
          Select Community
        </p>
 
        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-md bg-white py-3 px-3 sm:px-4 shadow-sm outline-none text-gray-700 "
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="Select a Community">Select a Community</option>
            {items}
          </select>
        </div>
 
        <button
          className="mt-6 sm:mt-10 w-1/2 sm:w-1/2 mx-auto bg-[#dba144] text-white py-3 rounded-md hover:bg-yellow-600 shadow-md flex items-center justify-center gap-2"
          onClick={() => router.push(`/services/${id}/reviews`)}
        >
          Proceed <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
 
 