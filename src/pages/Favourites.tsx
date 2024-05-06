import { useEffect, useState } from "react";
import {
  getLocalStorageValue,
  removeFromFavourites,
} from "../helpers/localStorage";
import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

function Favourites() {
  const navigate = useNavigate();
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
  };
  return (
    <div className="flex flex-col items-center justify-center mt-14 w-full">
      <p className="text-4xl">Favourites</p>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((item: any, i: number) => {
            return (
              <div
                key={i}
                className="w-full h-80 bg-blue-300 rounded-xl shadow-lg hover:shadow-2xl hover:cursor-pointer"
                onClick={() => {
                  navigate(`/details/${item.index}`);
                }}
              >
                <p>Name:{item.name}</p>
                <p>range: {item.range}</p>
                <p>casting time: {item.casting_time}</p>
                <p>level :{item.level}</p>
                <p>duration: {item.duration}</p>

                <button
                  className="bg-red-500 p-2 "
                  onClick={() => removeFavs(item.index)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favourites;
