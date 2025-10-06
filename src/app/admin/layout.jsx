// src/app/admin/layout.jsx
"use client";

import Sidebar from "@/components/SidebarAdmin"; // your sidebar component

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
