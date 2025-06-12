import useFetch from "../hooks/useFetch_wToken";
import { Link, useSearchParams } from "react-router";

const token = import.meta.env.VITE_TMDB_API_TOKEN;

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "popular";
  const page = Number(searchParams.get("page")) || 1;
  const genreID = searchParams.get("genre") || "";

  const {
    data: moviesData,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/${query}?page=${page}`,
    token
  );

  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = useFetch(`https://api.themoviedb.org/3/genre/movie/list`, token);

  const { data: filteredData } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreID}&page=${page}`,
    token
  );

  if (moviesLoading || genresLoading) return <p>loading...</p>;
  if (moviesError) return <p>error: {moviesError}</p>;
  if (genresError) return <p>error: {genresError}</p>;

  const moviesToRender =
    genreID === "" ? moviesData.results : filteredData.results;

  const handleSetParams = (newParams) => {
    setSearchParams({
      query,
      page,
      genre: genreID,
      ...newParams,
    });
  };

  return (
    <div>
      <div className="movies-filters">
        <span>MOVIES:</span>
        <br />
        <br />
        <div className="buttons">
          <button
            className={query === "popular" && genreID === "" ? "active" : ""}
            onClick={() =>
              handleSetParams({ query: "popular", genre: "", page: 1 })
            }
          >
            popular
          </button>
          <button
            className={query === "top_rated" && genreID === "" ? "active" : ""}
            onClick={() =>
              handleSetParams({ query: "top_rated", genre: "", page: 1 })
            }
          >
            top-rated
          </button>
          <button
            className={query === "upcoming" && genreID === "" ? "active" : ""}
            onClick={() =>
              handleSetParams({ query: "upcoming", genre: "", page: 1 })
            }
          >
            upcoming
          </button>
        </div>
        <br />
        <br />
        {genresData.genres.length === 0 && <p>no genres found</p>}

        {genresData.genres.map((i) => (
          <button
            className={genreID === String(i.id) ? "active" : ""}
            key={i.id}
            onClick={() => handleSetParams({ genre: i.id, query: "", page: 1 })}
          >
            {i.name}
          </button>
        ))}
      </div>

      <div className="movies-container">
        {moviesToRender.length === 0 && <p>no results</p>}
        {moviesToRender.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="movie-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : ""
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
          onClick={() => handleSetParams({ page: page - 1, query })}
          disabled={page === 1}
        >
          prev
        </button>
        <span>page: {page}</span>
        <button
          onClick={() => handleSetParams({ page: page + 1, query })}
          disabled={
            genreID
              ? page === filteredData?.total_pages
              : page === moviesData?.total_pages
          }
        >
          next
        </button>
      </div>
      {/* pagination */}
    </div>
  );
}

//
