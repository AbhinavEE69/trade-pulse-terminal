"use client";

import React, { useEffect, useState } from "react";

interface Order {
  price: number;
  amount: number;
}

export default function OrderBook() {
  const [asks, setAsks] = useState<Order[]>([
    { price: 61750, amount: 0.45 },
    { price: 61730, amount: 1.20 },
    { price: 61710, amount: 0.85 },
  ]);

  const [bids, setBids] = useState<Order[]>([
    { price: 61680, amount: 0.90 },
    { price: 61660, amount: 2.10 },
    { price: 61640, amount: 0.35 },
  ]);

  // Simulate real-time price fluctuations every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBids((prev) =>
        prev.map((order) => ({
          ...order,
          price: +(order.price + (Math.random() > 0.5 ? 1 : -1)).toFixed(2),
        }))
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xs space-y-2">
      <div className="grid grid-cols-3 text-gray-500 font-medium pb-1 border-b border-gray-800">
        <span>Price (USDT)</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sell Orders - Red) */}
      <div className="space-y-1">
        {asks.map((ask, i) => (
          <div key={i} className="grid grid-cols-3 text-red-400">
            <span>{ask.price}</span>
            <span className="text-right text-gray-300">{ask.amount}</span>
            <span className="text-right text-gray-500">{(ask.price * ask.amount).toFixed(0)}</span>
          </div>
        ))}
      </div>

      {/* Spread Price */}
      <div className="py-2 text-center text-sm font-bold text-emerald-400 bg-[#1e2329]/50 rounded border border-gray-800">
        61,695.00 USDT
      </div>

      {/* Bids (Buy Orders - Green) */}
      <div className="space-y-1">
        {bids.map((bid, i) => (
          <div key={i} className="grid grid-cols-3 text-emerald-400">
            <span>{bid.price}</span>
            <span className="text-right text-gray-300">{bid.amount}</span>
            <span className="text-right text-gray-500">{(bid.price * bid.amount).toFixed(0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}