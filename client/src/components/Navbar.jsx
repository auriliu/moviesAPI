import { NavLink } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
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
          <NavLink to="/seen" onClick={() => setIsOpen(false)}>
            Seen
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/queue" onClick={() => setIsOpen(false)}>
            Queue
          </NavLink>
        </li> */}
      </ul>
      <div className="nav-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}
