import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = () => {
  const [fileList, setFileList] = useState([]); // State for storing the list of files
  const [loading, setLoading] = useState(false);

  // Fetch the initial list of files from the backend
  const fetchFileList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:9001/api/cos/get-pdf/user");
      setFileList(response.data); // Update the file list
    } catch (error) {
      console.error("Failed to fetch files:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the file list on component mount
  useEffect(() => {
    fetchFileList();
  }, []);

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
      <FileList fileList={fileList} loading={loading} />
    </div>
  );
};

export default Sidebar;
