"use client";

import React, { useState, useEffect } from "react";
import OrderBook from "./components/OrderBook";
import TradePanel from "./components/TradePanel";
import PriceChart from "./components/PriceChart";
import PositionsTable from "./components/PositionsTable";
import MarketStats from "./components/MarketStats";
import MarketTickerTape from "./components/MarketTickerTape";
import TechnicalIndicators from "./components/TechnicalIndicators";
import WatchlistGrid from "./components/WatchlistGrid";
import PriceAlertsModal from "./components/PriceAlertsModal";
import TradeHistoryLedger from "./components/TradeHistoryLedger";
import PortfolioAllocation from "./components/PortfolioAllocation";
import PortfolioEquityChart from "./components/PortfolioEquityChart";
import TraderAnalytics from "./components/TraderAnalytics";
import MarketNewsSidebar from "./components/MarketNewsSidebar";
import AuthModal from "./components/AuthModal";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { Search, ChevronDown, Bell, Globe, TrendingUp, DollarSign, Cpu, Zap, UserCheck } from "lucide-react";

const ASSETS = [
  { symbol: "NIFTY 50", name: "Nifty 50 Index (NSE)", price: 25120.50, change: "+0.85%", category: "NSE Index", icon: TrendingUp, color: "text-amber-400 bg-amber-950/30" },
  { symbol: "SENSEX", name: "BSE Sensex Index (BSE)", price: 82450.00, change: "+0.92%", category: "BSE Index", icon: TrendingUp, color: "text-amber-400 bg-amber-950/30" },
  { symbol: "BANKNIFTY", name: "Nifty Bank Index (NSE)", price: 51800.20, change: "+1.15%", category: "NSE Index", icon: TrendingUp, color: "text-amber-400 bg-amber-950/30" },
  { symbol: "RELIANCE.NS", name: "Reliance Industries (NSE)", price: 1450.00, change: "+1.20%", category: "Energy / Retail", icon: Zap, color: "text-blue-400 bg-blue-950/30" },
  { symbol: "TCS.NS", name: "Tata Consultancy Services (NSE)", price: 4120.50, change: "+0.85%", category: "Information Tech", icon: Cpu, color: "text-indigo-400 bg-indigo-950/30" },
  { symbol: "INFY.NS", name: "Infosys Ltd (NSE)", price: 1890.00, change: "-0.45%", category: "Information Tech", icon: Cpu, color: "text-indigo-400 bg-indigo-950/30" },
  { symbol: "S&P 500", name: "S&P 500 Index (US)", price: 5815.00, change: "+0.45%", category: "Global Index", icon: Globe, color: "text-emerald-400 bg-emerald-950/30" },
  { symbol: "BTC/USDT", name: "Bitcoin (Crypto)", price: 61695.00, change: "+4.25%", category: "Cryptocurrency", icon: DollarSign, color: "text-yellow-400 bg-yellow-950/30" },
  { symbol: "ETH/USDT", name: "Ethereum (Crypto)", price: 2640.50, change: "+2.10%", category: "Cryptocurrency", icon: DollarSign, color: "text-purple-400 bg-purple-950/30" },
  { symbol: "AAPL", name: "Apple Inc. (NASDAQ)", price: 225.30, change: "+1.65%", category: "Consumer Tech", icon: Cpu, color: "text-gray-200 bg-gray-800" },
  { symbol: "TSLA", name: "Tesla Inc. (NASDAQ)", price: 242.80, change: "-2.30%", category: "Automotive / EV", icon: Zap, color: "text-red-400 bg-red-950/30" },
  { symbol: "NVDA", name: "NVIDIA Corp. (NASDAQ)", price: 128.50, change: "+3.40%", category: "Semiconductors", icon: Cpu, color: "text-emerald-400 bg-emerald-950/30" },
];

export default function Home() {
  const [balance, setBalance] = useState(10000.0);
  const [assets, setAssets] = useState(ASSETS);
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState(ASSETS[0].symbol);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>("TRADER_PRO_01");
  const [theme, setTheme] = useState<"dark" | "midnight" | "light">("dark");

  const [positions, setPositions] = useState([
    { id: "1", symbol: "NIFTY 50", type: "BUY / LONG" as const, amount: 1000, entryPrice: 25120.50, pnl: "+₹340.50", sl: "2.0%", tp: "5.0%" },
  ]);
  const [history, setHistory] = useState([
    { id: "h1", time: "10:42 AM", symbol: "NIFTY 50", type: "BUY", amount: "₹25,000", price: "₹25,120", status: "Executed" },
  ]);

  const selectedAsset = assets.find((a) => a.symbol === selectedAssetSymbol) || assets[0];

  // Background Live Price & P&L Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          const delta = (Math.random() - 0.48) * (asset.price * 0.001);
          const newPrice = parseFloat((asset.price + delta).toFixed(2));
          return { ...asset, price: newPrice };
        })
      );

      setPositions((prevPositions) =>
        prevPositions.map((pos) => {
          const currentAsset = assets.find((a) => a.symbol === pos.symbol);
          if (!currentAsset) return pos;

          const priceDiff = currentAsset.price - pos.entryPrice;
          const multiplier = pos.type.includes("BUY") ? 1 : -1;
          const rawPnl = (priceDiff * (pos.amount / pos.entryPrice)) * multiplier;
          const formattedPnl = `${rawPnl >= 0 ? "+" : ""}$${rawPnl.toFixed(2)}`;

          return { ...pos, pnl: formattedPnl };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [assets]);

  const filteredAssets = assets.filter(
    (a) =>
      a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExecuteTrade = (newPos: any) => {
    setPositions((prev) => [newPos, ...prev]);
    const newTx = {
      id: Math.random().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      symbol: newPos.symbol,
      type: newPos.type.includes("BUY") ? "BUY" : "SELL",
      amount: `$${newPos.amount}`,
      price: `${selectedAsset.price}`,
      status: "Executed",
    };
    setHistory((prev) => [newTx, ...prev]);
  };

  const handleClosePosition = (id: string) => {
    setPositions(positions.filter((p) => p.id !== id));
  };

  const SelectedIcon = selectedAsset.icon;

  return (
    <main className={`min-h-screen font-sans relative ${theme === "light" ? "bg-gray-100 text-gray-900" : theme === "midnight" ? "bg-[#050b14] text-white" : "bg-[#0b0e11] text-white"}`}>
      {/* Top Scrolling Ticker Marquee */}
      <MarketTickerTape />

      <div className="p-6 pt-0">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-4 mb-6 gap-4">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-2xl font-bold tracking-wider text-emerald-400 flex items-center space-x-2">
                <span>TradePulse</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">PRO TERMINAL</span>
              </h1>
              <p className="text-xs text-gray-400">Institutional Multi-Exchange Engine</p>
            </div>

            {/* Asset Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 bg-[#12161c] hover:bg-[#1a2028] px-4 py-2 rounded-xl border border-gray-800 transition shadow-lg text-white"
              >
                <div className={`p-1.5 rounded-lg flex items-center justify-center ${selectedAsset.color}`}>
                  <SelectedIcon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Active Ticker</span>
                  <span className="text-sm font-bold text-white">{selectedAsset.symbol}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-[#12161c] border border-gray-800 rounded-xl shadow-2xl z-50 p-2">
                  <div className="p-2 border-b border-gray-800 flex items-center space-x-2 bg-[#191f28] rounded-lg mb-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search Nifty, Sensex, Stocks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-xs text-white focus:outline-none w-full"
                    />
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {filteredAssets.map((asset) => {
                      const IconComponent = asset.icon;
                      return (
                        <button
                          key={asset.symbol}
                          onClick={() => {
                            setSelectedAssetSymbol(asset.symbol);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex justify-between items-center transition ${
                            selectedAsset.symbol === asset.symbol
                              ? "bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30"
                              : "text-gray-300 hover:bg-[#1e2329]"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg flex items-center justify-center ${asset.color}`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block font-bold">{asset.symbol}</span>
                              <span className="text-[10px] text-gray-500">{asset.name}</span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-400">
                            {asset.price.toLocaleString()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Quote, Balance, Theme Switcher & User Auth */}
          <div className="flex items-center space-x-4">
            <div className="bg-[#12161c] px-4 py-2 rounded-xl border border-gray-800 flex items-center space-x-3 text-white">
              <span className="text-xs text-gray-400">Live Quote:</span>
              <span className="font-bold text-sm">{selectedAsset.price.toLocaleString()}</span>
              <span className="text-xs font-semibold text-emerald-400">{selectedAsset.change}</span>
            </div>

            <div className="bg-[#12161c] px-4 py-2 rounded-xl border border-gray-800 flex items-center space-x-3 text-white">
              <span className="text-sm text-gray-400">Balance:</span>
              <span className="font-bold text-emerald-400 text-base">${balance.toLocaleString()} USDT</span>
            </div>

            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="bg-[#12161c] hover:bg-[#1a2028] p-2.5 rounded-xl border border-gray-800 transition text-gray-300 hover:text-emerald-400 shadow-lg"
              title="Set Price Alert"
            >
              <Bell className="h-4 w-4" />
            </button>

            <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-emerald-950/40 hover:bg-emerald-900/40 px-3 py-2 rounded-xl border border-emerald-900/50 flex items-center space-x-2 text-xs font-semibold text-emerald-400 transition"
            >
              <UserCheck className="h-4 w-4" />
              <span>{currentUser || "Login"}</span>
            </button>
          </div>
        </header>

        {/* Market Statistics Bar */}
        <MarketStats />

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-[#12161c] border border-gray-800 rounded-2xl p-5 h-[530px] flex flex-col text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
              <h2 className="text-sm font-semibold text-gray-300">Market Chart ({selectedAsset.name})</h2>
              <TechnicalIndicators />
            </div>
            <div className="flex-1 w-full min-h-[360px]">
              <PriceChart />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-4 text-white">
              <h2 className="text-sm font-semibold text-gray-300 mb-3">Order Book & Depth</h2>
              <OrderBook />
            </div>
            <div className="bg-[#12161c] border border-gray-800 rounded-2xl p-4 text-white">
              <h2 className="text-sm font-semibold text-gray-300 mb-3">Trade Execution ({selectedAsset.symbol})</h2>
              <TradePanel
                balance={balance}
                setBalance={setBalance}
                selectedAssetSymbol={selectedAsset.symbol}
                onExecuteTrade={handleExecuteTrade}
              />
            </div>
          </div>
        </div>

        {/* Positions Table */}
        <PositionsTable positions={positions} onClosePosition={handleClosePosition} />

        {/* Trade History Ledger */}
        <TradeHistoryLedger history={history} />

        {/* Portfolio Capital Allocation */}
        <PortfolioAllocation />

        {/* Cumulative Portfolio Equity Curve */}
        <PortfolioEquityChart />

        {/* Trader Analytics & Performance KPIs */}
        <TraderAnalytics />

        {/* Watchlist Grid */}
        <WatchlistGrid />

        {/* Live Macro News Feed */}
        <div className="mt-6">
          <MarketNewsSidebar />
        </div>
      </div>

      <PriceAlertsModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        assetSymbol={selectedAsset.symbol}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(name) => setCurrentUser(name)}
      />
    </main>
  );
}