import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
import PaginatedGrid from "../components/PaginatedGrids";
import { optionValues, magicSchools } from "../constants/optionValues";

function Home() {
  const [spellsData, setSpellsData] = useState<any>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
  };
  const handleSchoolChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool(event.target.value);
  };
  const buildQueryParams = () => {
    const params: Record<string, string> = {};
    if (selectedLevel) {
      params.level = selectedLevel;
    }
    if (selectedSchool) {
      params.school = selectedSchool;
    }
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `?${queryString}` : "";
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = buildQueryParams();
        const response = await axios.get(`${baseUrl}${queryString}`);
        setSpellsData(response?.data?.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedLevel, selectedSchool]);

  return (
    <div className="flex flex-col items-center justify-center mt-6 w-full">
      <p className="lg:text-4xl md:text-2xl sm:text-sm font-bold ">
        Dungeons & Dragons
      </p>
      <div className="h-20 w-4/5 dark:bg-white bg-black rounded-2xl flex justify-center items-center mt-6">
        <div className="w-4/5  flex items-center justify-between px-16 ">
          <p className="text-white dark:text-black text-lg font-semibold">
            Level :
          </p>
          <select
            className="lg:w-2/3 md:1/2 sm:full dark:bg-black rounded-lg sm:text-sm h-10 outline-none focus:border-none "
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            <option value="">All levels</option>{" "}
            {optionValues.map((val) => (
              <option key={val} value={String(val)}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <div className="w-4/5  flex items-center justify-between px-16 ">
          <p className="text-white dark:text-black text-lg font-semibold">
            Magic School :
          </p>
          <select
            className="w-2/3 dark:bg-black rounded-lg sm:text-sm h-10  outline-none focus:border-none"
            value={selectedSchool}
            onChange={handleSchoolChange}
          >
            <option value="">All Schools</option>
            {magicSchools.map((val: any) => {
              return (
                <option key={val.index} value={String(val.index)}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="w-11/12 flex items-center justify-center mt-4 mb-4">
        <PaginatedGrid data={spellsData} />
      </div>
    </div>
  );
}

export default Home;
