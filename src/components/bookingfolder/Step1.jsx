"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useBooking } from "@/lib/bookingContext";
import { BookingCalendar } from "@/components/BookingCalendar"
export default function Step1({ nextStep }) {
  const router = useRouter();
  const [msg, setMsg] = useState('')
  const [availableDates, setAvailableDates] = useState([])
  const { bookingData, updateBooking } = useBooking()

  const fetchDates = async (date) => {
    const params = {
      community: bookingData.community._id,
      plan: bookingData.plan.type || "classic",
      weeks: bookingData.plan.key,
      startDate: date || new Date()
    }
    try {
      const response = await axios.get('/api/availability', { params })
      setAvailableDates(response.data.formatted)
      setMsg(response.data.msg)
    } catch (error) {
      console.log("error: ", error.message);
    }
  }
  useEffect(() => {
    if (bookingData?.community?._id && bookingData?.plan?.type) {
      fetchDates();
    }
  }, [bookingData]);

  const handleDates = (dates) => {
    updateBooking({ dates })
  }


  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Booking Date</h3>
        {
          availableDates ? <BookingCalendar
            fetchDates={fetchDates}
            planType={bookingData.plan?.key || "4W"}
            availableDates={availableDates}
            onDatesSelected={handleDates}
          /> : <p className="font-medium text-2xl text-center">{msg}</p>
        }

      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => router.back()}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Previous
        </button>

        <button
          disabled={!bookingData.dates || bookingData.dates.length === 0}
          onClick={nextStep}
          className="bg-yellow-500 text-white px-6 py-2 rounded font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
