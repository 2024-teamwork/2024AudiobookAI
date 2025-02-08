import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import axios from "axios";
import "./Sidebar.css";
import syncedIcon from '../../../images/icon/synced.png';

// Function to format sync time
function formatTime(minutes) {
  if (minutes < 1) {
    return "less than a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes < 43200) {
    const days = Math.floor(minutes / 1440);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else {
    return "over 1 month ago";
  }
}

const syncRecordInMinutes = 660;
const latestSyncTime = formatTime(syncRecordInMinutes);

const Sidebar = ({ onFilesSelected }) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Ensure the backend URL is defined
  const backendUrl = process.env.REACT_APP_BACKEND_HOST_URL || "http://audioai.alphalio.cn";

  // Fetch files from backend
  const fetchFileList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}:8001/api/cos/get-pdf/user`);
      setFileList(response.data);
    } catch (error) {
      console.error("Failed to fetch files:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  // Toggle file selection
  const toggleFileSelection = (file) => {
    const updatedSelection = selectedFiles.some((selected) => selected.cosUrl === file.cosUrl)
      ? selectedFiles.filter((selected) => selected.cosUrl !== file.cosUrl) // Remove if already selected
      : [...selectedFiles, file]; // Add if not selected

    setSelectedFiles(updatedSelection);
    onFilesSelected(updatedSelection);
  };

  // Handle successful file upload
  const handleUploadSuccess = (uploadedFiles) => {
    const newFiles = uploadedFiles.map((url) => {
      const parts = url.split("/");
      return {
        fileName: parts[parts.length - 1],
        cosUrl: url,
      };
    });
    setFileList((prev) => [...prev, ...newFiles]);
  };

  // Handle file deletion
  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(`${backendUrl}:8001/api/cos/delete-pdf/${fileId}`);
      
      setFileList((prev) => prev.filter((file) => file.fileId !== fileId));

      // Remove deleted file from selection
      const updatedSelectedFiles = selectedFiles.filter((file) => file.fileId !== fileId);
      setSelectedFiles(updatedSelectedFiles);
      onFilesSelected(updatedSelectedFiles);
    } catch (error) {
      console.error("Failed to delete file:", error.message);
    }
  };

  return (
    <div className="sidebar">
      <FileUploader onUploadSuccess={handleUploadSuccess} />
      <div className="FileList-container">
        <FileList
          fileList={fileList}
          loading={loading}
          onFileToggle={toggleFileSelection}
          onDeleteFile={handleDeleteFile}
          selectedFiles={selectedFiles}
        />
      </div>
      <div className="sync-message-container">
        <img src={syncedIcon} className="synced-icon" alt="Synced Icon" />
        <p className="sync-text">Last synced: {latestSyncTime}</p>
      </div>
    </div>
  );
};

export default Sidebar;
