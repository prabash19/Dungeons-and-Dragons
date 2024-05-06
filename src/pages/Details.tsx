import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import { baseUrl } from "../constants/baseUrl";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  useEffect(() => {
    const getDataOfSpell = async () => {
      setLoading(true);
      try {
        await axios.get(`${baseUrl}/${id}`).then((res) => {
          console.log("res data os", res.data);
          setData(res.data);
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    getDataOfSpell();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <div className="w-full">
          <button
            className="px-4 py-2 bg-gray-200 rounded ml-2 text-lg font-semibold flex items-center shadow-md
                dark:bg-gray-200 dark:text-black mt-2 hover:shadow-lg
                "
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack className="text-xl font-semibold" />
            <p className="ml-2 text-xl font-semibold">Back</p>
          </button>
          <div className="w-full h-full flex items-center justify-center mt-14 dark:text-black">
            <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <h2 className="w-full text-center text-2xl font-bold mb-2">
                {data.name}
              </h2>
              <p className=" mb-2 font-semibold">Level: {data.level}</p>
              <p className=" mb-2 font-semibold">School: {data.school.name}</p>
              <p className=" mb-2 font-semibold">Range: {data.range}</p>
              <p className=" mb-2 font-semibold">
                Casting Time: {data.casting_time}
              </p>
              <p className=" mb-2 font-semibold">Duration: {data.duration}</p>
              <div className="mb-4">
                <h3 className="font-semibold ">Description:</h3>
                <ul className="list-disc list-inside">
                  {data.desc.map((d: any, index: number) => (
                    <li key={index}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold ">Components:</h3>
                <p>{data.components.join(", ")}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold ">Classes:</h3>
                <ul className="list-disc list-inside">
                  {data.classes.map((c: any, index: number) => (
                    <li key={index}>{c.name}</li>
                  ))}
                </ul>
              </div>

              {data.subclasses.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold ">Subclasses:</h3>
                  <ul className="list-disc list-inside">
                    {data.subclasses.map((s: any, index: number) => (
                      <li key={index}>{s.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
