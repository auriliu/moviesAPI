import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import useFetch from "../hooks/useFetch";

const API_KEY = "09d16205c5c756953a18abf4f53af424";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [input, setInput] = useState(query);
  const pageFromParams = Number(searchParams.get("page") || 1);
  const [page, setPage] = useState(pageFromParams);

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${page}`
  );
  // input — to control what the user types in real-time
  // query — to represent the submitted search query synced with the URL and the actual search results

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ q: input });
    setPage(1);
    setInput("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button>search</button>
      </form>

      {loading && <p>loading...</p>}
      {!loading && !error && data.results.length > 0 && (
        <div className="search-container">
          {data.results.map((movie) => {
            return (
              <Link to={`/search/${movie.id}`} key={movie.id}>
                <div className="movie-container">
                  <div className="movie-poster">
                    <h3>{movie.title || "no title available"}</h3>

                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={`${movie.title || "no title"} poster`}
                      />
                    )}
                    {!movie.poster_path && <p>movie poster not available</p>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

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
          disabled={page == data?.total_pages}
        >
          next
        </button>
      </div>
      {/* pagination */}
    </>
  );
}
