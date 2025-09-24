// components/Header/HamburgerButton.jsx
"use client";
import { LuMenu } from "react-icons/lu";

export default function HamburgerButton({ onClick }) {
  return (
    <button onClick={onClick} className="p-0" aria-label="Open menu">
      <LuMenu className="w-7 h-5" />
    </button>
  );
}
