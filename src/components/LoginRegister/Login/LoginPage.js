import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css"; // Add your styles here
import "../../LoginRegister/LoginRegister.css";
import appleLogo from '../../../images/icon/apple.png';
import googleLogo from '../../../images/icon/google.png';
import emailIcon from '../../../images/icon/email.png';
import passwordIcon from '../../../images/icon/password.png';

const LoginPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    username: "test_user1",
    password: "kytestaudioai",
    role: "customer", // Default role
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, role } = formData;

    if (!username || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://audioai.alphalio.cn/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Login successful!");
        sessionStorage.setItem("access_token", data.access_token);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Login failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="auth-container">
        <div className="login-register-nav">
          <button className="sign-in-nav-button">Sign in</button>
          <button className="sign-in-nav-button">Create account</button>
        </div>

        <div className="oauth-buttons">
          <button className="google-btn">
            <img src={googleLogo} alt="Google" className="oauth-icon" />
            Continue with Google
          </button>
          <button className="apple-btn">
            <img src={appleLogo} alt="Apple" className="oauth-icon" />
            Continue with Apple
          </button>
        </div>
        
        <div className="split-line">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <img src={emailIcon} alt="Email" className="input-icon" />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username or email"
            />
          </div>
          <div className="input-container">
            <img src={passwordIcon} alt="Password" className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
          </div>
          <button type="submit" className="sign-in-btn">Sign in with Soundwave</button>
        </form>

        <div className="nav-link">
          <p>
            Not registered yet? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
