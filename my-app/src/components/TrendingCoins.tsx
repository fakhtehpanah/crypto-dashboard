import { useEffect, useState } from "react";

export default function TrendingCoins() {
  const [trending, setTrending] = useState([]);

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
    <div className="bg-gray-900 rounded-2xl p-6 mb-8 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">🔥 Trending Coins</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {trending.map((coin) => (
          <div
            key={coin.item.id}
            className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-700 transition"
          >
            <img
              src={coin.item.small}
              alt={coin.item.name}
              className="w-10 h-10 mx-auto mb-2"
            />
            <h3 className="font-semibold">{coin.item.name}</h3>
            <p className="text-sm text-gray-400 uppercase">
              {coin.item.symbol}
            </p>
            <p className="text-xs text-gray-500">
              Rank #{coin.item.market_cap_rank}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}