// components/Hero/HeroSection.jsx
"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center mt-16  p-6 text-center">
      <h1 className="text-2xl font-bold text-font mb-6 leading-snug">
        <span className="text-white">HYDERABAD'S FIRST</span> MONTHLY
        BATHROOM <span className="text-white">CLEANING SERVICES</span>
      </h1>

      <button
        onClick={() => router.push("/services")}
        className="px-3 py-1 mt-3 bg-white text-[#f4a300]  font-semibold rounded-sm shadow-lg btn "
      >
        BOOK NOW
      </button>

      <img
        src="/cleaning2.png"
        alt="Cleaning Service"
        className="mt-8 max-w-xs h-96 object-contain mx-auto"
      />
    </section>
  );
}
