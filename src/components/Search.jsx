import { useState } from "react";
import { useSearchParams } from "react-router";

const API_KEY = "09d16205c5c756953a18abf4f53af424";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [input, setInput] = useState(query);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ q: input });

    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {/* <button>search</button> */}
      </form>

      {isLoading && <p>loading...</p>}
      {!isLoading && movies.length > 0 && (
        <div className="search-container">
          {movies.map((movie) => {
            return (
              <div key={movie.id}>
                <p>{movie.title}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  width="100px"
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
