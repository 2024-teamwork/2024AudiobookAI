import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css"; 
import "../../LoginRegister/LoginRegister.css";
import appleLogo from '../../../images/icon/apple.png';
import googleLogo from '../../../images/icon/google.png';
import emailIcon from '../../../images/icon/email.png';
import passwordIcon from '../../../images/icon/password.png';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer", // Default role
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, role } = formData;

    if (!email || !password || password !== confirmPassword) {
      setMessage("Please fill in all fields and make sure passwords match.");
      return;
    }

    try {
      const response = await fetch("https://audioai.alphalio.cn/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`,
      });

      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        const data = await response.json();
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
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
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
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
          </div>
          <div className="input-container">
            <img src={passwordIcon} alt="Password" className="input-icon" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className="register-btn">Register Soundwave Account</button>
        </form>

        <div className="nav-link">
          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;