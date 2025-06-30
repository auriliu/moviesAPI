export default function Favorites({ favorites }) {
  return (
    <div>
      <p>movies liked by me</p>
      <hr />
      <ul>
        {favorites.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
