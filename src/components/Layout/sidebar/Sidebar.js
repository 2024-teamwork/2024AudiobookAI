import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = ({ onFilesSelected }) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Fetch files from backend
  const fetchFileList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:9001/api/cos/get-pdf/user"
      );
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

  const toggleFileSelection = (cosUrl) => {
    const updatedSelection = selectedFiles.includes(cosUrl)
      ? selectedFiles.filter((url) => url !== cosUrl)
      : [...selectedFiles, cosUrl];

    setSelectedFiles(updatedSelection);
    onFilesSelected(updatedSelection); // Notify parent
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
    setFileList((prev) => [...prev, ...newFiles]); // Add newly uploaded files to the state
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">AudioBook AI</div>
      <FileUploader onUploadSuccess={handleUploadSuccess} />
      {/* <FileList fileList={fileList} loading={loading} /> */}

      <FileList
        fileList={fileList}
        loading={loading}
        onFileToggle={toggleFileSelection}
        selectedFiles={selectedFiles}
      />
    </div>
  );
};

export default Sidebar;
