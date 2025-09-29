// app/page.js
"use client";

import HeroSection from "@/components/Hero/HeroSection";
import Preloader from "@/components/Preloader/Preloader";
import PreloaderWrapper from "@/components/Preloader/PreloaderWrapper";

export default function HomePage() {
  return (
    <PreloaderWrapper>
        <HeroSection />

    </PreloaderWrapper>
    
  );
}
