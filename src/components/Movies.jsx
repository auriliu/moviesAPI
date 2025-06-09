import React, { useEffect, useState } from "react";
const API_KEY = "09d16205c5c756953a18abf4f53af424";

import useFetch from "../hooks/useFetch";
import { Link, useSearchParams } from "react-router-dom";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // useEffect keeps url in sync with page state
  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

  // const genres = useFetch(
  //   `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  // );
  // console.log(genres);

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  console.log(data.results);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;
  // if (!data?.results?.length) return <p>no results</p>;
  // when loading: shows no results instead of loading...

  // a SKELETON component for images: spinners when loading images.
  // libs like shadcn.

  return (
    <div>
      <div className="movies-container">
        {data.results.length == 0 && <p>no results</p>}
        {data.results.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
              <p>{movie.title}</p>
              {/* <p>{movie.overview}</p> */}
              {/* d be expandable text */}
              <p>{movie.vote_average}</p>
              <p>{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* pagination */}
      <div className="pagination-container">
        <button
          onClick={() => {
            setPage((prev) => prev - 1);
            window.scrollTo(0, 0);
          }}
          disabled={page == 1}
        >
          prev
        </button>
        <span>page: {page}</span>
        <button
          onClick={() => {
            setPage((prev) => prev + 1);
            window.scrollTo(0, 0);
          }}
          disabled={page == data?.total_pages}
        >
          next
        </button>
      </div>
      {/* pagination */}
    </div>
  );
}

// if (!data?.results?.length) return <p>no results</p>;
// – if data is not null or undefined, return data.results
// – else, return undefined without throwing an error
// prevents runtime crashes from accessing properties on undefined.

//   before fetch completes, data is often undefined or null by default.
// your component renders immediately, even before the async fetch finishes.
// so data.results would crash unless guarded by data?.results.
