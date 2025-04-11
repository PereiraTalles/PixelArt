import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/default_transparent_1000x1000.png';
import '../index.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo à esquerda */}
        <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" width="70" height="70" style={{ borderRadius: '20%' }}
/>
        </Link>

        {/* Nome centralizado */}
        <div className="mx-auto">
          <span className="navbar-text text-light" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            PixelArt
          </span>
        </div>

        {/* Links à direita */}
        <div className="d-flex">
          <Link
            className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`nav-button ${location.pathname === '/login' ? 'active' : ''}`}
            to="/login"
          >
            Login/Register
          </Link>
          <Link
            className={`nav-button ${location.pathname === '/about' ? 'active' : ''}`}
            to="/about"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;