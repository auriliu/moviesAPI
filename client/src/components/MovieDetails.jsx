import { useNavigate, useParams } from "react-router";
import useFetch from "../hooks/useFetch_wToken";

const token = import.meta.env.VITE_TMDB_API_TOKEN;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `${TMDB_BASE_URL}/movie/${id}`,
    token
  );

  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;
  if (!data) return <p>no results</p>;

  return (
    <>
      <div className="movie-container">
        <div className="movie-poster">
          {data.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
              alt={`${data.title || "no title"} poster`}
            />
          )}
        </div>
        <div
          className="movie-details"
          style={{
            backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('https://image.tmdb.org/t/p/w300${data.backdrop_path}')
  `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "darken",
          }}
        >
          <div className="details">
            <h2>{data.title || "no title available"}</h2>
            <h3>{data.tagline || ""}</h3>

            <p>{data.overview || "no overview available"}</p>
            <p className="details-meta">
              <span>release:</span> {data.release_date || "unknown"}
            </p>
            <p className="details-meta">
              <span>runtime: </span>
              {data.runtime ? `${data.runtime} minutes` : "runtime unknown"}
            </p>
            <p className="details-meta">
              <span>rating: </span>
              {data.vote_average.toFixed(1) || "unknown"} (
              {data.vote_count || "unknown"} votes)
            </p>
          </div>
        </div>
      </div>

      <button className="movie__details--button" onClick={() => navigate(-1)}>
        &larr; back
      </button>
    </>
  );
}
