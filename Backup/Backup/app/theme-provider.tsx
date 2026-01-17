"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme, options?: { manual?: boolean }) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "pm-theme";
const STORAGE_MANUAL_KEY = "pm-theme-manual";

function applyThemeToDocument(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    // Initial load: read storage; default is always light if nothing stored
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const storedManual = window.localStorage.getItem(STORAGE_MANUAL_KEY);
    const isManual = storedManual === "true";

    const nextTheme: Theme = storedTheme && isManual ? storedTheme : "light";

    if (storedTheme && isManual) {
      setManual(true);
    }

    setThemeState(nextTheme);
    applyThemeToDocument(nextTheme);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, theme);
    window.localStorage.setItem(STORAGE_MANUAL_KEY, manual ? "true" : "false");
    applyThemeToDocument(theme);
  }, [theme, manual]);

  const setTheme = (next: Theme, options?: { manual?: boolean }) => {
    if (options?.manual) {
      setManual(true);
    }
    setThemeState(next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

