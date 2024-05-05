import PaginatedGrid from "../components/PaginatedGrids";
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
      <div className="w-11/12 flex items-center justify-center mt-4 mb-4">
        <PaginatedGrid data={data} />
      </div>
    </div>
  );
}

export default Home;
