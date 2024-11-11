import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionModal.css';

const SubscriptionModal = ({ message = "File number reached limit! <a href='/subscription'>Subscribe us!</a>", closeModal }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // navigate to the subscription page
  const goToSubscription = () => {
    navigate('/subscription');
  };

  // close modal 
  const handleClose = () => {
    setIsOpen(false);
    if (closeModal) {
      closeModal(); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div dangerouslySetInnerHTML={{ __html: message }} className="modal-message"></div>
        <div className="modal-actions">
          {/* Subscribe button navigates to subscription page */}
          <button onClick={goToSubscription} className="modal-button subscribe-button">
            Subscribe us!
          </button>
          {/* Cancel button closes the modal */}
          <button onClick={handleClose} className="modal-button cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
