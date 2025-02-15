import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import logoImage from '../../../images/alphalio.jpg';
import testAvatar1 from '../../../images/testAvatar1.png';
import defaultAvatar from '../../../images/defaultAvatar.png';

const userInfo = {
  //name: "", // empty name implies not logged in
  name: "Samansha", //non-empty name implies logged in
  avatar: testAvatar1,
};

//temperory login check
const checkLoginStatus = (userInfo) => {
  if (userInfo.name !== "") {
    console.log("logged in!");
    return true;
  } else {
    console.log("not logged in!");
    return false;
  }
};

const Navigation = () => {
  const location = useLocation();
  const isLoggedIn = checkLoginStatus(userInfo);

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <img src={logoImage} alt="Logo" style={{ height: '60px' }}/>
      </div>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={location.pathname === "/" ? "selected" : ""}
        >
          Home
        </Link>
        <Link 
          to="/" 
          className={location.pathname === "/audio-product" ? "selected" : ""}
        >
          Audio Product
        </Link>
        <Link 
          to="/about" 
          className={location.pathname === "/about" ? "selected" : ""}
        >
          About
        </Link>
        <Link 
          to="/subscription" 
          className={location.pathname === "/subscription" ? "selected" : ""}
        >
          Subscribe
        </Link>
        <Link 
          to="/contact" 
          className={location.pathname === "/contact" ? "selected" : ""}
        >
          Contact
        </Link>
        
      </div>
      
      {isLoggedIn && (
      <div className="user-info">
        <img src={userInfo?.avatar || {defaultAvatar}} alt="Avatar" className="avatar" />
        {isLoggedIn && (
          <span className="welcome">{userInfo.name}</span>
        )}
        
        {/* Render dropdown only if logged in */}
        
          <div className="dropdown">
            <Link to="/user-center">User Center</Link>
            <Link to="/login">Log Out</Link>
          </div>
        
      </div>
      )}

      <div class="login">
        {!isLoggedIn && (
          <Link 
            to="/login" 
            className={location.pathname === "/login" ? "selected" : ""}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
