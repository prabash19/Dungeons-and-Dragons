import { useContext } from "react";
import DarkModeContext from "../context/ThemeContext";

const ToggleTheme = () => {
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext is not provided");
  }
  const { toggleDarkMode } = darkModeContext;
  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-blue-500 text-white dark:bg-gray-700 rounded"
    >
      Toggle Dark Mode
    </button>
  );
};

export default ToggleTheme;
