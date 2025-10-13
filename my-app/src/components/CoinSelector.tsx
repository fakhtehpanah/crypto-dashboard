import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type CoinTypes = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
};

export default function CoinSelector() {
  const [coins, setCoins] = useState<CoinTypes[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [selectedData, setSelectedData] = useState<CoinTypes | undefined>(undefined);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("/api/crypto"); 
        const data: CoinTypes[] = await res.json();
        setCoins(data.slice(0, 50));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    const coin = coins.find((c) => c.id === selectedCoin);
    setSelectedData(coin);
  }, [selectedCoin, coins]);

  // ساخت یک آرایه نمونه برای چارت (قیمت‌های فرضی)
  const chartPrices = selectedData
    ? Array.from({ length: 10 }, (_, i) => selectedData.current_price + i)
    : [];

  return (
    <div className="p-4 max-w-md space-y-4">
      <select
        className="w-full border border-gray-600 text-gray-300 bg-transparent rounded-lg px-2 py-4"
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
      >
        <option value="">Select a coin...</option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.symbol.toUpperCase()}
          </option>
        ))}
      </select>

      {selectedData && (
        <div className="p-3 border rounded-lg bg-gray-700 text-gray-300 border-gray-600 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={selectedData.image} alt={selectedData.name} className="w-6 h-6" />
              <span className="font-medium">{selectedData.name}</span>
            </div>
            <span className="text-blue-400 font-semibold">
              ${selectedData.current_price.toLocaleString()}
            </span>
            <span className={selectedData.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}>
              {selectedData.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>

          <Line
            data={{
              labels: chartPrices.map((_, idx) => idx + 1),
              datasets: [
                {
                  label: selectedData.symbol.toUpperCase(),
                  data: chartPrices,
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { position: "top" } } }}
          />
        </div>
      )}
    </div>
  );
}