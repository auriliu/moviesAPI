import { useEffect } from "react";
import useFetch from "../hooks/useFetch_wToken";
import { Link, useSearchParams } from "react-router";

const TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const genreID = searchParams.get("genre") || "";

  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = useFetch(`${TMDB_BASE_URL}/genre/movie/list`, TOKEN);

  const { data: filteredData } = useFetch(
    `${TMDB_BASE_URL}/discover/movie?with_genres=${genreID}&page=${page}`,
    TOKEN
  );

  useEffect(() => {
    if (filteredData && filteredData.results) {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 100);
    }
  }, [page, filteredData]);

  if (genresLoading) return <p>loading...</p>;
  if (genresError) return <p>error: {genresError}</p>;

  return (
    <div>
      <div className="movies-filters">
        <span>MOVIES: </span>

        {genresData.genres.length === 0 && <p>no genres found</p>}

        {genresData.genres.map((i) => (
          <button
            className={genreID === String(i.id) ? "active" : ""}
            key={i.id}
            onClick={() => setSearchParams({ genre: i.id, page: 1 })}
          >
            {i.name}
          </button>
        ))}
      </div>

      <div className="movies-container">
        {filteredData.results?.length === 0 && <p>no results</p>}
        {filteredData.results.map((movie) => (
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
              {/* <p>{movie.title || "no title available"}</p> */}
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
            setSearchParams({ genre: genreID, page: page - 1 });
            // window.scrollTo(0, 0);
          }}
          disabled={page === 1}
        >
          prev
        </button>
        <span>page: {page}</span>
        <button
          onClick={() => {
            setSearchParams({ genre: genreID, page: page + 1 });
            // window.scrollTo(0, 0);
          }}
          disabled={page >= filteredData.total_pages}
        >
          next
        </button>
      </div>
      {/* pagination */}
    </div>
  );
}

//
