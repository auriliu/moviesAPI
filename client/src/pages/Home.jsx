import { useState } from "react";
import useFetch from "../hooks/useFetch_wToken";
import { Link, useSearchParams } from "react-router";

const TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "popular";
  const page = Number(searchParams.get("page")) || 1;

  const { data, loading, error } = useFetch(
    `${TMDB_BASE_URL}/movie/${query}?page=${page}`,
    TOKEN
  );

  const [watched, setWatched] = useState(false);

  console.log(data.results);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;

  return (
    <div className="home__movies">
      <div className="home__movies--filters">
        <button
          className={query === "popular" ? "active" : ""}
          onClick={() => setSearchParams({ query: "popular", page: 1 })}
        >
          popular
        </button>
        <button
          className={query === "top_rated" ? "active" : ""}
          onClick={() => setSearchParams({ query: "top_rated", page: 1 })}
        >
          top-rated
        </button>
        <button
          className={query === "upcoming" ? "active" : ""}
          onClick={() => setSearchParams({ query: "upcoming", page: 1 })}
        >
          upcoming
        </button>
      </div>

      <div className="home__movies--container">
        {data.results?.length === 0 && <p>no results</p>}
        {data.results?.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="home__movie--card">
              {movie.poster_path ? (
                <img
                  className="home__movie--poster"
                  alt={`${movie.title || "no title"} poster`}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                />
              ) : (
                <div className="no_poster">no image available</div>
              )}
              {/* overlay */}
              <div className="home__movie--overlay">
                <p>{movie.title || "No title available"}</p>
                <div className="home__movies--rating">
                  <i class="fa-solid fa-star"></i>
                  <span>{movie.vote_average?.toFixed(1) || "No rating"}</span>
                  <span>
                    {movie.release_date.split("-")[0] || "No release date"}
                  </span>
                </div>
                <p className="overview">{movie.overview || "no description"}</p>
                <div className="home__movie--icons">
                  <i
                    class={
                      watched ? "fa-solid fa-heart" : "fa-regular fa-heart"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setWatched(!watched);
                    }}
                  ></i>
                  <i class="fa-solid fa-bookmark" title="bookmark"></i>
                  <i class="fa-solid fa-share" title="share"></i>
                </div>
              </div>
              {/* overlay */}
            </div>
          </Link>
        ))}
      </div>

      {/* pagination */}
      <div className="pagination-container">
        {page >= 2 && (
          <button
            onClick={() => {
              setSearchParams({ query, page: page - 1 });
              // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            disabled={page === 1}
          >
            previous
          </button>
        )}

        <span>page: {page}</span>
        <button
          onClick={() => {
            setSearchParams({ query, page: page + 1 });
            // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          disabled={page >= data.total_pages}
        >
          next
        </button>
      </div>
      {/* pagination */}
    </div>
  );
}
