"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const community = searchParams.get("community") || "Not Selected";
  const plan = searchParams.get("plan") || "No Plan";
  const bathrooms = searchParams.get("bathrooms") || "1";

  // Plan Name Formatting
  const formattedPlan =
    plan.includes("classic") ? "Classic Cleaning" :
    plan.includes("deep") ? "Deep Cleaning" :
    plan;

  return (
    <main className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">
      {/* Cart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Review Your Booking
        </h1>

        {/* Cart Details */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Community:</span>
            <span className="text-gray-800">{community}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Selected Plan:</span>
            <span className="text-gray-800">{formattedPlan}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">No. of Bathrooms:</span>
            <span className="text-gray-800">{bathrooms}</span>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <BookingForm />
      </div>
    </main>
  );
}
