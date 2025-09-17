
"use client";

import { useEffect, useState } from "react";
import Preloader from "./Preloader";

export default function PreloaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Preloader />;

  return <>{children}</>;
}
