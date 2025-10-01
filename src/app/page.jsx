// app/page.js
"use client";

import HeroSection from "@/components/Hero/HeroSection";
import Preloader from "@/components/Preloader/Preloader";
import LayoutWrapper from "@/components/LayoutWrapper";

import PreloaderWrapper from "@/components/Preloader/PreloaderWrapper";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <PreloaderWrapper>
      <Header/>
      <LayoutWrapper>
        <HeroSection />
      </LayoutWrapper>
      <Footer/>

    </PreloaderWrapper>
    
  );
}
