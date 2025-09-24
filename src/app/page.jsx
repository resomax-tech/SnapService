// app/page.js
"use client";

import HeroSection from "@/components/Hero/HeroSection";

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1 min-h-screen yellow">
      <HeroSection />
    </main>
  );
}
