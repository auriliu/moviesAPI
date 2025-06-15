import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Highlights</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Genres</NavLink>
        </li>
        {/* <li>
          <NavLink to="/series">Series</NavLink>
        </li> */}
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
      </ul>
    </nav>
  );
}
