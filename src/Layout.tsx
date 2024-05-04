import React from "react";
import { useContext } from "react";
import DarkModeContext from "./context/ThemeContext";
import ToggleTheme from "./components/ToggleTheme";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext is not available");
  }
  const { isDarkMode } = darkModeContext;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-darkBg text-darkText" : "bg-lightBg text-lightText"
      }`}
    >
      <ToggleTheme />
      {children}
    </div>
  );
};

export default Layout;
