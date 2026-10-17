"use client";

import React, { useState } from "react";
import { ShieldAlert, Target, SlidersHorizontal } from "lucide-react";

interface TradePanelProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  selectedAssetSymbol: string;
  onExecuteTrade: (trade: { id: string; symbol: string; type: string; amount: number; entryPrice: number; pnl: string; sl?: string; tp?: string }) => void;
}

export default function TradePanel({ balance, setBalance, selectedAssetSymbol, onExecuteTrade }: TradePanelProps) {
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT" | "STOP">("MARKET");
  const [amount, setAmount] = useState<string>("");
  const [limitPrice, setLimitPrice] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [takeProfit, setTakeProfit] = useState<string>("");

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    if (tradeType === "BUY") {
      if (val > balance) {
        alert("Insufficient balance!");
        return;
      }
      setBalance((prev) => prev - val);
    } else {
      setBalance((prev) => prev + val);
    }

    const typeLabel = orderType === "MARKET" 
      ? (tradeType === "BUY" ? "BUY / LONG" : "SELL / SHORT")
      : `${orderType} ${tradeType}`;

    const newPosition = {
      id: Math.random().toString(36).substring(2, 9),
      symbol: selectedAssetSymbol,
      type: typeLabel,
      amount: val,
      entryPrice: limitPrice ? parseFloat(limitPrice) : (selectedAssetSymbol.includes("NIFTY") ? 25120 : 61695),
      pnl: "+$0.00",
      sl: stopLoss ? `${stopLoss}%` : "None",
      tp: takeProfit ? `${takeProfit}%` : "None",
    };

    onExecuteTrade(newPosition);
    setAmount("");
    setLimitPrice("");
    setStopLoss("");
    setTakeProfit("");
  };

  return (
    <form onSubmit={handleTrade} className="flex flex-col space-y-3">
      {/* Side Selector (Buy / Sell) */}
      <div className="grid grid-cols-2 gap-2 bg-[#191f28] p-1 rounded-xl border border-gray-800">
        <button
          type="button"
          onClick={() => setTradeType("BUY")}
          className={`py-2 rounded-lg text-xs font-bold transition ${
            tradeType === "BUY" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
          }`}
        >
          Buy / Long
        </button>
        <button
          type="button"
          onClick={() => setTradeType("SELL")}
          className={`py-2 rounded-lg text-xs font-bold transition ${
            tradeType === "SELL" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
          }`}
        >
          Sell / Short
        </button>
      </div>

      {/* Order Type Selector (Market / Limit / Stop) */}
      <div className="grid grid-cols-3 gap-1 bg-[#191f28] p-1 rounded-xl border border-gray-800 text-[10px]">
        {(["MARKET", "LIMIT", "STOP"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setOrderType(type)}
            className={`py-1.5 rounded-lg font-bold transition ${
              orderType === type ? "bg-gray-700 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Conditional Limit / Stop Trigger Price */}
      {orderType !== "MARKET" && (
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            {orderType} Trigger Price
          </label>
          <input
            type="number"
            step="any"
            placeholder="Enter trigger price..."
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            className="w-full bg-[#191f28] border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition"
            required
          />
        </div>
      )}

      {/* Amount Input */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">Order Amount (USDT / INR)</label>
        <input
          type="number"
          step="any"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-[#191f28] border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
          required
        />
      </div>

      {/* SL / TP Risk Management Inputs */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-medium text-gray-400 mb-1 flex items-center space-x-1">
            <ShieldAlert className="h-3 w-3 text-red-400" />
            <span>Stop-Loss (%)</span>
          </label>
          <input
            type="number"
            step="any"
            placeholder="e.g. 2.0"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="w-full bg-[#191f28] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500 transition"
          />
        </div>
        <div>
          <label className="block text-[10px] font-medium text-gray-400 mb-1 flex items-center space-x-1">
            <Target className="h-3 w-3 text-emerald-400" />
            <span>Take-Profit (%)</span>
          </label>
          <input
            type="number"
            step="any"
            placeholder="e.g. 5.0"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            className="w-full bg-[#191f28] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-lg mt-1 ${
          tradeType === "BUY"
            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
            : "bg-red-600 hover:bg-red-500 text-white shadow-red-600/20"
        }`}
      >
        Place {orderType} {tradeType} ({selectedAssetSymbol})
      </button>
    </form>
  );
}