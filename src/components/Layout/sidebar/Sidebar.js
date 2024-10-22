import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ pdfFiles = [], toggleSelect, selectAll, handleFileUpload, deleteFile }) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [notification, setNotification] = useState(''); // State for notification

  useEffect(() => {
    const allSelected = pdfFiles.length > 0 && pdfFiles.every((file) => file.selected);
    setSelectAllChecked(allSelected);
  }, [pdfFiles]);

  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    selectAll(newSelectAllChecked);
  };

  const handleFileInputChange = (e) => {
    // Check if file limit is reached
    if (pdfFiles.length >= 10) {
      setNotification('Cannot add more files.'); // Show notification
      return;
    }
    setNotification(''); // Clear notification if adding files is allowed
    handleFileUpload(e);
  };

  const handleDeleteFile = (index) => {
    deleteFile(index);
  };

  const handleToggleSelect = (index) => {
    toggleSelect(index);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Upload Sources</h2>
      <div className="file-frame">
        <div className="file-upload-wrapper">
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose Files
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="file-upload"
          />
          <span className="file-count">{pdfFiles.length}/10 files uploaded</span>
          {notification && <div className="notification">{notification}</div>} {/* Display notification */}
        </div>

        <div className="pdf-list">
          {pdfFiles.map((pdf, index) => (
            <div
              key={pdf.name}
              className="pdf-item"
              onClick={() => handleToggleSelect(index)} // Toggle selection on item click
            >
              <input
                type="checkbox"
                checked={pdf.selected}
                onChange={() => handleToggleSelect(index)} 
                style={{ marginRight: '10px' }} // Adjust margin for checkbox
              />
              
              <span className="pdf-name">{pdf.name}</span>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the item click
                  handleDeleteFile(index);
                }} 
                title="remove file"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <label className="select-all">
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={handleSelectAll}
          />
          Select All
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
