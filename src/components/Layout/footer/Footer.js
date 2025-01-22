import React from 'react';
import './Footer.css';
import logo from "../../../images/alphalio_transparent.png"; 

const Footer = () => (
  <footer className="footer">
    {/* Top Half */}
    <div className="footer-top">
      {/* Logo */}
      <div className="footer-logo">
        <img src={logo} alt="Alphalio Logo" className="footer-logo-image" />
      </div>

      {/* Right Section */}
      <div className="footer-right">
        {/* Pages Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Pages</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/audio-product">Audio Product</a></li>
            <li><a href="/subscription">Subscribe</a></li>
          </ul>
        </div>

        {/* Reach Us Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Reach Us</h3>
          <ul className="footer-links">
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        {/* Subscribe Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Subscribe</h3>
        </div>
      </div>
    </div>

    {/* Bottom Half */}
    <div className="footer-bottom">
      <p>© Copyright Alphalio 2024</p>
    </div>
  </footer>
);

export default Footer;
