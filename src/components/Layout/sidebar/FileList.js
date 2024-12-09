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
            <input
              type="checkbox"
              checked={selectedFiles.fileName}
              // checked={selectedFiles.some((selected) => selected.cosUrl === file.cosUrl)} 
              onChange={() => onFileToggle(file)} // Pass the entire file object to parent
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
