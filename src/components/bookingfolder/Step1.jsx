"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useBooking } from "@/lib/bookingContext";
import { BookingCalendar } from "@/components/BookingCalendar"
import { normalizeLocalDate, toDateKey } from "@/lib/normalizeDate";
export default function Step1({ nextStep }) {
  const router = useRouter();
  const [msg, setMsg] = useState('')
  const [availableDates, setAvailableDates] = useState([])
  const { bookingData, updateBooking } = useBooking()
  const [isInvalidSelection, setIsInvalidSelection] = useState(false);


  const fetchDates = async (date) => {
    const params = {
      community: bookingData.community._id,
      plan: bookingData.plan.type || "classic",
      weeks: bookingData.plan.key,
      startDate: toDateKey(date)
    }
    try {

      const response = await axios.get('/api/availability', { params })
      const newData = response.data.formatted || []

      console.log("available dates: ", newData);
      


      setAvailableDates((prev) => {
        const map = new Map();
        [...prev, ...newData].forEach((d) => map.set(d.date, d));
        return Array.from(map.values()).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      });

      setMsg(response.data.msg)
    } catch (error) {
      console.log("error: ", error.message);
    }
  }
  useEffect(() => {
    if (bookingData?.community?._id && bookingData?.plan?.type) {
      fetchDates(new Date());
    }
  }, []);


  const handleDates = (dates) => {
    const dateKeys = dates.map(toDateKey);
    updateBooking({ dates: dateKeys });
  };


  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Booking Date</h3>
        {
          availableDates.length > 0 ? <BookingCalendar
            fetchDates={fetchDates}
            planType={bookingData.plan?.key || "4W"}
            bathrooms={bookingData.bathrooms}
            availableDates={availableDates}
            onDatesSelected={handleDates}
            onInvalidSelection={setIsInvalidSelection}
          /> : <p className="font-medium text-xl mt-10 text-center">{msg}</p>
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
          disabled={!bookingData.dates || isInvalidSelection || availableDates.length === 0 || bookingData.dates.length === 0}
          onClick={nextStep}
          className="bg-yellow-500 text-white px-6 py-2 rounded font-medium disabled:opacity-50"
        >
          Next
        </button>

      </div>
        {isInvalidSelection && (
          <p className="text-red-500 text-sm mt-2">
            ⚠️ Not enough worker capacity. Please choose another date.
          </p>
        )}
    </div>
  );
}
