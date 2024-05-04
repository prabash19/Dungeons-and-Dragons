import React from "react";
import { useContext } from "react";
import DarkModeContext from "./context/ThemeContext";
import ToggleTheme from "./components/ToggleTheme";
import NavBar from "./components/NavBar";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext is not available");
  }
  const { isDarkMode } = darkModeContext;

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? "bg-darkBg text-darkText" : "bg-lightBg text-lightText"
      }`}
    >
      <NavBar />
      <div className="pl-4">
        <ToggleTheme />
        {children}
      </div>
    </div>
  );
};

export default Layout;
