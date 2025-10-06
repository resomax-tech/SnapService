"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <main>{children}</main>;

  const isHome = pathname === "/";
  const paddingClass = isHome ? "" : "pt-16 pb-16";

  return <main className={paddingClass}>{children}</main>;
}
