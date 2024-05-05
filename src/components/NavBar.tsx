import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAnglesLeft, FaBars, FaHouse, FaHeart } from "react-icons/fa6";

function NavBar() {
  const navigate = useNavigate();
  const [openSidebar, isSidebarOpen] = useState<boolean>(true);
  const toggleSideBar = () => {
    isSidebarOpen(!openSidebar);
  };
  const handleRouteChange = (link: string) => {
    navigate(link);
  };
  const menu = [
    { name: "Home", link: "/", icon: <FaHouse /> },
    { name: "Favourites", link: "/favourites", icon: <FaHeart /> },
  ];
  return (
    <div
      className={`left-0 top-0  bg-slate-500 min-h-screen shadow-md transition-all duration-300 ease-in-out ${
        openSidebar ? "w-64" : "w-28"
      }`}
    >
      {openSidebar ? (
        <>
          <div className="flex w-full px-6 pt-2 justify-between">
            <p className="text-medium font-semibold">Menu</p>
            <FaAnglesLeft
              onClick={toggleSideBar}
              className="hover:cursor-pointer text-medium mt-2"
            />
          </div>

          <hr className="mx-4 mt-6 border-t-slate-400"></hr>

          <ul className="px-2">
            {menu.map((_, i) => {
              return (
                <li
                  key={i}
                  className="flex w-full pl-3 mt-5 text-medium  items-center rounded-md hover:bg-red-300 hover:cursor-pointer"
                  onClick={() => handleRouteChange(_.link)}
                >
                  {_.icon}

                  <p className="pl-4">{_.name}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="w-full flex justify-center items-center mt-4">
          <FaBars
            onClick={toggleSideBar}
            className="hover:cursor-pointer text-medium"
          />
        </div>
      )}
    </div>
  );
}

export default NavBar;
