import React, { useEffect, useState } from 'react'

interface MarketData {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    market_cap: number
}

function MarketTable() {
    const [markets, setMarkets] = useState<MarketData[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<string>("");

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const res = await fetch("/api/crypto");
                const data = await res.json();
                setMarkets(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMarkets();
    }, []);

    return (
        <div className="max-w-md  p-6 bg-purple-100 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Choose a Coin</h2>

            <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="w-full px-5 py-2.5 rounded-xl border border-purple-300 bg-white text-purple-900 font-medium shadow-sm hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
            >
                <option className='' value="">-- Select a coin --</option>
                {markets.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.name} ({m.symbol.toUpperCase()}) - ${m.current_price}
                    </option>
                ))}
            </select>

            {selectedCoin && (
                <p className="mt-4 text-center text-purple-700 font-medium">
                 <span className="text-purple-900">{selectedCoin.toUpperCase()}</span>
                </p>
            )} 
        </div>
    )
}

export default MarketTable