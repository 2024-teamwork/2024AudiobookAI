import React, { useState } from "react";
import axios from "axios";
import "./Sidebar.css";
import ErrorPopup from "../ErrorPopUpWindow/ErrorPopup";

const FileUploader = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

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
        "https://audioai.alphalio.cn/api/cos/get-pdf/user",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Files uploaded successfully!");
      onUploadSuccess(response.data); // Call parent function to update file list
      setSelectedFiles([]); // Clear selected files
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
          className="custom-file-submit"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
        <ErrorPopup message={errorMessage} onClose={handleCloseError} />
      </div>
    </div>
  );
};

export default FileUploader;