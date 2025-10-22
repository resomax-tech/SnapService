// src/app/admin/layout.jsx
"use client";

import Sidebar from "@/components/SidebarAdmin"; // your sidebar component
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      {pathname!== "/admin/login"&&<Sidebar />}
      

      {/* Main content area */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
