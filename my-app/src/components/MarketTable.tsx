import { useEffect, useState } from "react";

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
}

interface GlobalData {
  total_market_cap: { usd: number; [key: string]: number };
  total_volume: { usd: number; [key: string]: number };
  market_cap_percentage: { btc: number; eth: number; [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export default function MarketTable() {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [global, setGlobal] = useState<GlobalData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch("/api/crypto");
        const data = await res.json();
        setMarkets(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarkets();
  }, []);

  useEffect(() => {
    if (!selectedCoin) return;

    const fetchGlobal = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/global?coin=${selectedCoin}`);
        const data = await res.json();
        setGlobal(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGlobal();
  }, [selectedCoin]);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl max-w-3xl text-white space-y-8">
      <h2 className="text-3xl font-bold text-center">💰 Market Overview</h2>

      <div className="flex justify-center">
        <select
          className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          onChange={(e) => setSelectedCoin(e.target.value)}
          value={selectedCoin}
        >
          <option value="">Select a Coin</option>
          {markets.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </div>

      {selectedCoin && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-xl text-white space-y-5 p-6">
          {loading || !global ? (
            <p className="text-center animate-pulse text-gray-300">Loading...</p>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-center">
                🌍 {selectedCoin.toUpperCase()} Market Stats
              </h3>

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
                Last updated:{" "}
                {new Date(global.updated_at * 1000).toLocaleString()}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}