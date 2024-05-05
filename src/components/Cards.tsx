import { useState } from "react";
import { saveAsFavourites } from "../helpers/localStorage";

function Cards({
  name,
  range,
  casting_time,
  level,
  duration,
  material,
  index,
  results,
  setResults,
  combinedData,
}: any) {
  const [data, setData] = useState(combinedData);

  const removeFromFavourites = (id: string) => {
    console.log("id is", id);
    const updatedResults = data.filter((item: any) => item.index !== id);
    setData(updatedResults);
    removeFromFavourites(id);
  };
  console.log("Data is", data);
  return (
    <div className="w-full h-80 bg-blue-300 rounded-xl shadow-lg hover:shadow-2xl hover:cursor-pointer">
      {name}
      <button
        className="bg-green-500 p-2 "
        onClick={() => saveAsFavourites(index)}
      >
        add to fav
      </button>
      <button
        className="bg-red-500 p-2 "
        onClick={() => removeFromFavourites(index)}
      >
        remove
      </button>
    </div>
  );
}

export default Cards;
