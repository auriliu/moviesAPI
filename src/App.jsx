import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";

import "./CSS/main.css";
import Home from "./components/Home";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import Series from "./components/Series";
import SerieDetails from "./components/SerieDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedComponent from "./components/ProtectedComponent";
import Login from "./components/Login";

function App() {
  const isLoggedIn = false; //contextAPI to store it.

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SerieDetails />} />

        {/* {isLoggedIn && <Route path="/search" element={<ProtectedComponent />} />}
        {!isLoggedIn && <Route path="/search" element={<Login />} />} */}

        <Route
          path="/search"
          element={
            <ProtectedRoute isAuth={isLoggedIn}>
              <ProtectedComponent />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
// u need routes, so u can define which component to render at which route.

export default App;

// https://reactrouter.com/start/declarative/installation
