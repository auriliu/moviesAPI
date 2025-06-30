import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./UserContext.jsx";

import "./CSS/main.css";

import Highlights from "./pages/Highlights";
import Genres from "./pages/Genres";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import MoviesToWatch from "./pages/MoviesToWatch";

import Favorites from "./components/Favorites.jsx";

import AuthPage from "./finals/AuthPage.jsx";

function App() {
  const { user } = useUser();
  // user is not helping...
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem(`favorites_${user}`);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, [user, setFavorites]);

  // const [favorites, setFavorites] = useState(() => {
  //   const stored = localStorage.getItem(`favorites_${user}`);
  //   return stored ? JSON.parse(stored) : [];
  // });

  const addMovie = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeMovie = (id) => {
    setFavorites((prev) => prev.filter((m) => m.id !== id));
  };

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
  }, [favorites, user]);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />

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
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
