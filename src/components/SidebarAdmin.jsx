"use client";

import Link from "next/link";
import { LayoutDashboard, Building2, UserCog, Users, LogOut } from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
  { name: "Communities", path: "/admin/communities", icon: <Building2 size={18} /> },
  { name: "Workers", path: "/admin/workers", icon: <UserCog size={18} /> },
  { name: "Customers", path: "/admin/customers", icon: <Users size={18} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white text-gray-700 flex flex-col shadow">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center ">
        <img src="/SnapService Logo/logo2.png" alt="Logo" className="h-8 mt-2" />
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 hover:text-white"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 mb-10 flex items-center">
        <button
          onClick={() => alert("Logging out...")}
          className="flex items-center gap-2 p-2 w-full rounded-md bg-[#ED3F27] text-white font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
