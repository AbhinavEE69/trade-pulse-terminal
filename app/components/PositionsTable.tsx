"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface Position {
  id: string;
  symbol: string;
  type: "BUY / LONG" | "SELL / SHORT";
  amount: number;
  entryPrice: number;
  pnl: string;
  sl?: string;
  tp?: string;
}

interface PositionsTableProps {
  positions: Position[];
  onClosePosition: (id: string) => void;
}

export default function PositionsTable({ positions, onClosePosition }: PositionsTableProps) {
  return (
    <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-5 w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-gray-200">Open Positions & Portfolio Activity</h2>
        </div>
        <span className="text-xs text-gray-500">Total Active: {positions.length}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
            <tr>
              <th className="pb-2">Asset</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Margin</th>
              <th className="pb-2">Entry Price</th>
              <th className="pb-2">Stop-Loss</th>
              <th className="pb-2">Take-Profit</th>
              <th className="pb-2">Unrealized P&L</th>
              <th className="pb-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {positions.map((pos) => (
              <tr key={pos.id} className="hover:bg-[#181d24] transition">
                <td className="py-3 font-bold text-white">{pos.symbol}</td>
                <td className="py-3">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                      pos.type.includes("BUY")
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-900/40"
                        : "bg-red-950 text-red-400 border border-red-900/40"
                    }`}
                  >
                    {pos.type}
                  </span>
                </td>
                <td className="py-3">${pos.amount.toLocaleString()}</td>
                <td className="py-3 font-medium">₹{pos.entryPrice.toLocaleString()}</td>
                <td className="py-3 text-red-400 font-medium">{pos.sl || "None"}</td>
                <td className="py-3 text-emerald-400 font-medium">{pos.tp || "None"}</td>
                <td className="py-3 font-bold text-emerald-400">{pos.pnl}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => onClosePosition(pos.id)}
                    className="bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 px-3 py-1 rounded-lg text-xs font-semibold transition"
                  >
                    Close
                  </button>
                </td>
              </tr>
            ))}
            {positions.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  No active positions open.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}