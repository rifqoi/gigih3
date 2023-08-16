import { Outlet, Route, Routes } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import Navbar from "./components/VideoPage/Navbar";

import "./App.css";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <div className="min-h-screen bg-zinc-900 pl-10">
              <Navbar />
              <Outlet />
            </div>
          }
        >
          <Route path="/videos/:id" element={<VideoPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
