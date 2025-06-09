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

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;
  if (!data?.results?.length) return <p>no results</p>;

  return (
    <div>
      <div className="movies-container">
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
      <div>
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

// data && data.results && data.results.length > 0 is a way to safely check if the data exists before trying to access deeper properties.

// first, it checks if data is not null or undefined.

// then it checks if data.results exists (also not null or undefined).

// finally, it checks if data.results.length is greater than 0, meaning the array has at least one item.

// if all three conditions are true, hasResults will be true; otherwise, it will be false.

// this prevents errors like "cannot read property 'results' of undefined" when data is not yet loaded.

// ELIMINATE THAT hasResults part:
// const [posts, setPosts] = useState([]);

// useEffect(() => {
//   if (data && data.results && data.results.length > 0) {
//     setPosts(data.results);
//   }
// }, [data]);

// in render:
// return (
//   <div>
//     {posts.length === 0 ? (
//       <p>no posts yet</p>
//     ) : (
//       posts.map(post => <div key={post.id}>{post.title}</div>)
//     )}
//   </div>
// );

// GPT: is there a way to eliminate this altogether?   const hasResults = data && data.results && data.results.length > 0;

// with a useEffect of something else?

//
// - fetch movies.
//   - render movies grid.
//   - with movie card: whats in it?
//     - title
//     - overview (description)
//     - vote_average
//     - poster_path
//     - release_date

// if (!data?.results?.length) return <p>no results</p>;
// – if data is not null or undefined, return data.results
// – else, return undefined without throwing an error
// prevents runtime crashes from accessing properties on undefined.

//   before fetch completes, data is often undefined or null by default.
// your component renders immediately, even before the async fetch finishes.
// so data.results would crash unless guarded by data?.results.
