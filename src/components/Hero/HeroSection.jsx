"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  // Simulate preloader delay (you can remove this if you already have one)
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800); // after preloader
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center bg-[#ffb22c] min-h-screen overflow-hidden">
      {showContent && (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-2xl font-bold text-font mb-6 leading-snug pt-[30px]"
          >
            <span className="text-white">HYDERABAD'S FIRST</span> MONTHLY
            BATHROOM <span className="text-white">CLEANING SERVICES</span>
          </motion.h1>

          <motion.button
            onClick={() => router.push("/customer/services")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="px-3 py-1 mt-2 bg-white text-[#f4a300] font-semibold rounded-sm shadow-lg"
          >
            BOOK NOW
          </motion.button>

          <motion.img
            src="/cleaning2.png"
            alt="Cleaning Service"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-5 max-h-[300px] object-contain"
          />
        </>
      )}
    </section>
  );
}
