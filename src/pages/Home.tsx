import Cards from "../components/Cards";
function Home() {
  const data = [
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
    { name: "a", spell: "123" },
  ];
  return (
    <div className="flex flex-col items-center justify-center mt-14 w-full">
      <p className="text-4xl">Dungeons & Dragons</p>
      <div className="h-20 w-4/5 bg-green-100 rounded-2xl">search bars </div>
      <div className="w-4/5 flex items-center justify-center mt-6 mb-4">
        <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item, index) => (
            <Cards key={index} name={item.name} spell={item.spell} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
