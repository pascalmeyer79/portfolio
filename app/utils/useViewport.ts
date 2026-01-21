"use client";

import { useEffect, useState } from "react";

export const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Desktop: normale Einstellungen
  // Mobile/Tablet: angepasste Einstellungen für korrekte Scroll-Richtung
  const getViewport = () => {
    if (isMobile) {
      return { once: true, margin: "0px 0px -100px 0px", amount: 0.3 };
    }
    return { once: true, margin: "-100px" };
  };

  return { isMobile, getViewport };
};
