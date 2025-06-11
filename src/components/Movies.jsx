import React, { useEffect, useState } from "react";
const API_KEY = "09d16205c5c756953a18abf4f53af424";

import useFetch from "../hooks/useFetch";
import { Link, useSearchParams } from "react-router";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [query, setQuery] = useState("popular"); // "popular, top_rated, upcoming"
  // when to lift state up to the url:
  // You want users to be able to share the page with current filters (?query=top_rated&page=3).
  // You want the Back/Forward buttons to reflect navigation (i.e., going back to "popular").
  // You want to persist state on refresh.

  const [genreID, setGenreID] = useState("");

  const {
    data: moviesData,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/${query}?api_key=${API_KEY}&page=${page}`
  );

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );

  const { data: filteredData } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreID}`
  );

  if (moviesLoading) return <p>loading...</p>;
  if (moviesError) return <p>error: {moviesError}</p>;

  if (genresLoading) return <p>loading...</p>;
  if (genresError) return <p>error: {genresError}</p>;

  const moviesToRender =
    genreID === "" ? moviesData.results : filteredData.results;

  return (
    <div>
      <div className="movies-filters">
        <span>MOVIES:</span>
        <br />
        <br />

        <button
          onClick={() => {
            setGenreID("");
            setPage(1);
            setQuery("popular");
          }}
        >
          popular
        </button>
        <button
          onClick={() => {
            setGenreID("");
            setPage(1);
            setQuery("top_rated");
          }}
        >
          top-rated
        </button>
        <button
          onClick={() => {
            setGenreID("");
            setPage(1);
            setQuery("upcoming");
          }}
        >
          upcoming
        </button>
        <br />
        <br />
        {genresData.genres.length == 0 && <p>no results</p>}

        {genresData.genres.map((i) => (
          <button
            key={i.id}
            onClick={() => {
              setPage(1);
              setGenreID(i.id);
            }}
          >
            {i.name}
          </button>
        ))}
      </div>

      <div className="movies-container">
        {moviesToRender.length == 0 && <p>no results</p>}
        {moviesToRender.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="movie-card">
              <img
                src={
                  movie.poster_path &&
                  `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                }
                alt={`${movie.title || "no title"} poster`}
              />
              <p>{movie.title || "no title available"}</p>
              <p>{movie.vote_average || "no rating"}</p>
              <p>{movie.release_date || "no release date"}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* pagination */}
      <div className="pagination-container">
        <button
          onClick={() => {
            setPage((prev) => prev - 1);
            window.scrollTo(0, 0);
          }}
          disabled={page == 1}
        >
          prev
        </button>
        <span>page: {page}</span>
        <button
          onClick={() => {
            setPage((prev) => prev + 1);
            window.scrollTo(0, 0);
          }}
          disabled={page == moviesData?.total_pages}
        >
          next
        </button>
      </div>
      {/* pagination */}
    </div>
  );
}
