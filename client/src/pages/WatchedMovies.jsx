export default function WatchedMovies({ watchedMovies }) {
  return (
    <div>
      {watchedMovies.length >= 1 ? (
        watchedMovies.map((i) => <p key={i.id}>{i.title}</p>)
      ) : (
        <p>you dont have any liked movies</p>
      )}
    </div>
  );
}
