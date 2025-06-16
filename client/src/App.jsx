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

function App() {
  const isLoggedIn = false; //contextAPI to store it.

  return (
    <>
      <Header />

      <Routes>
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/highlights/:id" element={<MovieDetails />} />

        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:id" element={<MovieDetails />} />

        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<MovieDetails />} />

        <Route path="/seen" element={<SeenMovies />} />
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
