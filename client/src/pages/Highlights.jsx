import { useState } from "react";
import useFetch from "../hooks/useFetch_wToken";
import { Link, useSearchParams } from "react-router";

import Heart from "../components/Heart";
import Pagination from "../components/Pagination";
import HighlightsFilters from "../components/HighlightsFilters";

const TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export default function Highlights() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "popular";
  const page = Number(searchParams.get("page")) || 1;

  const { data, loading, error } = useFetch(
    `${TMDB_BASE_URL}/movie/${query}?page=${page}`,
    TOKEN
  );

  const [liked, setLiked] = useState(false);

  if (loading) return <p className="loading">loading...</p>;
  if (error) return <p className="error">error: {error}</p>;

  return (
    <div className="home__movies">
      <HighlightsFilters query={query} setSearchParams={setSearchParams} />

      <div className="home__movies--container">
        {data.results?.length === 0 && <p>no results</p>}
        {data.results?.map((movie) => (
          <Link to={`/highlights/${movie.id}`} key={movie.id}>
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
                  <span>rating: </span>
                  <i class="fa-solid fa-star"></i>
                  <span>{movie.vote_average?.toFixed(1) || "No rating"}</span>
                </div>
                <p className="overview">{movie.overview || "no description"}</p>
                <div className="home__movie--icons">
                  <Heart liked={liked} setLiked={setLiked} />

                  <i class="fa-solid fa-bookmark" title="bookmark"></i>
                  <i class="fa-solid fa-share" title="share"></i>
                </div>
              </div>
              {/* overlay */}
            </div>
          </Link>
        ))}
      </div>

      <Pagination page={page} query={query} setSearchParams={setSearchParams} />
    </div>
  );
}
