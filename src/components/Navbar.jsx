import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <NavLink to="/">home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">movies</NavLink>
          </li>
          <li>
            <NavLink to="/series">series</NavLink>
          </li>
          <li>
            <NavLink to="/search">search</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
