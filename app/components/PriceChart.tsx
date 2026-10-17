"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { BarChart2, TrendingUp } from "lucide-react";

// Generate client-side safe dataset
const getDatasetForTimeframe = (tf: string) => {
  let count = 60;
  let basePrice = 61200;

  if (tf === "1Y") count = 52;
  if (tf === "5Y") count = 60;

  return Array.from({ length: count }, (_, i) => {
    const step = (Math.random() - 0.48) * 180;
    basePrice += step;
    
    const open = basePrice;
    const close = open + (Math.random() - 0.5) * 140;
    const high = Math.max(open, close) + Math.random() * 90;
    const low = Math.min(open, close) - Math.random() * 90;

    let timeLabel = `T${i + 1}`;
    if (tf === "15m" || tf === "1H" || tf === "4H" || tf === "1D") {
      const totalMins = i * 2;
      const hours = 9 + Math.floor((30 + totalMins) / 60);
      const mins = (30 + totalMins) % 60;
      timeLabel = `${hours}:${mins < 10 ? "0" : ""}${mins}`;
    } else if (tf === "1Y") {
      timeLabel = `W${i + 1}`;
    } else if (tf === "5Y") {
      timeLabel = `M${i + 1}`;
    }

    return {
      time: timeLabel,
      price: +basePrice.toFixed(2),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
    };
  });
};

export default function PriceChart() {
  const [chartType, setChartType] = useState<"area" | "candles">("area");
  const [timeframe, setTimeframe] = useState("1H");
  const [marketData, setMarketData] = useState<any[]>([]);

  // Prevent hydration mismatch by generating data only on the client
  useEffect(() => {
    setMarketData(getDatasetForTimeframe(timeframe));
  }, [timeframe]);

  if (marketData.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">Loading market feed...</div>;
  }

  const allHighs = marketData.map((d) => d.high);
  const allLows = marketData.map((d) => d.low);
  const maxVal = Math.max(...allHighs) + 150;
  const minVal = Math.min(...allLows) - 150;
  const range = maxVal - minVal || 1;
  const chartHeight = 280;

  const getY = (val: number) => chartHeight - ((val - minVal) / range) * chartHeight;

  const CustomizedCandle = (props: any) => {
    const { x, width, payload } = props;
    if (!payload) return null;

    const { open, close, high, low } = payload;
    const isGreen = close >= open;
    const color = isGreen ? "#10b981" : "#ef4444";

    const highY = getY(high);
    const lowY = getY(low);
    const openY = getY(open);
    const closeY = getY(close);

    const topBodyY = Math.min(openY, closeY);
    const bodyHeight = Math.max(Math.abs(openY - closeY), 2);
    const centerX = x + width / 2;

    return (
      <g>
        <line x1={centerX} y1={highY} x2={centerX} y2={lowY} stroke={color} strokeWidth={1} />
        <rect
          x={x}
          y={topBodyY}
          width={Math.max(width, 2)}
          height={bodyHeight}
          fill={color}
          rx={0.5}
        />
      </g>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Chart Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 bg-[#1e2329] p-1 rounded-lg border border-gray-800">
          <button
            onClick={() => setChartType("area")}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition ${
              chartType === "area" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Area</span>
          </button>
          <button
            onClick={() => setChartType("candles")}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition ${
              chartType === "candles" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span>Candles</span>
          </button>
        </div>

        {/* Timeframe Selectors */}
        <div className="flex space-x-1 bg-[#1e2329] p-1 rounded-lg border border-gray-800 text-xs">
          {["15m", "1H", "4H", "1D", "1Y", "5Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded transition ${
                timeframe === tf ? "bg-gray-700 text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Render Chart */}
      <div className="flex-1 w-full min-h-[340px]">
        {chartType === "area" ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#6b7280" fontSize={10} interval={9} />
              <YAxis domain={[minVal, maxVal]} stroke="#6b7280" fontSize={11} orientation="right" tickFormatter={(v) => v.toLocaleString()} />
              <Tooltip contentStyle={{ backgroundColor: "#1e2329", borderColor: "#374151", borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="time" stroke="#6b7280" fontSize={10} interval={9} />
              <YAxis domain={[minVal, maxVal]} stroke="#6b7280" fontSize={11} orientation="right" tickFormatter={(v) => v.toLocaleString()} />
              <Tooltip contentStyle={{ backgroundColor: "#1e2329", borderColor: "#374151", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="high" shape={<CustomizedCandle />} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}