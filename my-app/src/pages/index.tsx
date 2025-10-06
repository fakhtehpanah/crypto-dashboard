import GlobalStats from "@/components/GlobalStats";
import MarketTable from "@/components/MarketTable";
import TrendingCoins from "@/components/TrendingCoins";
import { useEffect, useState } from "react";

export default  function Home() {
  const [cryptoList, setCryptoList] = useState([]);

  useEffect(() => {
    fetch("/api/crypto")
    .then(res => res.json())
    .then(data => setCryptoList(data));
  }, [])

  return (
      <div>
        <MarketTable/>
        <GlobalStats/>
        <TrendingCoins/>

      </div>  
  );
}
