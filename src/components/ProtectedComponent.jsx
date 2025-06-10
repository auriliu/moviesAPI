import { useSearchParams } from "react-router";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";

  function handleChange(e) {
    const value = e.target.value;
    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <select value={category} onChange={handleChange}>
        <option value="all">All</option>
        <option value="shoes">Shoes</option>
        <option value="hats">Hats</option>
      </select>
      <p>Showing products in category: {category}</p>
    </div>
  );
}
