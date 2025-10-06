"use client";

import { useRouter } from "next/navigation";

export default function Step3({ formData }) {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/"); // navigate to home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* Success Illustration */}
      <div className="flex justify-center mb-4">
        <img
          src="/thankyou3.svg" // path from public folder
          alt="Payment Success Illustration"
          className="h-80 mt-10 object-contain"
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
      <p className="text-gray-600 mb-6">
        Your booking has been successfully completed 
      </p>

      {/* Button */}
      <button
        onClick={handleContinue}
        className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600"
      >
        Continue Home
      </button>
    </div>
  );
}
