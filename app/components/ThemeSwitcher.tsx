"use client";

import React, { useState } from "react";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: any) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: "dark", name: "Bloomberg Dark", icon: Moon },
    { id: "midnight", name: "Midnight Navy", icon: Monitor },
    { id: "light", name: "Institutional Light", icon: Sun },
  ];

  const activeThemeObj = themes.find((t) => t.id === currentTheme) || themes[0];
  const ActiveIcon = activeThemeObj.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-[#12161c] hover:bg-[#1a2028] px-3 py-2 rounded-xl border border-gray-800 transition text-xs font-semibold text-gray-300"
      >
        <ActiveIcon className="h-4 w-4 text-emerald-400" />
        <span className="hidden sm:inline">{activeThemeObj.name}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#12161c] border border-gray-800 rounded-xl shadow-2xl z-50 p-1.5 space-y-1">
          {themes.map((t) => {
            const IconComponent = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onThemeChange(t.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center space-x-2.5 transition ${
                  currentTheme === t.id
                    ? "bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30"
                    : "text-gray-300 hover:bg-[#1e2329]"
                }`}
              >
                <IconComponent className="h-3.5 w-3.5" />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}