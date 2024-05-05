interface DataItem {
  name: string;
  level: number;
  url: string;
  index: string;
}
function Cards({ name, level, url, index }: DataItem) {
  return (
    <div className="w-full h-80 bg-blue-300 rounded-xl shadow-lg hover:shadow-2xl hover:cursor-pointer">
      <p>{name}</p>
      <p>{level}</p>
      <p>{url}</p>
      <p>{index}</p>
    </div>
  );
}

export default Cards;
