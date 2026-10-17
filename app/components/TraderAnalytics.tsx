"use client";

import React from "react";
import { BarChart3, Award, TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function TraderAnalytics() {
  return (
    <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-5 w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-gray-200">Trader Analytics & Performance KPIs</h2>
        </div>
        <span className="text-[10px] bg-emerald-950/50 text-emerald-400 border border-emerald-900/40 px-2 py-0.5 rounded font-semibold">
          Live Algorithm Verified
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Win Rate */}
        <div className="bg-[#191f28] border border-gray-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-gray-400 font-medium">Win Rate</span>
            <Award className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <span className="text-lg font-bold text-white">75.0%</span>
          <span className="text-[10px] text-emerald-400 mt-1">12 Wins / 4 Losses</span>
        </div>

        {/* Profit Factor */}
        <div className="bg-[#191f28] border border-gray-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-gray-400 font-medium">Profit Factor</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <span className="text-lg font-bold text-white">2.45</span>
          <span className="text-[10px] text-gray-400 mt-1">Gross Win / Loss ratio</span>
        </div>

        {/* Sharpe Ratio */}
        <div className="bg-[#191f28] border border-gray-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-gray-400 font-medium">Sharpe Ratio</span>
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
          </div>
          <span className="text-lg font-bold text-white">1.82</span>
          <span className="text-[10px] text-indigo-400 mt-1">Risk-adjusted return</span>
        </div>

        {/* Max Drawdown */}
        <div className="bg-[#191f28] border border-gray-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-gray-400 font-medium">Max Drawdown</span>
            <Zap className="h-3.5 w-3.5 text-red-400" />
          </div>
          <span className="text-lg font-bold text-white">-3.15%</span>
          <span className="text-[10px] text-red-400 mt-1">Within optimal limits</span>
        </div>
      </div>
    </div>
  );
}