// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import close icon
import '../styles/Header.css'; // Ensure the CSS file path is correct

const Header = ({ onSearch }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => setMenuOpen((prev) => !prev); // Toggle menu
  const closeMenu = () => setMenuOpen(false); // Close menu explicitly
  const toggleSearch = () => setSearchOpen((prev) => !prev); // Toggle search overlay
  const closeSearch = () => setSearchOpen(false); // Close search overlay explicitly

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Trigger parent search
    setSearchTerm(''); // Clear input
    setSearchOpen(false); // Close search overlay
  };

  return (
    <header className="header">
      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Reestart Logo" />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="close-menu" onClick={closeMenu}>
          <FaTimes /> {/* Close (Cancel) Symbol */}
        </div>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/all-private-jobs" onClick={closeMenu}>Private Jobs</Link>
        <Link to="/all-government-jobs" onClick={closeMenu}>Government Jobs</Link>
        <Link to="/all-internships" onClick={closeMenu}>Internships</Link>
        <Link to="/all-abroad-jobs" onClick={closeMenu}>Abroad Jobs</Link>
      </nav>

      {/* Search Icon */}
      <div className="search-icon" onClick={toggleSearch}>
        <FaSearch />
      </div>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="close-search" onClick={closeSearch}>
            <FaTimes /> {/* Close (Cancel) Symbol */}
          </div>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
