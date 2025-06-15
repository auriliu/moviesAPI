import { Routes, Route } from "react-router";

import "./CSS/main.css";

import Highlights from "./pages/Highlights";
import Genres from "./pages/Genres";

import Header from "./components/Header";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import WatchedMovies from "./pages/WatchedMovies";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedComponent from "./components/ProtectedComponent";
import { useState } from "react";

function App() {
  const isLoggedIn = false; //contextAPI to store it.

  const [watchedMovies, setWatchedMovies] = useState([
    {
      title: "title-1",
      id: 1,
    },
    {
      title: "title-2",
      id: 2,
    },
  ]);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/watched"
          element={<WatchedMovies watchedMovies={watchedMovies} />}
        />
        <Route path="/watched/:id" element={<MovieDetails />} />

        <Route path="/highlights" element={<Highlights />} />
        <Route path="/highlights/:id" element={<MovieDetails />} />

        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:id" element={<MovieDetails />} />

        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<MovieDetails />} />

        {/* protected routes */}
        <Route
          path="/search"
          element={
            <ProtectedRoute isAuth={isLoggedIn}>
              <ProtectedComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
// u need routes, so u can define which component to render at which route.

export default App;

// https://reactrouter.com/start/declarative/installation
