"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render without conditional padding to avoid mismatch
    return <main>{children}</main>;
  }

  const isHome = pathname === "/";
  return (
    <main className={!isHome ? "pt-16 pb-16" : ""}>
      {children}
    </main>
  );
}
