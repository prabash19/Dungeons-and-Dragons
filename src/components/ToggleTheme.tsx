import { useContext } from "react";
import DarkModeContext from "../context/ThemeContext";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

const ToggleTheme = () => {
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext is not provided");
  }
  const { toggleDarkMode, isDarkMode } = darkModeContext;

  return (
    <div
      className={`z-30  mt-2 rounded-md 

      ${isDarkMode ? "bg-white" : "bg-black"}
 
      `}
    >
      {isDarkMode ? (
        <>
          <IoMdSunny
            onClick={toggleDarkMode}
            className=" text-yellow-400 text-6xl p-2 hover:cursor-pointer"
          ></IoMdSunny>
        </>
      ) : (
        <>
          <IoMdMoon
            onClick={toggleDarkMode}
            className=" text-white text-6xl p-2 hover:cursor-pointer"
          ></IoMdMoon>
        </>
      )}
    </div>
  );
};

export default ToggleTheme;
