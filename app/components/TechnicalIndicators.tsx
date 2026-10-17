"use client";

import React, { useState } from "react";
import { Sliders, Check } from "lucide-react";

export default function TechnicalIndicators() {
  const [activeIndicators, setActiveIndicators] = useState({
    MA20: true,
    EMA50: false,
    RSI: true,
    MACD: false,
    Bollinger: false,
  });

  const toggle = (key: keyof typeof activeIndicators) => {
    setActiveIndicators((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex items-center space-x-2 bg-[#191f28] px-3 py-1.5 rounded-lg border border-gray-800 text-xs mb-3">
      <Sliders className="h-3.5 w-3.5 text-emerald-400 mr-1" />
      <span className="text-gray-400 font-medium mr-2">Indicators:</span>
      {Object.entries(activeIndicators).map(([name, active]) => (
        <button
          key={name}
          onClick={() => toggle(name as keyof typeof activeIndicators)}
          className={`px-2 py-0.5 rounded flex items-center space-x-1 transition ${
            active ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-semibold" : "bg-[#12161c] text-gray-400 hover:text-white"
          }`}
        >
          {active && <Check className="h-3 w-3" />}
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}