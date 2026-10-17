"use client";

import React from "react";
import { History, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";

interface Tx {
  id: string;
  time: string;
  symbol: string;
  type: string;
  amount: string;
  price: string;
  status: string;
}

interface LedgerProps {
  history: Tx[];
}

export default function TradeHistoryLedger({ history }: LedgerProps) {
  const exportToCSV = () => {
    const headers = ["Timestamp", "Asset", "Side", "Order Value", "Execution Price", "Status"];
    const rows = history.map((tx) => [tx.time, tx.symbol, tx.type, tx.amount, tx.price, tx.status]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tradepulse_settlement_ledger.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-5 w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <History className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-gray-200">Execution & Settlement Ledger</h2>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500">Total Transactions: {history.length}</span>
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-1.5 bg-[#191f28] hover:bg-[#1e2329] text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-semibold transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
            <tr>
              <th className="pb-2">Timestamp</th>
              <th className="pb-2">Asset</th>
              <th className="pb-2">Side</th>
              <th className="pb-2">Order Value</th>
              <th className="pb-2">Execution Price</th>
              <th className="pb-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {history.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#181d24] transition">
                <td className="py-3 text-gray-400">{tx.time}</td>
                <td className="py-3 font-bold text-white">{tx.symbol}</td>
                <td className="py-3 flex items-center space-x-1">
                  {tx.type === "BUY" ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-red-400" />
                  )}
                  <span className={tx.type === "BUY" ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>{tx.type}</span>
                </td>
                <td className="py-3">{tx.amount}</td>
                <td className="py-3 font-medium">{tx.price}</td>
                <td className="py-3 text-right">
                  <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 px-2 py-0.5 rounded text-[10px]">
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}