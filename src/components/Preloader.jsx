// components/Preloader.js
"use client";

export default function Preloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <img src="/headerlogo.png" alt="loader" className="h-10" />
    </div>
  );
}
