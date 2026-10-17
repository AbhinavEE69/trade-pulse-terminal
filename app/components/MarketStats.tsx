"use client";

import React from "react";

export default function MarketStats() {
  const stats = [
    { label: "24h High", value: "$62,150.00" },
    { label: "24h Low", value: "$60,400.00" },
    { label: "24h Volume (BTC)", value: "34,821.45 BTC" },
    { label: "24h Turnover (USDT)", value: "$2.14B" },
    { label: "Funding Rate", value: "+0.0100%" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#12161c] border border-gray-800 rounded-xl px-4 py-2.5 flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</span>
          <span className="text-sm font-bold text-gray-200 mt-0.5">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}