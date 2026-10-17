"use client";

import React from "react";
import { TrendingUp, Activity } from "lucide-react";

export default function PortfolioEquityChart() {
  // Simulated cumulative equity data points over time ($10,000 initial base)
  const dataPoints = [
    { time: "09:30", value: 10000 },
    { time: "10:00", value: 10120 },
    { time: "10:30", value: 10050 },
    { time: "11:00", value: 10340 },
    { time: "11:30", value: 10290 },
    { time: "12:00", value: 10580 },
    { time: "12:30", value: 10790 },
  ];

  const minValue = 9800;
  const maxValue = 11000;

  // Convert values to SVG coordinate percentages
  const points = dataPoints
    .map((pt, idx) => {
      const x = (idx / (dataPoints.length - 1)) * 100;
      const y = 100 - ((pt.value - minValue) / (maxValue - minValue)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-5 w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-gray-200">Cumulative Portfolio Equity Curve</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Total Return:</span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
            +7.90% ($790.00)
          </span>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative h-44 w-full bg-[#191f28]/50 rounded-xl p-4 border border-gray-800/80 flex flex-col justify-end">
        <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <polygon points={`0,100 ${points} 100,100`} fill="url(#equityGradient)" />

          {/* Line Path */}
          <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
        </svg>

        {/* Time Labels */}
        <div className="flex justify-between text-[10px] text-gray-500 z-10 pt-2 border-t border-gray-800">
          {dataPoints.map((pt, idx) => (
            <span key={idx}>{pt.time}</span>
          ))}
        </div>
      </div>
    </div>
  );
}