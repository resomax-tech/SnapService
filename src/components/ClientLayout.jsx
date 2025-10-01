// components/ClientLayout.jsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide header/footer for admin/dashboard routes
  const hideLayout = pathname.startsWith("/admin/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </div>
  );
}
