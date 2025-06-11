const API_KEY = "09d16205c5c756953a18abf4f53af424";

import useFetch from "../hooks/useFetch";
import { Link } from "react-router";

export default function Home() {
  // it needs pagination: can i add pagination on the url?
  // without the local state?

  const GENRE_ID = 12;
  const { data } = useFetch(
    // `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_ID}`
  );
  const { data: genres } = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );

  // https://api.themoviedb.org/3/discover/movie/list?api_key=YOUR_API_KEY&with_genres=GENRE_ID

  console.log(data.results);
  console.log(genres);

  //   /genre/movie/list

  //   function fetchMoviesByGenre(genreId, page = 1) {
  //   return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`)
  //     .then((res) => res.json());
  // }

  //
  const GENRES = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };

  return (
    <div>
      <div className="movies-filters">
        <span>MOVIES:</span>
        <button>recent</button>
        <button>popular</button>
        <button>action</button>
        <button>drama</button>
        <button>all</button>
      </div>
      <div>
        {/* {data.results.map((i) => (
          <Link key={i.id}>{i.title} </Link>
        ))} */}
      </div>
    </div>
  );
}

// 1. get genre list (for ids)

// endpoint:
// https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY
// 2. use discover endpoint with genre filter

// endpoint:
// https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=GENRE_ID

// example:
// .../discover/movie?api_key=xxx&with_genres=16 → for animation
// 3. combine with other filters if needed

// you can also add:

//     sort_by=popularity.desc

//     page=1

//     etc.

// 4. highlight active genre

// same way as category:

//     set genre id in search params

//     style selected button based on param
