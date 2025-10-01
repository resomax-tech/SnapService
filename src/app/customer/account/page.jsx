"use client";

import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sign In - Primary */}
        <button
          onClick={() => router.push("/customer/account/login")}
          className="bg-[#dba144] text-white rounded-lg font-semibold hover:bg-white hover:text-[#dba144] transition-colors duration-300 h-14 w-56"
        >
          Sign In
        </button>

        {/* Sign Up - Secondary */}
        <button
          onClick={() => router.push("/customer/account/register")}
          className="border-2 border-[#dba144] text-[#dba144] rounded-lg font-semibold hover:bg-[#dba144] hover:text-white transition-colors duration-300 h-14 w-56"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
