import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const [click, setClick] = useState(false); 

  const handleClick = () => setClick(!click); 
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    closeMobileMenu();
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          EPLQ
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={click ? "nav-links active" : "nav-links"}>
          <li>
            <NavLink to="/" end onClick={closeMobileMenu}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink>
          </li>
        </ul>
        <div className={click ? "nav-auth active" : "nav-auth"}>
          {userInfo ? (
            <>
              {userInfo.isAdmin ? (
                <NavLink to="/admin" className="nav-btn-primary" onClick={closeMobileMenu}>
                  Admin Panel
                </NavLink>
              ) : (
                <NavLink to="/dashboard" className="nav-btn-primary" onClick={closeMobileMenu}>
                  Dashboard
                </NavLink>
              )}
              <button onClick={handleLogout} className="nav-btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-btn-primary" onClick={closeMobileMenu}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;