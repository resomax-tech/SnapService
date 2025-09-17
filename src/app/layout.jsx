// app/layout.jsx
"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuShoppingBag } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { LuUserRound, LuMenu, LuX } from "react-icons/lu";
import { CgCloseR } from "react-icons/cg";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import { LuHouse } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-mont-sans",
  subsets: ["latin"],
});

const plusJakartamono = Plus_Jakarta_Sans({
  variable: "--font-mont-mono",
  subsets: ["latin"],
});





export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const usePathnameValue = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // 🔹 Only show preloader, hide everything else
    return (
      <html lang="en">
        <body>
          <PreloaderWrapper />
        </body>
      </html>
    );
  }
  const bodyClass = `${plusJakartaSans.className} ${plusJakartamono.className} antialiased flex flex-col min-h-screen ${usePathnameValue === "/" ? "overflow-hidden" : "overflow-y-auto"
    }`;



  return (
    <html lang="en">
      <body className={bodyClass}>
        {/* Header */}
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 h-20 ">
          <div className="flex items-center justify-center px-4 py-3 m-2">
            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="p-0 focus:outline-none"
              aria-label="Open menu"
            >
              <LuMenu className="w-7 h-7 " />
            </button>

            {/* App Title */}
            <img
              src="/headerlogo.png"
              alt="Cleaning Service"
              className=" max-w-xs h-8   object-contain  mx-auto ps-2"
            />


            {/* Placeholder for spacing (to balance hamburger) */}
            <div className="w-6 h-6" />
          </div>
        </header>

        {/* Sidebar Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)} />
        )}

        {/* Sidebar Drawer */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b-1 border-[#e2e2e2]">
            <h2 className="text-2xl font-semibold py-2">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <CgCloseR className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-2 space-y-4 text-lg">
            <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href="/bookings" onClick={() => setMenuOpen(false)}>Bookings</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            <Link href="#" onClick={() => setMenuOpen(false)}>Privacy Policy</Link>
            <Link href="#" onClick={() => setMenuOpen(false)}>Terms</Link>
            <Link href="/Account/register" onClick={() => setMenuOpen(false)}>Account</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="overflow-y-auto flex-grow pt-15 pb-20">
          {children}
        </main>

        {/* Footer */}
        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-inner h-20">
          <nav className="flex justify-around items-center py-2 text-sm" role="navigation">
            {/* Home */}
            <Link
              href="/"
              className={`flex flex-col items-center gap-1.5 ${usePathnameValue === "/" ? "text-yellow-500" : "text-gray-700"
                }`}
              aria-current={usePathnameValue === "/" ? "page" : undefined}
            >
              <LuHouse
                className={`w-6 h-6 ${usePathnameValue === "/" ? "text-yellow-500" : "text-gray-700"
                  }`}
              />
              <span className="text-lg">Home</span>
            </Link>

            {/* Services */}
            <Link
              href="/services"
              className={`flex flex-col items-center gap-1.5 ${usePathnameValue === "/services" ? "text-yellow-500" : "text-gray-700"
                }`}
              aria-current={usePathnameValue === "/services" ? "page" : undefined}
            >
              <LuSettings
                className={`w-6 h-6 ${usePathnameValue === "/services" ? "text-yellow-500" : "text-gray-700"
                  }`}
              />
              <span className="text-lg">Services</span>
            </Link>

            {/* Cart */}
            <Link
              href="/bookings"
              className={`flex flex-col items-center gap-1.5 ${usePathnameValue === "/cart" ? "text-yellow-500" : "text-gray-700"
                }`}
              aria-current={usePathnameValue === "/bookings" ? "page" : undefined}
            >
              <LuShoppingBag
                className={`w-6 h-6 ${usePathnameValue === "/bookings" ? "text-yellow-500" : "text-gray-700"
                  }`}
              />
              <span className="text-lg">Bookings</span>
            </Link>

            {/* Account */}
            <Link
              href="/Account/register"
              className={`flex flex-col items-center gap-1.5 ${usePathnameValue === "/account" ? "text-yellow-500" : "text-gray-700"
                }`}
              aria-current={usePathnameValue === "/account" ? "page" : undefined}
            >
              <LuUserRound
                className={`w-6 h-6 ${usePathnameValue === "/account" ? "text-yellow-500" : "text-gray-700"
                  }`}
              />
              <span className="text-lg">Account</span>
            </Link>
          </nav>
        </footer>

      </body>
    </html>
  );
}
