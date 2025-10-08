import { useEffect, useState } from "react";

export type GlobalData = {
  total_market_cap: {
    usd: number;
    [key: string]: number;
  };
  total_volume: {
    usd: number;
    [key: string]: number;
  };
  market_cap_percentage: {
    btc: number;
    eth: number;
    [key: string]: number;
  };
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
};

export type GlobalResponse = {
  data: GlobalData;
};

export default function GlobalStats() {
  const [global, setGlobal] = useState<GlobalData>();

  useEffect(() => {
    const fetchGlobal = async () => {
      try {
        const res = await fetch("/api/global");
        const data = await res.json();
        setGlobal(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGlobal();
  }, []);

  if (!global)
    return (
      <p className="text-gray-400 text-center py-10 animate-pulse">
        Loading ...
      </p>
    );

  return (
    <div className="max-w-md  p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-xl text-white space-y-5">
      <h2 className="text-2xl font-bold text-center">🌍 Global Market Overview</h2>

      <div className="bg-white/10 rounded-2xl p-4 flex justify-between items-center">
        <span>Total Market Cap</span>
        <span className="font-bold text-green-400 text-lg">
          ${(global.total_market_cap.usd / 1_000_000_000_000).toFixed(2)} T
        </span>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 flex justify-between items-center">
        <span>24h Volume</span>
        <span className="font-bold text-blue-400 text-lg">
          ${(global.total_volume.usd / 1_000_000_000_000).toFixed(2)} T
        </span>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 flex justify-between items-center">
        <span>BTC Dominance</span>
        <span className="font-bold text-yellow-400 text-lg">
          {global.market_cap_percentage.btc.toFixed(2)}%
        </span>
      </div>

      <p className="text-sm text-white/70 text-center">
        Last updated: {new Date(global.updated_at * 1000).toLocaleString()}
      </p>
    </div>
  );
}