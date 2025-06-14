import { Routes, Route } from "react-router";

import "./CSS/main.css";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";

import Header from "./components/Header";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import SerieDetails from "./components/SerieDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedComponent from "./components/ProtectedComponent";

function App() {
  const isLoggedIn = false; //contextAPI to store it.

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SerieDetails />} />

        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<MovieDetails />} />

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
