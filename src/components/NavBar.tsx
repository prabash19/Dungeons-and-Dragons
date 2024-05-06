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
      className={`left-0 top-0 dark:bg-lightBg  bg-black min-h-screen shadow-md transition-all duration-300 ease-in-out ${
        openSidebar ? "w-64" : "w-28"
      }`}
    >
      {openSidebar ? (
        <>
          <div className="flex w-full px-6 pt-2 justify-between mt-4">
            <p className="text-medium font-semibold text-white dark:text-black">
              Menu
            </p>
            <FaAnglesLeft
              onClick={toggleSideBar}
              className="hover:cursor-pointer text-medium mt-2 dark:text-black text-white hover:text-darkBlue"
            />
          </div>

          <hr className="mx-4 mt-6 border-t-slate-400"></hr>

          <ul className="px-2">
            {menu.map((_, i) => {
              return (
                <li
                  key={i}
                  className="flex w-full pl-3 mt-5 text-medium font-semibold items-center rounded-md dark:text-black text-white hover:bg-darkBlue hover:cursor-pointer"
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
        <div className="w-full flex justify-center items-center mt-4 text-white">
          <FaBars
            onClick={toggleSideBar}
            className="hover:cursor-pointer text-medium hover:text-darkBlue"
          />
        </div>
      )}
    </div>
  );
}

export default NavBar;
