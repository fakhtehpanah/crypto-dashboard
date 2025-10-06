import { useEffect, useState } from "react";

export default function GlobalStats() {
  const [global, setGlobal] = useState(null);

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

  if (!global) return <p className="text-gray-400">در حال بارگذاری...</p>;

  return (
    <div className="">
      <h2 className="">🌍 Global Market Overview</h2>
      <p>
        Total Market Cap:{" "}
        <span className="font-bold text-green-400">
          ${(global.total_market_cap.usd / 1_000_000_000_000).toFixed(2)} T
        </span>
      </p>
      <p>
        24h Volume:{" "}
        <span className="font-bold text-blue-400">
          ${(global.total_volume.usd / 1_000_000_000_000).toFixed(2)} T
        </span>
      </p>
      <p>
        BTC Dominance:{" "}
        <span className="font-bold text-yellow-400">
          {global.market_cap_percentage.btc.toFixed(2)}%
        </span>
      </p>
    </div>
  );
}