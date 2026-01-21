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

// Calculate sunrise and sunset times based on date and location
// Using simplified calculation: sunrise at 6:00, sunset at 20:00 local time
// For more accuracy, you could use a library like suncalc
function getSunriseSunset(date: Date): { sunrise: Date; sunset: Date } {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // Simple approximation: sunrise at 6:00, sunset at 20:00 local time
  // You can adjust these times or use a more sophisticated calculation
  const sunrise = new Date(year, month, day, 6, 0, 0);
  const sunset = new Date(year, month, day, 20, 0, 0);
  
  return { sunrise, sunset };
}

function isAfterSunset(date: Date): boolean {
  const { sunset } = getSunriseSunset(date);
  return date >= sunset;
}

function isBeforeSunrise(date: Date): boolean {
  const { sunrise } = getSunriseSunset(date);
  return date < sunrise;
}

function shouldUseDarkMode(manual: boolean, manualTheme: Theme | null): Theme {
  // If manually set, use manual theme
  if (manual && manualTheme) {
    return manualTheme;
  }
  
  // Otherwise, use time-based logic
  const now = new Date();
  
  // After sunset OR before sunrise = dark mode
  if (isAfterSunset(now) || isBeforeSunrise(now)) {
    return "dark";
  }
  
  // After sunrise and before sunset = light mode
  return "light";
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    // Initial load: read storage
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const storedManual = window.localStorage.getItem(STORAGE_MANUAL_KEY);
    const isManual = storedManual === "true";

    setManual(isManual);

    // Determine initial theme
    const initialTheme = shouldUseDarkMode(isManual, storedTheme);
    setThemeState(initialTheme);
    applyThemeToDocument(initialTheme);

    // Set up interval to check time every minute
    const interval = setInterval(() => {
      const currentManual = window.localStorage.getItem(STORAGE_MANUAL_KEY) === "true";
      if (!currentManual) {
        // Only update if not manually set
        const currentStoredTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
        const newTheme = shouldUseDarkMode(false, null);
        setThemeState((prevTheme) => {
          if (newTheme !== prevTheme) {
            applyThemeToDocument(newTheme);
            return newTheme;
          }
          return prevTheme;
        });
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
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
      setThemeState(next);
    } else {
      // If not manual, reset to automatic mode
      setManual(false);
      const autoTheme = shouldUseDarkMode(false, null);
      setThemeState(autoTheme);
    }
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

