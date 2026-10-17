"use client";

import React from "react";

const TICKER_ITEMS = [
  { symbol: "NIFTY 50", price: "₹25,120.50", change: "+0.85%" },
  { symbol: "SENSEX", price: "₹82,450.00", change: "+0.92%" },
  { symbol: "BANKNIFTY", price: "₹51,800.20", change: "+1.15%" },
  { symbol: "RELIANCE.NS", price: "₹1,450.00", change: "+1.20%" },
  { symbol: "BTC/USDT", price: "$61,695.00", change: "+4.25%" },
  { symbol: "ETH/USDT", price: "$2,640.50", change: "+2.10%" },
  { symbol: "AAPL", price: "$225.30", change: "+1.65%" },
  { symbol: "TSLA", price: "$242.80", change: "-2.30%" },
  { symbol: "S&P 500", price: "$5,815.00", change: "+0.45%" },
];

export default function MarketTickerTape() {
  return (
    <div className="bg-[#0e1217] border-b border-gray-800 py-2 px-4 overflow-x-auto flex space-x-8 text-xs whitespace-nowrap scrollbar-none mb-4">
      {TICKER_ITEMS.map((item, i) => (
        <div key={i} className="flex items-center space-x-2">
          <span className="text-gray-400 font-medium">{item.symbol}</span>
          <span className="text-white font-semibold">{item.price}</span>
          <span className={item.change.startsWith("+") ? "text-emerald-400" : "text-red-400"}>
            {item.change}
          </span>
        </div>
      ))}
    </div>
  );
}