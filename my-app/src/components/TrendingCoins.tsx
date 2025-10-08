import { useEffect, useState } from "react";

interface TrendingData {
  item: {
    id: string;
    name: string;
    symbol: string;
    small: string;
    market_cap_rank: number;
  };
}

export default function TrendingCoins() {
  const [trending, setTrending] = useState<TrendingData[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/trending");
        const data = await res.json();
        setTrending(data.coins);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="bg-gray-900 rounded-3xl p-6 mb-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        🔥 Trending Coins
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {trending.map((coin) => (
          <div
            key={coin.item.id}
            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-4 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img
              src={coin.item.small}
              alt={coin.item.name}
              className="w-12 h-12 mx-auto mb-3 rounded-full border border-gray-600"
            />
            <h3 className="font-semibold text-white">{coin.item.name}</h3>
            <p className="text-sm text-gray-300 uppercase">{coin.item.symbol}</p>
            <p className="text-xs text-gray-400 mt-1">
              Rank #{coin.item.market_cap_rank}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}