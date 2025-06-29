import { NavLink } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
  // auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <NavLink to="/signup" onClick={() => setIsOpen(false)}>
            signup
          </NavLink>
        </li>

        {!isLoggedIn ? (
          <li>
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              Hello, Handsome
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <NavLink to="/logout" onClick={() => setIsLoggedIn(false)}>
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
