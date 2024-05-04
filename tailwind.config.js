/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#ff0000",
        darkBg: "#1a1a1a",
        lightText: "#000000",
        darkText: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
//lightBg: "#f5f5f5",
