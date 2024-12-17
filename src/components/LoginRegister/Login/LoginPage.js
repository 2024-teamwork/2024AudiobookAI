import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

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
//         console.log("Token:", data.access_token);
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Select Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="customer">Customer</option>
            <option value="publisher">Publisher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="nav-link">
          <p>
          Not registered yet? <Link to="/register">Register</Link>
          </p>
      </div>
      <div className="oauth-buttons">
        <p>Or login using:</p>
        <button className="google-btn">Google</button>
        <button className="github-btn">GitHub</button>
        <button className="alipay-btn">Alipay</button>
        <button className="wechat-btn">WeChat</button>
      </div>
    </div>
  );
};

export default LoginPage;
