import React, { useState } from "react";
import "./Sidebar.css";

const FileChooser = ({ onFileSelect }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    onFileSelect(files); // Pass the selected files to the parent component
  };

  return (
    <div className="file-upload-wrapper">
      <label className="custom-file-upload">
        Choose Files
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-upload"
        />
      </label>
      <div className="file-count">
        {selectedFiles.length > 0
          ? `${selectedFiles.length} files selected`
          : "No files selected"}
      </div>
    </div>
  );
};

export default FileChooser;
