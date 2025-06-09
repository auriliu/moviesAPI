import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";

import "./CSS/main.css";
import Home from "./components/Home";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import Series from "./components/Series";
import SerieDetails from "./components/SerieDetails";
import Search from "./components/Search";

import SearchTest from "./components/SearchTest";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SerieDetails />} />

        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/search" element={<SearchTest />} />
      </Routes>
    </>
  );
}
// u need routes, so u can define which component to render at which route.

export default App;

// params
// pages + routes / ids
// how to read params.
// https://reactrouter.com/start/declarative/installation

// git repo for this project.
// share it with.
