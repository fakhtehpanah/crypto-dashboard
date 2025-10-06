import React, { useEffect, useState } from 'react'

function MarketTable() {
    const [markets, setMarkets] = useState([]);

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const res = await fetch ("/api/crypto");
                const data = await res.json();
                setMarkets(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMarkets();
    }, []);

  return (
    <div>
        {markets.map((m) => (
            <div key={m.id}>
                <h2>{m.name}</h2>
            </div>
        ))}
    </div>
  )
}

export default MarketTable