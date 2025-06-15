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
        {genresData.genres.length === 0 && <p>no genres found</p>}

        {genresData.genres.map((i, index) => (
          <button
            className={
              genreID
                ? genreID === String(i.id)
                  ? "active"
                  : ""
                : index === 0
                ? "active"
                : ""
            }
            key={i.id}
            onClick={() => setSearchParams({ genre: i.id, page: 1 })}
          >
            {i.name}
          </button>
        ))}
      </div>

      {/* <div className="movies-container"> */}
      <div className="home__movies--container">
        {filteredData.results?.length === 0 && <p>no results</p>}
        {filteredData.results.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="home__movie--card">
              {movie.poster_path ? (
                <img
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
                  <span>rating: </span>
                  <i class="fa-solid fa-star"></i>
                  <span>{movie.vote_average?.toFixed(1) || "No rating"}</span>
                </div>
                <p className="overview">{movie.overview || "no description"}</p>
                <div className="home__movie--icons">
                  {/* <Heart liked={liked} setLiked={setLiked} /> */}

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
              setSearchParams({ genre: genreID, page: page - 1 });
              // window.scrollTo(0, 0);
            }}
          >
            previous
          </button>
        )}

        <span style={page >= 2 ? { marginLeft: "1rem" } : {}}>
          page: {page}
        </span>
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
