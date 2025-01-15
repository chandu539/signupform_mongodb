import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/signup" className="navbar-link">
            Signup
          </Link>
        </li>
        <li>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
