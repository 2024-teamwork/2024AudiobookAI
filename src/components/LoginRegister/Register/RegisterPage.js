import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    if (!email || !password) {
      setMessage("Please fill in all fields.");
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="nav-link">
          <p>
          Already registered? <Link to="/login">Login</Link>
          </p>
      </div>
      <div className="oauth-buttons">
        <p>Or register using:</p>
        <button className="google-btn">Google</button>
        <button className="github-btn">GitHub</button>
        <button className="alipay-btn">Alipay</button>
        <button className="wechat-btn">WeChat</button>
      </div>
    </div>
  );
};

export default RegisterPage;
