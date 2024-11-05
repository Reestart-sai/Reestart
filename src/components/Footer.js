import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { FaInstagram, FaFacebook, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 reestarts. All rights reserved.</p>

      <div className="footer-links">
        <NavLink 
          to="/contact-us" 
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Contact Us
        </NavLink>
        <NavLink 
          to="/about-us" 
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          About Us
        </NavLink>
        <a href ="https://reestarts.blogspot.com/2024/10/reestarts-study-materials_30.html"> Study material</a>
      </div>

      <div className="social-media-links">
        <a href="https://www.instagram.com/reestarts/profilecard/?igsh=MW94OHQ0N2tueWd3cQ==" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/share/Ls5pozc2dHoGc7Yd/" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://t.me/Reestarts" target="_blank" rel="noopener noreferrer">
          <FaTelegram />
        </a>
        
        <a href="https://whatsapp.com/channel/0029VatrgGP2Jl8NdO5KQh0c" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
