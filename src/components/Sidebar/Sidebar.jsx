// components/Sidebar/Sidebar.jsx
"use client";

import SidebarLink from "./SidebarLink";
import { CgCloseR } from "react-icons/cg";

export default function Sidebar({ menuOpen, setMenuOpen }) {
  if (!menuOpen) return null;

  const links = [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/bookings", label: "Bookings" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms" },
    { href: "/account/register", label: "Account" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)} />
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 translate-x-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e2e2]">
          <h2 className="text-2xl font-semibold py-2">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <CgCloseR className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4 text-lg">
          {links.map(link => (
            <SidebarLink key={link.href} href={link.href} label={link.label} onClick={() => setMenuOpen(false)} />
          ))}
        </nav>
      </aside>
    </>
  );
}
