import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-cont">
        <img src="" alt="" />
      </div>
      <div className="nav-els">
        <Link to="/" className="nav-element">
          Home
        </Link>
        <Link to="/about" className="nav-element">
          About
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
