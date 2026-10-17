"use client";

import React from "react";
import { Cpu, Zap, DollarSign, Globe, ShoppingCart, Activity, ShieldCheck, Flame } from "lucide-react";

const WATCHLIST_COMPANIES = [
  { symbol: "RELIANCE.NS", name: "Reliance Industries", sector: "Energy / Retail", price: "₹1,450.00", change: "+1.20%", icon: Zap, color: "text-blue-400 bg-blue-950/30" },
  { symbol: "TCS.NS", name: "Tata Consultancy Services", sector: "Information Tech", price: "₹4,120.50", change: "+0.85%", icon: Cpu, color: "text-indigo-400 bg-indigo-950/30" },
  { symbol: "INFY.NS", name: "Infosys Ltd", sector: "Information Tech", price: "₹1,890.00", change: "-0.45%", icon: Cpu, color: "text-indigo-400 bg-indigo-950/30" },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank Ltd", sector: "Banking / Financial", price: "₹1,720.00", change: "+1.40%", icon: ShieldCheck, color: "text-emerald-400 bg-emerald-950/30" },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank Ltd", sector: "Banking / Financial", price: "₹1,245.30", change: "+0.65%", icon: ShieldCheck, color: "text-emerald-400 bg-emerald-950/30" },
  { symbol: "SBIN.NS", name: "State Bank of India", sector: "Banking / Financial", price: "₹810.10", change: "-0.30%", icon: ShieldCheck, color: "text-emerald-400 bg-emerald-950/30" },
  { symbol: "BHARTIARTL.NS", name: "Bharti Airtel", sector: "Telecommunications", price: "₹1,580.40", change: "+2.10%", icon: Activity, color: "text-amber-400 bg-amber-950/30" },
  { symbol: "ITC.NS", name: "ITC Limited", sector: "FMCG / Tobacco", price: "₹495.20", change: "+0.25%", icon: ShoppingCart, color: "text-purple-400 bg-purple-950/30" },
  { symbol: "LT.NS", name: "Larsen & Toubro", sector: "Engineering / Infra", price: "₹3,620.00", change: "+1.80%", icon: Flame, color: "text-orange-400 bg-orange-950/30" },
  { symbol: "TATAMOTORS.NS", name: "Tata Motors", sector: "Automotive", price: "₹980.50", change: "-1.50%", icon: Zap, color: "text-red-400 bg-red-950/30" },
  { symbol: "AAPL", name: "Apple Inc.", sector: "Consumer Tech", price: "$225.30", change: "+1.65%", icon: Cpu, color: "text-gray-200 bg-gray-800" },
  { symbol: "MSFT", name: "Microsoft Corp.", sector: "Software / Cloud", price: "$420.10", change: "+0.95%", icon: Cpu, color: "text-blue-400 bg-blue-950/30" },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Internet / AI", price: "$178.40", change: "+1.10%", icon: Globe, color: "text-yellow-400 bg-yellow-950/30" },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "E-Commerce / Cloud", price: "$186.20", change: "+2.05%", icon: ShoppingCart, color: "text-amber-400 bg-amber-950/30" },
  { symbol: "NVDA", name: "NVIDIA Corp.", sector: "Semiconductors / AI", price: "$128.50", change: "+3.40%", icon: Cpu, color: "text-emerald-400 bg-emerald-950/30" },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Automotive / EV", price: "$242.80", change: "-2.30%", icon: Zap, color: "text-red-400 bg-red-950/30" },
  { symbol: "META", name: "Meta Platforms", sector: "Social Media / AI", price: "$510.40", change: "+1.45%", icon: Globe, color: "text-blue-400 bg-blue-950/30" },
  { symbol: "BTC/USDT", name: "Bitcoin", sector: "Cryptocurrency", price: "$61,695.00", change: "+4.25%", icon: DollarSign, color: "text-yellow-400 bg-yellow-950/30" },
  { symbol: "ETH/USDT", name: "Ethereum", sector: "Cryptocurrency", price: "$2,640.50", change: "+2.10%", icon: DollarSign, color: "text-purple-400 bg-purple-950/30" },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Entertainment", price: "$685.20", change: "+0.75%", icon: Activity, color: "text-red-400 bg-red-950/30" },
];

export default function WatchlistGrid() {
  return (
    <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-5 w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-200">Global Watchlist & Equities</h2>
          <p className="text-xs text-gray-500">Live prices and sectoral breakdown across NSE, BSE, NASDAQ, and Crypto</p>
        </div>
        <span className="text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900/50 font-medium">
          20 Assets Monitored
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {WATCHLIST_COMPANIES.map((item) => {
          const Icon = item.icon;
          const isPositive = item.change.startsWith("+");
          return (
            <div
              key={item.symbol}
              className="bg-[#191f28] hover:bg-[#1e2329] border border-gray-800/80 hover:border-gray-700 p-3.5 rounded-xl transition flex items-center justify-between group cursor-pointer overflow-hidden"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1 mr-2">
                <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-bold text-xs text-white group-hover:text-emerald-400 transition truncate">
                    {item.symbol}
                  </span>
                  <span className="text-[10px] text-gray-400 block truncate">
                    {item.name}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="block text-xs font-semibold text-white">{item.price}</span>
                <span className={`text-[10px] font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                  {item.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}