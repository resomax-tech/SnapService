// components/Footer/Footer.jsx
"use client";

import FooterLink from "./FooterLink";
import { LuHouse, LuSettings, LuShoppingBag, LuUserRound } from "react-icons/lu";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", Icon: LuHouse },
    { href: "/services", label: "Services", Icon: LuSettings },
    { href: "/bookings", label: "Bookings", Icon: LuShoppingBag },
    { href: "/Account/register", label: "Account", Icon: LuUserRound },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-inner h-15">
      <nav className="flex justify-around items-center py-2 text-sm">
        {links.map(link => (
          <FooterLink key={link.href} {...link} pathname={pathname} />
        ))}
      </nav>
    </footer>
  );
}
