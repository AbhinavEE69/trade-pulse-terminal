"use client";

import React, { useState } from "react";
import { Bell, X, CheckCircle2 } from "lucide-react";

interface PriceAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetSymbol: string;
}

export default function PriceAlertsModal({ isOpen, onClose, assetSymbol }: PriceAlertsModalProps) {
  const [targetPrice, setTargetPrice] = useState("");
  const [alertSet, setAlertSet] = useState(false);

  if (!isOpen) return null;

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPrice) return;
    setAlertSet(true);
    setTimeout(() => {
      setAlertSet(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#12161c] border border-gray-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-400">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Set Price Alert</h3>
            <p className="text-xs text-gray-400">Get notified instantly when {assetSymbol} hits your target.</p>
          </div>
        </div>

        {alertSet ? (
          <div className="py-8 text-center flex flex-col items-center space-y-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 animate-bounce" />
            <span className="text-sm font-bold text-white">Alert successfully configured!</span>
            <span className="text-xs text-gray-500">We will trigger a notification at ${targetPrice}</span>
          </div>
        ) : (
          <form onSubmit={handleSetAlert} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Target Price (USDT / INR)</label>
              <input
                type="number"
                placeholder="e.g. 62500"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="w-full bg-[#191f28] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-emerald-600/20"
            >
              Save Alert Rule
            </button>
          </form>
        )}
      </div>
    </div>
  );
}