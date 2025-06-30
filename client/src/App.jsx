import { Routes, Route } from "react-router";

import "./CSS/main.css";

import Highlights from "./pages/Highlights";
import Genres from "./pages/Genres";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import MoviesToWatch from "./pages/MoviesToWatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedComponent from "./components/ProtectedComponent";
import { useEffect, useState } from "react";
import AuthPage from "./finals/AuthPage.jsx";

function App() {
  const isLoggedIn = false; //contextAPI to store it.

  const [watchedMovies, setWatchedMovies] = useState([]);

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
        <Route path="/login" element={<AuthPage />} />

        <Route
          path="/"
          element={<Highlights addMovie={addMovie} removeMovie={removeMovie} />}
        />
        <Route
          path="/highlights"
          element={<Highlights addMovie={addMovie} removeMovie={removeMovie} />}
        />
        <Route path="/highlights/:id" element={<MovieDetails />} />

        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:id" element={<MovieDetails />} />

        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<MovieDetails />} />

        <Route path="/seen/:id" element={<MovieDetails />} />

        <Route path="/queue" element={<MoviesToWatch />} />
        <Route path="/queue/:id" element={<MovieDetails />} />

        <Route
          path="/search"
          element={
            <ProtectedRoute isAuth={isLoggedIn}>
              <ProtectedComponent />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}
// u need routes, so u can define which component to render at which route.

export default App;

// https://reactrouter.com/start/declarative/installation
