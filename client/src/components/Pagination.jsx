export default function Pagination({ page, query, setSearchParams }) {
  return (
    <div className="pagination-container">
      {page >= 2 && (
        <button
          onClick={() => {
            setSearchParams({ query, page: page - 1 });
          }}
        >
          previous
        </button>
      )}

      <span style={page >= 2 ? { marginLeft: "1rem" } : {}}>page: {page}</span>
      <button
        onClick={() => {
          setSearchParams({ query, page: page + 1 });
        }}
      >
        next
      </button>
    </div>
  );
}
