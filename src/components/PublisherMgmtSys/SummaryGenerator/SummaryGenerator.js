import React from 'react';
import './SummaryGenerator.css';

const SummaryGenerator = () => {
  return (
    <div className="content-card edit-content">
      <h2>Summary</h2>
      <textarea placeholder="Summary will show here..." className="textarea" />
      <button className="action-button">Generate Summary</button>
    </div>
  );
};

export default SummaryGenerator;
