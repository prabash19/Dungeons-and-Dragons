import { useEffect, useState } from "react";
import {
  getLocalStorageValue,
  removeFromFavourites,
  saveAsFavourites,
} from "../helpers/localStorage";
import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { MdBookmarkRemove } from "react-icons/md";
function Favourites() {
  const navigate = useNavigate();
  const [favs, setFavs] = useState(getLocalStorageValue());
  const favouritesId = getLocalStorageValue();
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          favouritesId.map((id) => {
            return axios.get(`${baseUrl}/${id}`);
          })
        );
        const data = responses.map((response) => response.data);
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const removeFavs = (id: string) => {
    removeFromFavourites(id);
    const updatedResults = results.filter((item: any) => item.index !== id);
    setResults(updatedResults);
    setFavs(getLocalStorageValue());
  };
  const saveFavourites = (id: string) => {
    saveAsFavourites(id);
    setFavs(getLocalStorageValue());
  };
  return (
    <div className="flex flex-col items-center justify-center mt-6 w-full">
      <p className="lg:text-4xl md:text-2xl sm:text-sm font-bold ">
        Favourites
      </p>
      {favs.length == 0 ? (
        <>
          <p className="lg:text-4xl md:text-2xl sm:text-sm font-semibold mt-14 ">
            No Spell Saved As Favourites !!! <br></br>
          </p>
          <p className="lg:text-4xl md:text-2xl sm:text-sm font-semibold mt-4 ">
            Please Save Spells From Home....
          </p>
        </>
      ) : (
        <>
          {loading ? (
            <>
              <LoadingScreen />
            </>
          ) : (
            <div className=" grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((data: any, i: number) => (
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
                            navigate(`/details/${data.index}`);
                          }}
                        >
                          <p className="pr-2 text-3xl">
                            <GrFormView />
                          </p>
                          <p>View</p>
                        </button>

                        {favs.includes(data.index) ? (
                          <button
                            className="flex items-center justify-center w-1/2 ml-1 py-2 bg-red-400 text-white font-semibold rounded-xl  shadow-lg"
                            onClick={() => {
                              removeFavs(data.index);
                            }}
                          >
                            <p className="pr-2 ">
                              <MdBookmarkRemove className="text-xl" />
                            </p>
                            <p>Unsave</p>
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
          )}
        </>
      )}
    </div>
  );
}

export default Favourites;
