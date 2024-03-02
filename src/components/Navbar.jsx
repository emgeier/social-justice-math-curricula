import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';

function Navbar() {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">SocialJusticeMath</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav auto"> {/* Align items to the right */}
          <li className="nav-item">
            <Link className="nav-link" to="/contribute">Contribute</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">Search</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/download">Download</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Administration</Link>
          </li>
        </ul>
      </div>
      <button className="sign-out-button" onClick={signOut}>Sign Out</button>

    </nav>
  );
}

export default Navbar;
