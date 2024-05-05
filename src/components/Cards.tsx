import { saveAsFavourites } from "../helpers/localStorage";

function Cards({
  name,
  range,
  casting_time,
  level,
  duration,
  material,
  index,
}: any) {
  return (
    <div className="w-full h-80 bg-blue-300 rounded-xl shadow-lg hover:shadow-2xl hover:cursor-pointer">
      <p>Name:{name}</p>
      <p>range: {range}</p>
      <p>casting time: {casting_time}</p>
      <p>level :{level}</p>
      <p>duration: {duration}</p>
      <p>material: {material}</p>
      <button
        className="bg-green-500 p-2 "
        onClick={() => saveAsFavourites(index)}
      >
        add to fav
      </button>
    </div>
  );
}

export default Cards;
