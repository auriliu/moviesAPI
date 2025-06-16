export default function WatchedMovies() {
  const watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];

  return (
    <div>
      {watchedMovies.length >= 1 ? (
        <div>
          {watchedMovies.map((i) => (
            <div key={i.id}>
              <p>{i.title}</p>
              <p>{i.overview}</p>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <p>no movies</p>
      )}
    </div>
  );
}
