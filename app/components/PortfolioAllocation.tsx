"use client";

import React from "react";
import { PieChart, Shield } from "lucide-react";

export default function PortfolioAllocation() {
  const allocations = [
    { label: "Indian Equities (NSE/BSE)", percentage: 45, color: "bg-blue-500" },
    { label: "US Tech (NASDAQ)", percentage: 30, color: "bg-emerald-500" },
    { label: "Cryptocurrency (USDT)", percentage: 15, color: "bg-amber-500" },
    { label: "Liquid Cash Balance", percentage: 10, color: "bg-purple-500" },
  ];

  return (
    <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-5 w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <PieChart className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-gray-200">Portfolio Capital Allocation</h2>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span>Risk Profile: Growth / Balanced</span>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden flex mb-4">
        {allocations.map((item, idx) => (
          <div key={idx} className={`${item.color} h-full`} style={{ width: `${item.percentage}%` }} title={`${item.label}: ${item.percentage}%`} />
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {allocations.map((item, idx) => (
          <div key={idx} className="bg-[#191f28] p-2.5 rounded-xl border border-gray-800/80">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="text-gray-400 truncate">{item.label}</span>
            </div>
            <span className="font-bold text-white text-sm">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}