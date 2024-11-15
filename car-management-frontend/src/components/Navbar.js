// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h2>Car Management</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;
