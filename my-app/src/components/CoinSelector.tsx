import React, { useEffect, useState } from 'react';


interface CoinTypes {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    price_change_percentage_24h: number
}

function CoinSelector() {
  const [coins, setCoins] = useState<CoinTypes[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [selectedData, setSelectedData] = useState<CoinTypes>();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch('/api/crypto');
        const data = await res.json();
        setCoins(data.slice(0, 50));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    if (!selectedCoin) return;
    const coin = coins.find((c) => c.id === selectedCoin);
    setSelectedData(coin);
  }, [selectedCoin, coins]);

  return (
    <div className="p-4">
      <select
        className="p-2 border rounded-lg text-black"
        onChange={(e) => setSelectedCoin(e.target.value)}
        value={selectedCoin}
      >
        <option value="">Select a coin...</option>
        {coins.map((coin) => (
          <option value={coin.id} key={coin.id}>
            {coin.symbol.toUpperCase()}
          </option>
        ))}
      </select>


      {selectedData && (
        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-700">
            {selectedData.name}
          </h2>
          <p className="text-gray-700">
            💰 Price: ${selectedData.current_price.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default CoinSelector;