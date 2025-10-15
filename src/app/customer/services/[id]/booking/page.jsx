"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import BookingForm from "@/components/BookingForm";
import StepIndicator from "@/components/bookingfolder/StepIndicator";
import { useBooking } from "@/lib/bookingContext";

export default function BookingPage() {
  const { bookingData, updateBooking } = useBooking()
  const plan = bookingData?.plan?.title || 'Bathroom Cleaning Service';

  const [step, setStep] = useState(1); // Step state lifted here



  // Map plan IDs to display names
  const price = bookingData?.plan?.price
    ? `Rs. ${bookingData.plan.price} Per Month`
    : "Price unavailable";
  const taxInfo = "Exclusive of all taxes";

  return (
    <main className="max-w-md mx-auto px-4 py-6 min-h-screen bg-white">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Review Your Booking</h1>

      {/* Cart Summary */}
      <div className="bg-gray-50 p-4 rounded-xl shadow border border-gray-200  mb-6">
        <h2 className="text-lg font-bold text-gray-800">{plan + " Service"}</h2>
        <span className="mb-4 text-sm font-semibold">{bookingData?.plan?.weeks}</span>
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
