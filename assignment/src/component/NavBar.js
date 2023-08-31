import React, { useState } from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <Link to="/">Home</Link>
      <button className="button" onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}

export default NavBar;
