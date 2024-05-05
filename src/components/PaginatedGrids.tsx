import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
import {
  getLocalStorageValue,
  removeFromFavourites,
  saveAsFavourites,
} from "../helpers/localStorage";
import LoadingScreen from "./LoadingScreen";

function PaginatedGrids({ data }: any) {
  const itemsPerPage = 8;
  const [favs, setFavs] = useState(getLocalStorageValue());
  const [currentPage, setCurrentPage] = useState(1);
  const [combinedData, setCombinedData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length]
  );

  const pageData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return data.slice(startIdx, endIdx);
  }, [currentPage, data]);

  useEffect(() => {
    const fetchDataForCurrentPage = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          pageData.map((item: any) => axios.get(`${baseUrl}/${item.index}`))
        );
        const combinedDataForPage = responses.map((response) => response.data);
        setCombinedData(combinedDataForPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchDataForCurrentPage();
  }, [pageData]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const saveFavourites = (id: string) => {
    saveAsFavourites(id);
    setFavs(getLocalStorageValue());
  };

  const removeFavourites = (id: string) => {
    removeFromFavourites(id);
    setFavs(getLocalStorageValue());
  };

  return (
    <div className="flex flex-col w-full">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {combinedData.map((item: any, i: number) => (
              <div
                key={i}
                className="w-full h-80 bg-blue-300 rounded-xl shadow-lg hover:shadow-2xl hover:cursor-pointer"
              >
                <p>Name: {item.name}</p>
                <p>Range: {item.range}</p>
                <p>Casting Time: {item.casting_time}</p>
                <p>Level: {item.level}</p>
                <p>Duration: {item.duration}</p>
                {favs.includes(item.index) ? (
                  <button
                    className="bg-red-500 p-2"
                    onClick={() => removeFavourites(item.index)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="bg-green-500 p-2"
                    onClick={() => saveFavourites(item.index)}
                  >
                    Add to Fav
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex w-full p-4 mt-4 justify-end">
            {currentPage > 1 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-200 rounded mr-2 text-lg font-semibold flex items-center"
              >
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-200 rounded ml-2 text-lg font-semibold flex items-center"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PaginatedGrids;
