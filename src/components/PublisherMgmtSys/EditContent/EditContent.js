import React from 'react';
import './EditContent.css';

const EditContent = () => {
  return (
    <div className="content-card edit-content">
      <h2>Summary</h2>
      <textarea placeholder="Write your content here..." className="textarea" />
      <button className="action-button">Save Changes</button>
    </div>
  );
};

export default EditContent;
