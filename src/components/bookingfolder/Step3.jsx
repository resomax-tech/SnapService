"use client";
import { useBooking } from "@/lib/bookingContext";

export default function Step3({ prevStep, handleSubmit }) {
  const { bookingData } = useBooking();

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-4">
        <h3 className="text-xl font-semibold mb-4 text-center">Confirm Booking</h3>

        <p><b>Name:</b> {bookingData.user?.name || "-"}</p>
        <p><b>Phone:</b> {bookingData.user?.mobile || "-"}</p>
        <p><b>Email:</b> {bookingData.user?.email || "-"}</p>

        <p><b>Community:</b> {bookingData.community.name || "-"}</p>
        <p>
          <b>Plan:</b> {bookingData.plan?.title ? `${bookingData.plan.title} - ${bookingData.plan.weeks || "-"}` : "-"}
        </p>
        <p><b>Bathrooms:</b> {bookingData.bathrooms || "-"}</p>
        <p><b>Total Price:</b> ₹{bookingData.totalPrice || "0"}</p> 
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
