"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Step1({ formData, setFormData, nextStep }) {
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState([])

  useEffect(()=>{
    const fetchDates = async () => {
      try {
        const response = await axios.get('/api/availability',)
      } catch (error) {
        console.log("error: ", error.message);        
      }
    }
  },[])


  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Booking Date</h3>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex justify-between mt-6">
        {/* Previous → go to community page */}
        <button
          onClick={() => router.push("/community")}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Previous
        </button>

        {/* Next → go to step2 */}
        <button
          disabled={!formData.date}
          onClick={nextStep}
          className="bg-yellow-500 text-white px-6 py-2 rounded font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

