import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const API_KEY = "09d16205c5c756953a18abf4f53af424";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );

  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;
  if (!data) return <p>no results</p>;

  return (
    <div className="movie-container">
      <div className="movie-poster">
        <h1>{data.title}</h1>

        <img
          src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
          alt={`${data.title} poster`}
        />
      </div>
      <div className="movie-text">
        <p>{data.overview}</p>
        <p>release date: {data.release_date}</p>
        <p>runtime: {data.runtime} minutes</p>
        <p>
          rating: {data.vote_average} ({data.vote_count} votes)
        </p>
        <p>status: {data.status}</p>
        <button onClick={() => navigate(-1)}>back to all movies</button>
      </div>
    </div>
  );
}
