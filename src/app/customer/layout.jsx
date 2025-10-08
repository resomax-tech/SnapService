"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function CustomerLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto py-16 bg-gray-50">
        {children}
        </main>
      <Footer />
    </>
  );
}
