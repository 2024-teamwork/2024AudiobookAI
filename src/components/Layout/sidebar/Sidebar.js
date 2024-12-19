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

  const toggleFileSelection = (file) => {
    const updatedSelection = selectedFiles.find((selected) => selected.cosUrl === file.cosUrl)
      ? selectedFiles.filter((selected) => selected.cosUrl !== file.cosUrl) // Remove file if already selected
      : [...selectedFiles, file]; // Add file if not selected
    
    setSelectedFiles(updatedSelection);
    onFilesSelected(updatedSelection); // Notify parent with the updated file objects
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

  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(`http://localhost:9001/api/cos/delete-pdf/${fileId}`); // Use fileId in the API endpoint
      setFileList((prev) => prev.filter((file) => file.fileId !== fileId)); // Remove deleted file from state
      if (selectedFiles?.fileId === fileId) {
        setSelectedFiles(null); // Clear selected file if it's deleted
        onFilesSelected(null);
      }
    } catch (error) {
      console.error("Failed to delete file:", error.message);
    }
  };
   
  return (
    <div className="sidebar">
      <FileUploader onUploadSuccess={handleUploadSuccess} />
      <FileList
        fileList={fileList}
        loading={loading}
        onFileToggle={toggleFileSelection}
        onDeleteFile={handleDeleteFile} // Pass the delete handler
        selectedFiles={selectedFiles}
      />
    </div>
  );
};

export default Sidebar;
