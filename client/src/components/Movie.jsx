import { Link } from "react-router";

import Heart from "./Heart";

export default function Movie({ movie, url }) {
  return (
    <Link to={`/${url}/${movie.id}`} key={movie.id}>
      <div className="home__movie--card">
        <div>
          {movie.poster_path ? (
            <img
              className="home__movie--poster"
              alt={`${movie.title || "no title"} poster`}
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            />
          ) : (
            <div className="no_poster">no image available</div>
          )}
        </div>

        {/* overlay */}
        <div className="home__movie--overlay">
          <p>{movie.title || "No title available"}</p>
          <div className="home__movies--rating">
            <span>rating: </span>
            <i className="fa-solid fa-star"></i>
            <span>{movie.vote_average?.toFixed(1) || "No rating"}</span>
          </div>
          <p className="overview">{movie.overview || "no description"}</p>
          <div className="home__movie--icons">
            <Heart />
            <i className="fa-solid fa-plus" title="add to watched movies"></i>
            <i className="fa-solid fa-share" title="share"></i>
          </div>
        </div>
        {/* overlay */}
      </div>
    </Link>
  );
}
