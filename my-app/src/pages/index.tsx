import CoinSelector from "@/components/CoinSelector";
import MarketTable from "@/components/MarketTable";
import TrendingCoins from "@/components/TrendingCoins";

export default  function Home() {


  return (
      <div className="bg-gray-800 p-5">
        {/* <MarketTable /> */}
        <CoinSelector/>
        {/* <TrendingCoins/> */}
      </div>  
  );
}
