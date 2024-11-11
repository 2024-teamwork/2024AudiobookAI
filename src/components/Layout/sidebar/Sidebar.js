import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionModal from '../../SubscriptionModal/SubscriptionModal'; // Adjusted path
import './Sidebar.css';

const Sidebar = ({ pdfFiles = [], toggleSelect, selectAll, handleFileUpload, deleteFile }) => {
  const navigate = useNavigate();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const allSelected = pdfFiles.length > 0 && pdfFiles.every((file) => file.selected);
    setSelectAllChecked(allSelected);
  }, [pdfFiles]);

  // Function to handle "Select All" toggle
  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    selectAll(newSelectAllChecked);
  };

  // Function to handle file input change
  const handleFileInputChange = (e) => {
    // Check if file limit is reached
    if (pdfFiles.length >= 10) {
      setShowModal(true); // Show the modal if the file limit is reached
      return;
    }

    // Proceed with file upload if limit is not reached
    setShowModal(false);
    handleFileUpload(e);
  };

  // Function to delete a file
  const handleDeleteFile = (index) => {
    deleteFile(index);
  };

  // Function to toggle file selection
  const handleToggleSelect = (index) => {
    toggleSelect(index);
  };

  // Navigate to User Center
  const goToUserCenter = () => {
    navigate('/user-center');
  };

  // Close modal when Cancel is clicked
  const closeModal = () => {
    setShowModal(false); // Close the modal when the Cancel button is clicked
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title" onClick={goToUserCenter} style={{ cursor: 'pointer' }}>
        AudioBook AI
      </h2>

      <div className="file-frame">
        <div className="file-upload-wrapper">
          <label htmlFor="file-upload" className="custom-file-upload">Upload File</label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileInputChange} // Trigger the file input change handler
            className="file-upload"
          />
          <span className="file-count">{pdfFiles.length}/10 files uploaded</span>
        </div>

        <div className="pdf-list">
          {pdfFiles.map((pdf, index) => (
            <div
              key={pdf.name}
              className="pdf-item"
              onClick={() => handleToggleSelect(index)}
            >
              <input
                type="checkbox"
                checked={pdf.selected}
                onChange={() => handleToggleSelect(index)} 
                style={{ marginRight: '10px' }}
              />
              <span className="pdf-name">{pdf.name}</span>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
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

      {/* Show the modal when the file limit is reached */}
      {showModal && (
        <SubscriptionModal 
          message="File number reached limit! <a href='/subscription'>Subscribe us!</a>"
          closeModal={closeModal} // Pass closeModal to handle closing the modal
        />
      )}
    </div>
  );
};

export default Sidebar;
