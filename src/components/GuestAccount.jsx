"use client";
import { useRouter } from "next/navigation";
export default function GuestAccount(){
  const router = useRouter();
    return (
        <div className="flex flex-col items-center">
        <img
          src="/service.webp"
          alt="service"
          className="h-70 object-contain mt-4"
        />

        {/* Profile Section */}
        <div className="w-full max-w-md text-center py-2 flex flex-col gap-4 mt-4">
          <h2 className="text-2xl font-bold text-gray-800">Sparkling Bathrooms, <br /> Effortlessly Clean</h2>
          <p className="text-xs text-gray-600">Book professional bathroom cleaning at your fingertips. Safe, reliable, and hassle-free - just like it should be.</p>
          {/* Buttons */}
          <div className="flex gap-2 justify-center items-center text-base mt-4">
            <button
              onClick={() => router.push("/customer/account/login")}
              className="bg-[#dba144] text-white rounded-lg font-semibold hover:bg-white hover:text-[#dba144] transition-colors duration-300 h-12 w-[44%]"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/customer/account/register")}
              className="border-2 border-[#dba144] text-[#dba144] rounded-lg font-semibold hover:bg-[#dba144] hover:text-white transition-colors duration-300 h-12 w-[44%]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    )
}