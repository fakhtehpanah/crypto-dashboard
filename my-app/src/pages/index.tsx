import GlobalStats from "@/components/GlobalStats";
import MarketTable from "@/components/MarketTable";
import TrendingCoins from "@/components/TrendingCoins";
import { useState } from "react";

export default  function Home() {


  return (
      <div className="flex flex-col gap-5 p-5 lg:flex-row">
        <MarketTable />
        <TrendingCoins/>

      </div>  
  );
}
