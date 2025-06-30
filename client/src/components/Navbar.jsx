import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import { useUser } from "../UserContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  console.log(user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, [setUser]);

  const handleLogout = () => {
    setUser(null);
  };

  // rest
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // disables scrolling when menu bar is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="navbar">
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/highlights" onClick={() => setIsOpen(false)}>
            Highlights
          </NavLink>
        </li>
        <li>
          <NavLink to="/genres" onClick={() => setIsOpen(false)}>
            Genres
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" onClick={() => setIsOpen(false)}>
            Search
          </NavLink>
        </li>

        <li>
          {user ? (
            // <p>Hello, {user}</p>
            <p>Hello, {user.charAt(0).toUpperCase() + user.slice(1)}</p>
          ) : (
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              Login
            </NavLink>
          )}
        </li>

        {user && (
          <li>
            <NavLink to="/favorites" onClick={() => setIsOpen(false)}>
              Favorites
            </NavLink>
          </li>
        )}

        {user && (
          <NavLink to="/" onClick={handleLogout}>
            logout
          </NavLink>
        )}
      </ul>
      <div className="nav-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}
