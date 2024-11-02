import React from 'react';
import './EditContent.css';

const EditContent = () => {
  return (
    <div className="content-card edit-content">
      <h2>Podcast Script</h2>
      <textarea placeholder="Podcast Script will show here..." className="textarea" />
      <button className="action-button">Save Podcast</button>
    </div>
  );
};

export default EditContent;
