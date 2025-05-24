import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../AdminSide_CSS(File)/NavbarAD.css";

const NavbarAD = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className='NavbarAD-wrapper'>
      <nav className='NavbarAD-ulContainer'>
        <div className="NavbarAD-logo-menu">
          <div className="NavbarAD-hamburger" onClick={toggleMenu}>
            ☰
          </div>
        </div>
        <ul className={`NavbarAD-ul ${menuOpen ? "open" : ""}`}>
          <li><Link to="homeAD" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="searchAD" onClick={() => setMenuOpen(false)}>Search</Link></li>
          <li><Link to="addBookAD" onClick={() => setMenuOpen(false)}>Upload Book</Link></li>
          <li><Link to="orderListAD" onClick={() => setMenuOpen(false)}>Order Details</Link></li>
          <li><Link to="updateSubAD" onClick={() => setMenuOpen(false)}>Subscription Details</Link></li>
          <li><Link to="advertiseAD" onClick={() => setMenuOpen(false)}>Advertiser Details</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarAD;
