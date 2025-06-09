import { useSearchParams } from "react-router-dom";

export default function SearchTest() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q");
  //   search?q=ana+karenina
  console.log(searchQuery); // ana karenina

  return (
    <div>
      <button onClick={() => setSearchParams({ q: "amadeus" })}>
        set new value
      </button>
      {/* search?q=amadeus */}
    </div>
  );
}

// usually search params work together with state:
// search params sync url query with state for UI and data.
// state manages input/control, search params keep url in sync.
