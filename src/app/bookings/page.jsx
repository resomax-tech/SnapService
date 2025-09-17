"use client";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [mounted, setMounted] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setMounted(true);
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(stored);
  }, []);

  if (!mounted) return null;

  const handleCancel = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 mt-5">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-xl p-5 border"
            >
              <h2 className="text-lg font-semibold mb-2">
                {booking.serviceId} Service
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Date:</span>{" "}
                {booking.bookingDate}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Location:</span>{" "}
                {booking.bookingInfo?.address || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Amount:</span> ₹
                {booking.amount}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Payment:</span>{" "}
                {booking.paymentMethod}
              </p>

              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                onClick={() => handleCancel(booking.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
