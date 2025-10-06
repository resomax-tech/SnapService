"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

export default function SignInModal({ onClose, redirectTo }) {
  const router = useRouter();

  const {user, isLoggedIn} = useAuth()

  const handleSignIn = () => {
    // For now, we simulate a successful login
    if (isLoggedIn) {
      router.push(redirectTo); // Redirect to the booking page
    }
    else{
      router.push("/customer/account/login")
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          ✖
        </button>

        <h2 className="text-lg font-bold mb-3">Sign In Required</h2>
        <p className="text-gray-600 mb-4">
          Please sign in to continue with your booking.
        </p>

        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
