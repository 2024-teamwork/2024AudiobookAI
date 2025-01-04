import React, { useState } from "react";
import axios from "axios";
import "./Sidebar.css";
import ErrorPopup from "../ErrorPopUpWindow/ErrorPopup";

const FileSubmitter = ({ selectedFiles, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage("Please select files to upload.");
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
    } catch (error) {
      setErrorMessage(error.response?.data || error.message); // Display error message in the popup
    } finally {
      setUploading(false);
    }
  };

  const handleCloseError = () => {
    setErrorMessage(""); // Clear the error message when the popup is dismissed
  };

  return (
    <div className="file-submit-wrapper">
      <button
        onClick={handleUpload}
        className="custom-file-submit"
        disabled={uploading}
      >
        {uploading ? "Syncing..." : "Sync with cloud"}
      </button>
      <ErrorPopup message={errorMessage} onClose={handleCloseError} />
    </div>
  );
};

export default FileSubmitter;
