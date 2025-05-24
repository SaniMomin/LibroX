import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../UserSide_CSS(Files)/NavbarUR.css";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="navbar1-wrapper">
      <div className="navbar-container-navbar1">
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`navbar-menu-navbar1 ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="homeUR" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="searchUR" onClick={() => setIsOpen(false)}>Search</Link>
            </li>
            <li>
              <Link to="aboutUR" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="contactUR" onClick={() => setIsOpen(false)}>Contact</Link>
            </li>
            <li>
              <Link to="profileUR" onClick={() => setIsOpen(false)}>Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar1;
