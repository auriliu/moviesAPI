movies

    /movie/popular
    /movie/top_rated
    /movie/upcoming

    /movie/{movie_id}

tv shows

    /tv/popular
    /tv/top_rated
    /tv/on_the_air
    /tv/{tv_id}

search

    /search/movie
    /search/tv
    /search/person
    /search/keyword // global

genres

    /genre/movie/list
    /genre/tv/list

images

    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
