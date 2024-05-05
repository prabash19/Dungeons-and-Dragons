import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import Cards from "./Cards";
interface DataItem {
  name: string;
  spell: string;
}
interface PaginatedGridProps {
  data: DataItem[];
  itemsPerPage?: number;
}

const PaginatedGrid: React.FC<PaginatedGridProps> = ({
  data,
  itemsPerPage = 8,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleNext = () => {
    if (currentPage * itemsPerPage < data.length) {
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
      <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {currentData.map((item, index) => (
          <Cards key={index} name={item.name} spell={item.spell} />
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
