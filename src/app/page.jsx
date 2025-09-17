// app/page.js
"use client";

import "./globals.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/services"); //  goes to services page
  };

  return (
    <main className="flex flex-col min-h-screen yellow">
      <section className="flex flex-col items-center mt-16 flex-1 p-6 text-center">
        <h1 className="text-3xl font-bold text-font mb-6 leading-snug">
          <span className="text-white">HYDERABAD'S FIRST</span> MONTHLY
          BATHROOM <span className="text-white">CLEANING SERVICES</span>
        </h1>

        <button
          onClick={handleClick} //  FIXED
          className="px-3 py-1 mt-4 bg-white text-[#f4a300] text-2xl font-bold rounded-lg shadow-lg btn"
        >
          BOOK NOW
        </button>

        <img
          src="/cleaning2.png"
          alt="Cleaning Service"
          className="mt-8 max-w-xs h-96 object-contain mx-auto"
        />
      </section>
    </main>
  );
}
