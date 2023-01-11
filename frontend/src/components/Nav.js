import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar">
      <h3>PhotoShare</h3>
      <div className="nav__BtnGroup">
        <Link to="/photos" style={{ marginRight: '10px' }}>
          All Photos
        </Link>
        <Link to="/photo/upload">Upload Photo</Link>
      </div>
    </nav>
  );
};

export default Nav;
