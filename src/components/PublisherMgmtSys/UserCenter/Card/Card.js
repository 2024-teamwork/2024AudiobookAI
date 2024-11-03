// Card.js
import React from 'react';
import './Card.css';

const Card = ({ title, date, sources, icon, isNew }) => {
  return (
    <div className={`card ${isNew ? 'new-card' : ''}`}>
      {isNew ? (
        <>
          <span className="new-icon">+</span>
          <p>New AudioBook Product</p>
        </>
      ) : (
        <>
          <span className="icon">{icon}</span>
          <p className="title">{title}</p>
          <p className="date">{date} • {sources} sources</p>
        </>
      )}
    </div>
  );
};

export default Card;
