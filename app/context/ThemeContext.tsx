"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "midnight" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === "light" ? "light bg-gray-100 text-gray-900" : theme === "midnight" ? "midnight bg-[#050b14] text-white" : "dark bg-[#0b0e11] text-white"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);