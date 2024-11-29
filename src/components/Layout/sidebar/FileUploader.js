import React, { useState } from "react";
import axios from "axios";
import "./Sidebar.css";

const FileUploader = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("file", file));

    try {
      const response = await axios.post(
        "http://localhost:9001/api/cos/upload/pdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Files uploaded successfully!");
      onUploadSuccess(response.data); // Call parent function to update file list
      setSelectedFiles([]); // Clear selected files
    } catch (error) {
      alert("Upload failed: " + (error.response?.data || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-frame">
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
        <button
          onClick={handleUpload}
          className="custom-file-upload"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
