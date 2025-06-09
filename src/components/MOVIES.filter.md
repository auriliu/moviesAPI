To filter movies by genre using the TMDB API, you use the Discover endpoint with a with_genres query parameter.

Example:

https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=28

    with_genres=28 filters movies by the genre ID 28 (which is Action).
    You can find genre IDs from the Get Genre List endpoint:

https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY
This returns a list of genres with their IDs, e.g.:

{
"genres": [
{ "id": 28, "name": "Action" },
{ "id": 35, "name": "Comedy" },
...
]
}

Summary:
Use /discover/movie endpoint
Add with_genres=genre_id param
Get genre IDs from /genre/movie/list

​
0: Object { id: 28, name: "Action" }
​1: Object { id: 12, name: "Adventure" }
​​​2: Object { id: 16, name: "Animation" }
​​​3: Object { id: 35, name: "Comedy" }
​​​4: Object { id: 80, name: "Crime" }
​​5: Object { id: 99, name: "Documentary" }
​​​6: Object { id: 18, name: "Drama" }
​​​7: Object { id: 10751, name: "Family" }
​​​8: Object { id: 14, name: "Fantasy" }
​​​9: Object { id: 36, name: "History" }
​​​10: Object { id: 27, name: "Horror" }
​​​11: Object { id: 10402, name: "Music" }
​​​12: Object { id: 9648, name: "Mystery" }
​​​13: Object { id: 10749, name: "Romance" }
​​​14: Object { id: 878, name: "Science Fiction" }
​​​15: Object { id: 10770, name: "TV Movie" }
​​​16: Object { id: 53, name: "Thriller" }
​​​17: Object { id: 10752, name: "War" }
​​​18: Object { id: 37, name: "Western" }
