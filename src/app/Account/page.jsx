"use client";

import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col  items-center mt-8 ">
      <h1 className="text-3xl font-bold mb-8 ">Profile</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => router.push("/account/login")}
          className="  bg-[#dba144] text-white rounded-lg font-semibold hover:bg-white hover:text-[#dba144] transition-colors duration-300 h-14 w-56"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push("/account/register")}
          className="  rounded-lg font-semibold hover:bg-white hover:text-[#dba144] transition-colors duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
