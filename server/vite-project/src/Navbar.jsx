import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-logo">MyApp</div>
      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/movies">Movies</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="nav-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
