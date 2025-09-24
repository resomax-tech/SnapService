// components/Header/Header.jsx
"use client";

import { useState } from "react";
import Logo from "./Logo";
import HamburgerButton from "./HamburgerButton";
import Sidebar from "../Sidebar/Sidebar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 h-15">
      <div className="flex items-center justify-center px-4 py-3 m-2">
        <HamburgerButton onClick={() => setMenuOpen(true)} />
        <Logo />
      </div>

      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
}
