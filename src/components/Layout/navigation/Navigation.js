import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
const user = {
    name: "John Doe",
    avatar: "path-to-avatar-image" 
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">Introduction to AudioBookAI</div>
      <div className="nav-links">
        <Link to="/subscription">Subscribe us!</Link>
        <Link to="/">Home</Link>
        <Link to="/customer-view">Customer View</Link>
        <Link to="/login">Welcome! Please Login</Link>
        {/* <Link to="/settings">Settings</Link> */}
      </div>
      
      <div className="user-info">
        {user ? (
          <>
            {/* <span className="welcome">Welcome! {user.name}</span> */}
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="avatar" 
            />
            <div className="dropdown">
              <Link to="/profile">Go to Profile</Link>
              <Link to="/logout">Log Out</Link>
            </div>
          </>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
