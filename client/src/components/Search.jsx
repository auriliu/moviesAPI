import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import useFetch from "../hooks/useFetch_wToken";

import Pagination from "./Pagination";

const token = import.meta.env.VITE_TMDB_API_TOKEN;

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [input, setInput] = useState(query);
  const page = Number(searchParams.get("page") || 1);
  // input — to control what the user types in real-time
  // query — to represent the submitted search query synced with the URL and the actual search results

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`,
    token
  );

  const hasResults = !!searchParams.get("query");

  function handleSubmit(e) {
    e.preventDefault();
    // setHasResults(true);

    if (input.length < 3) {
      alert("input must be at least 3 characters long");
      return;
    }

    setSearchParams({ query: input, page: "1" });
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
        <div className="home__movies--container">
          {data.results.map((movie) => {
            return (
              <Link to={`/search/${movie.id}`} key={movie.id}>
                <div className="home__movie--card">
                  {!movie.poster_path && <img className="no_poster" />}

                  {movie.poster_path && (
                    <img
                      className="home__movie--poster"
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={`${movie.title || "no title"} poster`}
                    />
                  )}

                  {/* overlay */}
                  <div className="home__movie--overlay">
                    <p>{movie.title || "No title available"}</p>
                    <div className="home__movies--rating">
                      <span>rating: </span>
                      <i class="fa-solid fa-star"></i>
                      <span>
                        {movie.vote_average?.toFixed(1) || "No rating"}
                      </span>
                    </div>
                    <p className="overview">
                      {movie.overview || "no description"}
                    </p>
                    <div className="home__movie--icons">
                      <i class="fa-solid fa-bookmark" title="bookmark"></i>
                      <i class="fa-solid fa-share" title="share"></i>
                    </div>
                  </div>
                  {/* overlay */}

                  {!movie.poster_path && <p>movie poster not available</p>}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {hasResults && (
        <Pagination
          page={page}
          query={query}
          setSearchParams={setSearchParams}
        />
      )}
    </>
  );
}
