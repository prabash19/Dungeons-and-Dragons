import React, { useState, useMemo } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Cards from "./Cards";

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
      <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentData.map((_, i) => (
          <Cards
            key={i}
            name={_.name}
            index={_.index}
            level={_.level}
            url={_.url}
          />
        ))}
      </div>
      <div className="flex w-full p-4 mt-4 justify-end">
        {currentPage > 1 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-200 rounded mr-2 text-lg font-semibold flex items-center"
          >
            <p className="pr-1">
              <FaAngleLeft />
            </p>
            <p>Previous</p>
          </button>
        )}

        {currentPage < totalPages && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-gray-200 rounded ml-2 text-lg font-semibold flex items-center"
          >
            <p>Next</p>
            <p className="pl-1">
              <FaAngleRight />
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default PaginatedGrid;
