import React from "react";
import "./ErrorPopup.css";

const ErrorPopup = ({ message, onClose }) => {
  if (!message) return null;

  const handleSubscriptionClick = () => {
    window.location.href = "http://localhost:3000/subscription";
  };

  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <div className="error-popup-header">
          <h3>Error</h3>
          <button onClick={onClose} className="error-popup-close-btn">
            &times;
          </button>
        </div>
        <div className="error-popup-body">
          <p>{message}</p>
          <button
            onClick={handleSubscriptionClick}
            className="error-popup-subscribe-btn"
          >
            Upgrade Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
