"use client";

import React, { useState, useEffect } from "react";
import { Newspaper, TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";

const INITIAL_NEWS = [
  { id: "1", time: "2m ago", title: "RBI Holds Repo Rate at 6.5%, Focus Shifts to Liquidity Management", sentiment: "bullish", impact: "High" },
  { id: "2", time: "14m ago", title: "Nifty 50 Crosses Milestone Amid Strong Foreign Institutional Inflows", sentiment: "bullish", impact: "High" },
  { id: "3", time: "32m ago", title: "US Tech Giants Rally Driven by Record Q3 Cloud Infrastructure Growth", sentiment: "bullish", impact: "Medium" },
  { id: "4", time: "1h ago", title: "Crude Oil Futures Slip 1.4% Following Unexpected Inventory Build", sentiment: "bearish", impact: "Medium" },
  { id: "5", time: "2h ago", title: "Global Crypto ETF Volumes Surge Past $2.4B Daily Average", sentiment: "bullish", impact: "High" },
];

export default function MarketNewsSidebar() {
  const [news] = useState(INITIAL_NEWS);

  return (
    <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-4 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-3 border-b border-gray-800 pb-2">
        <div className="flex items-center space-x-2">
          <Newspaper className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-gray-200">Live Macro & News Feed</h2>
        </div>
        <span className="flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-Time</span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {news.map((item) => (
          <div key={item.id} className="bg-[#191f28] hover:bg-[#1e2329] border border-gray-800/80 p-3 rounded-xl transition cursor-pointer group">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-gray-400 flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
              </span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  item.sentiment === "bullish"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-900/50"
                    : "bg-red-950 text-red-400 border border-red-900/50"
                }`}
              >
                {item.impact} Impact
              </span>
            </div>
            <p className="text-xs font-medium text-gray-200 group-hover:text-emerald-400 transition leading-relaxed">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}