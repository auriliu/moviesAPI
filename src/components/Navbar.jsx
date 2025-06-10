import { NavLink } from "react-router";

export function Navbar() {
  return (
    <header className="navbar">
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
    </header>
  );
}
