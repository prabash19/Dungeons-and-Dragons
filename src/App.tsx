import "./App.css";
import ToggleTheme from "./helpers/ToggleTheme";
function App() {
  return (
    <>
      <h1 className="text-3xl underline dark:bg-black">Test</h1>
      <ToggleTheme />
    </>
  );
}

export default App;
