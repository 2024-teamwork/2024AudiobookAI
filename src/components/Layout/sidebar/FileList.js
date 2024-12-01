import React from "react";
import "./Sidebar.css";

const FileList = ({ fileList = [], loading, onFileToggle, selectedFiles = [] }) => {
  return (
    <div className="pdf-list">
      <h3>Uploaded Files</h3>
      {loading ? (
        <p>Loading files...</p>
      ) : fileList.length > 0 ? (
        fileList.map((file, index) => (
          <div key={index} className="pdf-item">
            {/* Ensure the input is controlled */}
            <input
              type="checkbox"
              checked={selectedFiles.includes(file.cosUrl)} // Controlled checkbox
              onChange={() => onFileToggle(file.cosUrl)} // Notify parent about toggle
            />
            <span className="pdf-name">{file.fileName}</span>
            <a href={file.cosUrl} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </div>
        ))
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileList;
