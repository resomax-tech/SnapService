"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import BookingForm from "@/components/BookingForm";
import StepIndicator from "@/components/bookingfolder/StepIndicator";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const community = searchParams.get("community") || "Not Selected";
  const plan = searchParams.get("plan") || "bathroom-cleaning";
  const bathrooms = searchParams.get("bathrooms") || "1";

  const [step, setStep] = useState(1); // Step state lifted here

  // Map plan IDs to display names
  const planName =
    plan.includes("bathroom") ? "Bathroom Cleaning Service" :
    plan.includes("classic") ? "Classic Cleaning Service" :
    plan.includes("deep") ? "Deep Cleaning Service" :
    "Cleaning Service";

  const price = "Rs. 900 Per Month"; // temporary until backend
  const taxInfo = "Exclusive of all taxes";

  return (
    <main className="max-w-md mx-auto px-4 py-6 min-h-screen bg-white">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Review Your Booking</h1>

      {/* Cart Summary */}
      <div className="bg-gray-50 p-4 rounded-xl shadow border border-gray-200  mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{planName}</h2>
        <p className="text-xl font-semibold text-gray-900">{price}</p>
        <p className="text-sm text-green-600 mt-1">{taxInfo}</p>
      </div>

      {/* Step Indicator */}
      <StepIndicator step={step} className="mb-6 ml-30" />

      {/* Booking Form */}
      <BookingForm step={step} setStep={setStep} />
    </main>
  );
}
