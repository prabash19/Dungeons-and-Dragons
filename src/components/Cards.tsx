function Cards({ name, spell }: any) {
  return (
    <div className="w-full h-80 bg-blue-300 rounded-xl shadow-lg hover:shadow-2xl hover:cursor-pointer">
      <p>{name}</p>
      <p>{spell}</p>
    </div>
  );
}

export default Cards;
