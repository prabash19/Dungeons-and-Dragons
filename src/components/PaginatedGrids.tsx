// import React, { useState, useMemo } from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import Cards from "./Cards";

// interface PaginatedGridProps {
//   data: Array<{
//     name: string;
//     index: string;
//     level: number;
//     url: string;
//   }>;
//   itemsPerPage?: number;
// }
// const PaginatedGrid: React.FC<PaginatedGridProps> = ({
//   data,
//   itemsPerPage = 8,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const currentData = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return data.slice(startIndex, endIndex);
//   }, [currentPage, itemsPerPage, data]);
//   const totalItems = useMemo(() => data.length, [data]);
//   const totalPages = useMemo(
//     () => Math.ceil(totalItems / itemsPerPage),
//     [totalItems, itemsPerPage]
//   );

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };
//   return (
//     <div className="flex flex-col w-full">
//       <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {currentData.map((_, i) => (
//           <Cards
//             key={i}
//             name={_.name}
//             index={_.index}
//             level={_.level}
//             url={_.url}
//           />
//         ))}
//       </div>
//       <div className="flex w-full p-4 mt-4 justify-end">
//         {currentPage > 1 && (
//           <button
//             onClick={handlePrev}
//             className="px-4 py-2 bg-gray-200 rounded mr-2 text-lg font-semibold flex items-center"
//           >
//             <p className="pr-1">
//               <FaAngleLeft />
//             </p>
//             <p>Previous</p>
//           </button>
//         )}

//         {currentPage < totalPages && (
//           <button
//             onClick={handleNext}
//             className="px-4 py-2 bg-gray-200 rounded ml-2 text-lg font-semibold flex items-center"
//           >
//             <p>Next</p>
//             <p className="pl-1">
//               <FaAngleRight />
//             </p>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaginatedGrid;
import React, { useState, useEffect, useMemo } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Cards from "./Cards";
import axios from "axios"; // Assuming axios is being used for HTTP requests
import { baseUrl } from "../constants/baseUrl";

interface PaginatedGridProps {
  data: Array<{
    name: string;
    index: string;
    level: number;
    url: string;
  }>;
  itemsPerPage?: number;
}

const PaginatedGrid: React.FC<PaginatedGridProps> = ({
  data,
  itemsPerPage = 8,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [additionalData, setAdditionalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, data]);

  const totalItems = useMemo(() => data.length, [data]);
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );
  useEffect(() => {
    const fetchAdditionalData = async () => {
      setLoading(true);
      setError(null);
      const urls = currentData.map((item) => `${baseUrl}/${item.index}`);
      try {
        const responses = await Promise.all(urls.map((url) => axios.get(url)));
        const fetchedData = responses.map((res) => res.data);
        setAdditionalData(fetchedData);
      } catch (err) {
        setError("Failed to fetch additional data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalData();
  }, [currentPage]);

  const combinedData = useMemo(() => {
    return currentData.map((item) => {
      const additionalInfo = additionalData.find(
        (data) => data.index === item.index
      );
      return { ...item, ...additionalInfo };
    });
  }, [currentData, additionalData]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {error && <p className="text-red-500">Error: {error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg/grid-cols-3 xl/grid-cols-4">
            {combinedData.map((_, i) => (
              <Cards
                key={i}
                name={_.name}
                range={_.range}
                casting_time={_.casting_time}
                level={_.level}
                duration={_.duration}
                material={_.material}
              />
            ))}
          </div>
          <div className="flex w-full p-4 mt-4 justify-end">
            {currentPage > 1 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-200 rounded mr-2 text-lg font-semibold flex items-center"
              >
                <FaAngleLeft /> Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-200 rounded ml-2 text-lg font-semibold flex items-center"
              >
                Next <FaAngleRight />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedGrid;
