/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#f5f5f5",
        darkBg: "#1a1a1a",
        lightText: "#000000",
        darkText: "#f5f5f5",
      },
      fontSize: {
        small: "14px",
        medium: "26px",
      },
    },
  },
  plugins: [],
};
