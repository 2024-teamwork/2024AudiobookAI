import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import axios from "axios";
import "./Sidebar.css";


const Sidebar = ({ onFilesSelected }) => {

  // const sampleFiles = [
  //   {
  //     fileId: 0,
  //     fileName: "Generative AI",
  //     cosUrl:
  //       "https://arxiv.org/pdf/2309.07930",
  //   },
  //   {
  //     fileId: 0,
  //     fileName: "Generative Artificial Intelligence: A Systematic Review and Applications",
  //     cosUrl:
  //       "https://arxiv.org/html/2405.11029v1",
  //   },
  //   {
  //     fileId: 0,
  //     fileName: "The Rapid Adoption of Generative AI",
  //     cosUrl:
  //       "https://www.nber.org/papers/w32966",
  //   },
  //   {
  //     fileId: 0,
  //     fileName:
  //       "The Cue-of-the-Cloud Effec - When Reminders of Online Information Availability Increase Purchase Intentions and Choice.pdf",
  //     cosUrl:
  //       "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1734407756859_2003d6bc-90ac-4591-8fa7-831dc302256f_The%20Cue-of-the-Cloud%20Effec%20-%20When%20Reminders%20of%20Online%20Information%20Availability%20Increase%20Purchase%20Intentions%20and%20Choice.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1734407757%3B1993607757%26q-key-time%3D1734407757%3B1993607757%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D5a4a01e0f14116f17c12029dba9eaf7aa38cc542",
  //   },
  // ];
  
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
