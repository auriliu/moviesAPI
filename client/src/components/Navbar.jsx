import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/highlights">Highlights</NavLink>
        </li>
        <li>
          <NavLink to="/genres">Genres</NavLink>
        </li>
        {/* <li>
          <NavLink to="/series">Series</NavLink>
        </li> */}
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/watched">Watched</NavLink>
        </li>
      </ul>
    </nav>
  );
}
