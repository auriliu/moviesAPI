export default function HighlightsFilters({ query, setSearchParams }) {
  return (
    <div className="home__movies--filters">
      <button
        className={query === "popular" ? "active" : ""}
        onClick={() => setSearchParams({ query: "popular", page: 1 })}
      >
        popular
      </button>
      <button
        className={query === "top_rated" ? "active" : ""}
        onClick={() => setSearchParams({ query: "top_rated", page: 1 })}
      >
        top-rated
      </button>
      <button
        className={query === "upcoming" ? "active" : ""}
        onClick={() => setSearchParams({ query: "upcoming", page: 1 })}
      >
        upcoming
      </button>
    </div>
  );
}
