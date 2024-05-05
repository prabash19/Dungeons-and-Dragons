import { useEffect, useState } from "react";
import PaginatedGrid from "../components/PaginatedGrids";
import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
function Home() {
  const [loading, setLoading] = useState(true);
  const [spellsData, setSpellsData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await axios.get(baseUrl).then((res) => {
          setSpellsData(res?.data?.results);
        });
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-14 w-full">
      <p className="text-4xl">Dungeons & Dragons</p>
      <div className="h-20 w-4/5 bg-green-100 rounded-2xl">search bars </div>
      {loading ? (
        <p>loading</p>
      ) : (
        <div className="w-11/12 flex items-center justify-center mt-4 mb-4">
          <PaginatedGrid data={spellsData} />
        </div>
      )}
    </div>
  );
}

export default Home;
