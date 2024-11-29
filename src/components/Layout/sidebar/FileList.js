import React from "react";
import "./Sidebar.css";

const FileList = ({ fileList, loading }) => {
  return (
    <div className="pdf-list">
      <h3>Uploaded Files</h3>
      {loading ? (
        <p>Loading files...</p>
      ) : fileList.length > 0 ? (
        fileList.map((file, index) => (
          <div key={index} className="pdf-item">
            <input type="checkbox" />
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
