import { useNavigate, useParams } from "react-router";
import useFetch from "../hooks/useFetch_wToken";

const token = import.meta.env.VITE_TMDB_API_TOKEN;

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    token
  );

  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;
  if (!data) return <p>no results</p>;

  return (
    <div className="movie-container">
      <div className="movie-poster">
        <h1>{data.title || "no title available"}</h1>

        {data.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt={`${data.title || "no title"} poster`}
          />
        )}
      </div>
      <div className="movie-text">
        <p>{data.overview || "no overview available"}</p>
        <p>release date: {data.release_date || "unknown"}</p>
        <p>
          runtime:
          {data.runtime ? `${data.runtime} minutes` : "runtime unknown"}
        </p>
        <p>
          rating: {data.vote_average || "unknown"} (
          {data.vote_count || "unknown"} votes)
        </p>
        <p>status: {data.status || "unknown"}</p>
        <button onClick={() => navigate(-1)}>back to all movies</button>
      </div>
    </div>
  );
}
