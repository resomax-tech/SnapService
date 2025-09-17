"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ReviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [date, setDate] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDate(new Date()); // default today's date
  }, []);

  if (!mounted) return null;

  const isSignedIn = false; // 🔑 replace with your real auth check

  const handleNext = () => {
    localStorage.setItem("bookingDate", date.toDateString());
    localStorage.setItem("selectedServiceId", id);

    if (!isSignedIn) {
      setShowModal(true); // open modal if not logged in
    } else {
      router.push(`/services/${id}/reviews/confirm`);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="text-yellow-500">Home</span> &gt;{" "}
        <span>Service Details</span> &gt;{" "}
        <span className="font-semibold">Review Your Booking</span>
      </nav>

      <h1 className="text-2xl font-bold mb-6">Review Your Booking</h1>

      {/* Service Info */}
      <div className="bg-gray-100 p-5 rounded-xl shadow-md h-36 mb-6">
        <h2 className="text-2xl font-bold mb-6">{id} Service</h2>
        <p className="text-2xl ml-30 font-bold mb-2">Rs. 900 Per Month</p>
        <p className="text-green-600 ml-40 text-sm">Exclusive of all taxes</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-[#dba144] text-white rounded-full font-bold">1</div>
          <span className="text-xs mt-1">Review</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full font-bold">2</div>
          <span className="text-xs mt-1 text-gray-400">Booking Info</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full font-bold">3</div>
          <span className="text-xs mt-1 text-gray-400">Payment</span>
        </div>
      </div>

      {/* Booking Date */}
      <h2 className="text-lg font-bold mb-3">Booking Date</h2>
      <div className="bg-gray-50 p-5 rounded-xl shadow-md">
        <Calendar onChange={setDate} value={date} minDate={new Date()} className="border-none w-full" />
      </div>
      <p className="mt-4 text-center">
        Selected Date: <span className="font-semibold">{date?.toDateString()}</span>
      </p>

      {/* Next Button */}
      <button
        className="mt-8 w-full bg-[#dba144] text-white py-3 rounded-lg font-semibold transition"
        onClick={handleNext}
      >
        Next →
      </button>

      {/* Sign In Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Sign In to Continue</h3>
            <p className="mb-6">You need to sign in before proceeding with the booking.</p>
            <button
              className="bg-[#dba144] text-white py-2 px-4 rounded-lg font-semibold"
              onClick={() => {
                router.push(`/Account/Login?redirect=/services/${id}/reviews/confirm`);
              }}
            >
              Sign In
            </button>
            <button
              className="ml-4 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
