import "./App.css";
// import ToggleTheme from "./helpers/ToggleTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import NotFound from "./components/NotFound";
import Layout from "./Layout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            {/* <Route path="/details/:id" element={<Details />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;

/* <div className="min-h-screen bg-lightBg dark:bg-darkBg">
        <h1 className="text-3xl underline">Test</h1>
        <ToggleTheme />
      </div> */
