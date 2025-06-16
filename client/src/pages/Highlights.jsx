import { useSearchParams } from "react-router";

import useFetch from "../hooks/useFetch_wToken";
import Pagination from "../components/Pagination";
import HighlightsFilters from "../components/HighlightsFilters";
import Movie from "../components/Movie";

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

  if (loading) return <p className="loading">loading...</p>;
  if (error) return <p className="error">error: {error}</p>;

  return (
    <div className="home__movies">
      <HighlightsFilters query={query} setSearchParams={setSearchParams} />
      <div className="home__movies--container">
        {data.results?.length === 0 && <p>no results</p>}
        {data.results?.map((movie) => (
          <Movie movie={movie} url={"highlights"} />
        ))}
      </div>
      <Pagination page={page} query={query} setSearchParams={setSearchParams} />
    </div>
  );
}
