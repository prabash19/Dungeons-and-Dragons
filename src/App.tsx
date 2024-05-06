import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import Details from "./pages/Details";
const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
