import { useEffect } from "react";
import useFetch from "../hooks/useFetch_wToken";
import { Link, useSearchParams } from "react-router";

import Pagination from "../components/Pagination";
import Movie from "../components/Movie";

const TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export default function Genres() {
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
  // scrolls up and goes back down because the images are not loaded.

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

      <div className="home__movies--container">
        {filteredData.results?.length === 0 && <p>no results</p>}
        {filteredData.results.map((movie) => (
          <Movie movie={movie} url={"genres"} key={movie.id} />
        ))}
      </div>

      <Pagination page={page} setSearchParams={setSearchParams} />
    </div>
  );
}
