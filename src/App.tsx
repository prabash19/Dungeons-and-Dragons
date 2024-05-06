import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import Details from "./pages/Details";
function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
