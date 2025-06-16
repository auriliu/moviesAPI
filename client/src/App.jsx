import { Routes, Route } from "react-router";

import "./CSS/main.css";

import Highlights from "./pages/Highlights";
import Genres from "./pages/Genres";

import Header from "./components/Header";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import SeenMovies from "./pages/SeenMovies";
import MoviesToWatch from "./pages/MoviesToWatch";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedComponent from "./components/ProtectedComponent";
import { useEffect, useState } from "react";

function App() {
  const isLoggedIn = false; //contextAPI to store it.

  const [watchedMovies, setWatchedMovies] = useState([]);
  console.log(watchedMovies);

  const addMovie = (movie) => {
    setWatchedMovies((prev) => [...prev, movie]);
  };

  const removeMovie = (movieId) => {
    setWatchedMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/highlights"
          element={<Highlights addMovie={addMovie} removeMovie={removeMovie} />}
        />
        <Route path="/highlights/:id" element={<MovieDetails />} />

        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:id" element={<MovieDetails />} />

        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<MovieDetails />} />

        <Route
          path="/seen"
          element={<SeenMovies watchedMovies={watchedMovies} />}
        />
        <Route path="/seen/:id" element={<MovieDetails />} />

        <Route path="/queue" element={<MoviesToWatch />} />
        <Route path="/queue/:id" element={<MovieDetails />} />

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
