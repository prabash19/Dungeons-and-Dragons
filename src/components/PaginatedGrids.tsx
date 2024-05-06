import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/baseUrl";
import {
  getLocalStorageValue,
  removeFromFavourites,
  saveAsFavourites,
} from "../helpers/localStorage";
import LoadingScreen from "./LoadingScreen";
import { FaAngleRight, FaAngleLeft, FaHeart } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { MdBookmarkRemove } from "react-icons/md";
interface Spell {
  index: string;
  name: string;
  level: number;
  url: string;
}

type SpellsData = Spell[];

const PaginatedGrids: React.FC<{ data: SpellsData }> = ({ data }) => {
  const navigate = useNavigate();
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
  console.log("combined data is", combinedData);
  return (
    <div className="flex flex-col w-full">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {combinedData.map((data: any, i: number) => (
              <>
                <div
                  className="w-full h-full flex  items-center justify-center mt-6 "
                  key={i}
                >
                  <div
                    className="w-full h-full pt-4 px-3 bg-white shadow-lg rounded-xl border border-gray-200
                hover:shadow-2xl hover:cursor-pointer dark:text-black
                "
                  >
                    <h2 className="w-full text-center text-2xl font-bold mb-2 pt-2">
                      {data.name}
                    </h2>
                    <p className=" mb-2 font-semibold">Level: {data.level}</p>
                    <p className=" mb-2 font-semibold">
                      School: {data.school.name}
                    </p>
                    <p className=" mb-2 font-semibold">Range: {data.range}</p>
                    <p className=" mb-2 font-semibold">
                      Casting Time: {data.casting_time}
                    </p>
                    <p className=" mb-2 font-semibold">
                      Duration: {data.duration}
                    </p>
                    <div className=" flex justify-between w-full mt-4">
                      <button
                        className=" flex items-center justify-center w-1/2 mr-1 py-2 bg-darkBlue text-white font-semibold rounded-xl
                      shadow-lg
                      "
                        onClick={() => {
                          navigate(`details/${data.index}`);
                        }}
                      >
                        <p className="pr-2 text-3xl">
                          <GrFormView />
                        </p>
                        <p>View</p>
                      </button>

                      {favs.includes(data.index) ? (
                        <button
                          className="flex items-center justify-center w-1/2 ml-1 py-2 bg-green-400 text-white font-semibold rounded-xl  shadow-lg"
                          onClick={() => {
                            removeFavourites(data.index);
                          }}
                        >
                          <p className="pr-2 ">
                            <MdBookmarkRemove className="text-xl" />
                          </p>
                          <p>Save</p>
                        </button>
                      ) : (
                        <button
                          className="flex items-center justify-center w-1/2 ml-1 py-2 bg-green-400 text-white font-semibold rounded-xl  shadow-lg"
                          onClick={() => {
                            saveFavourites(data.index);
                          }}
                        >
                          <p className="pr-2">
                            <FaHeart />
                          </p>
                          <p>Save</p>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="flex w-full p-4 mt-6 justify-end">
            {currentPage > 1 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-200 rounded ml-2 text-lg font-semibold flex items-center shadow-lg
                dark:bg-gray-200 dark:text-black
                "
              >
                <p>
                  <FaAngleLeft />
                </p>
                <p className="pl-2">Previous</p>
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-200 rounded ml-2 text-lg font-semibold flex items-center shadow-lg
                dark:bg-gray-200 dark:text-black
                "
              >
                <p>Next</p>
                <p className="pl-2">
                  <FaAngleRight />
                </p>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedGrids;
