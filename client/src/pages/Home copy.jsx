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

  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;

  return (
    <div>
      <div className="movies-filters">
        <span>MOVIES: </span>
        <div className="home-buttons">
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
      </div>

      <div className="movies-container">
        {data.results?.length === 0 && <p>no results</p>}
        {data.results?.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="movie-card">
              {movie.poster_path ? (
                <img
                  alt={`${movie.title || "no title"} poster`}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                />
              ) : (
                <div className="no_poster">no image available</div>
              )}
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
            setSearchParams({ query, page: page - 1 });
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          disabled={page === 1}
        >
          prev
        </button>
        <span>page: {page}</span>
        <button
          onClick={() => {
            setSearchParams({ query, page: page + 1 });
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
