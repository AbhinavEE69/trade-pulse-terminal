"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, User, Key, X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [username, setUsername] = useState("");
  const [apiKey, setApiKey] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    onLoginSuccess(username);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#12161c] border border-gray-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Broker Session Login</h3>
            <p className="text-xs text-gray-400">Connect to NSE, BSE, & NASDAQ Gateway</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center space-x-1.5">
              <User className="h-3.5 w-3.5 text-emerald-400" />
              <span>Trader / Client ID</span>
            </label>
            <input
              type="text"
              placeholder="e.g. TRADER_NIT_01"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#191f28] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center space-x-1.5">
              <Key className="h-3.5 w-3.5 text-emerald-400" />
              <span>API Secret / Token</span>
            </label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#191f28] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-emerald-600/20"
          >
            Authenticate Terminal Session
          </button>
        </form>
      </div>
    </div>
  );
}