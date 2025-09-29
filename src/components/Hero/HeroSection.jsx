"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
<section className="flex flex-col items-center justify-center text-center bg-[#ffb22c] min-h-screen">
      <h1 className="text-xl font-bold text-font mb-6 leading-snug pt-[30px]">
        <span className="text-white">HYDERABAD'S FIRST</span> MONTHLY
        BATHROOM <span className="text-white">CLEANING SERVICES</span>
      </h1>

      <button
        onClick={() => router.push("/services")}
        className="px-3 py-1 mt-2 bg-white text-[#f4a300] font-semibold rounded-sm shadow-lg"
      >
        BOOK NOW
      </button>

      <img
        src="/cleaning2.png"
        alt="Cleaning Service"
        className="mt-5 max-h-[300px] object-contain"
      />
    </section>
  );
}
