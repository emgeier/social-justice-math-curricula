import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import your CSS file

const NavbarAlt = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isOpen ? 'active' : ''}`}></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/">MathSocialJustice</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/contribute">Contribute</Link></li>
        <li><Link to="/download">Download</Link></li>
        <li><Link to="/admin">Administration</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarAlt;
