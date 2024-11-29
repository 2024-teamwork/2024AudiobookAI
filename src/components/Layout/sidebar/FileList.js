import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";

const FileList = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the file list from the backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/cos/get-pdf/user"
        );
        setFileList(response.data); // Update the file list with backend response
      } catch (err) {
        setError("Failed to load files. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchFiles();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle checkbox toggle
  const toggleFileSelection = (fileName) => {
    setSelectedFiles(
      (prev) =>
        prev.includes(fileName)
          ? prev.filter((name) => name !== fileName) // Remove from selection
          : [...prev, fileName] // Add to selection
    );
  };

  return (
    <div className="pdf-list">
      <h3>Uploaded Files</h3>
      {loading ? (
        <p>Loading files...</p>
      ) : error ? (
        <p className="notification">{error}</p>
      ) : fileList.length > 0 ? (
        fileList.map((file, index) => (
          <div key={index} className="pdf-item">
            <input
              type="checkbox"
              checked={selectedFiles.includes(file.fileName)}
              onChange={() => toggleFileSelection(file.fileName)}
            />
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

// import React from "react";
// import "./Sidebar.css";

// const FileList = ({ fileNames }) => {
//   return (
//     <div className="pdf-list">
//       <h3>Uploaded Files</h3>
//       {fileNames.length > 0 ? (
//         fileNames.map((name, index) => (
//           <div key={index} className="pdf-item">
//             <span className="pdf-name">{name}</span>
//           </div>
//         ))
//       ) : (
//         <p>No files uploaded yet.</p>
//       )}
//     </div>
//   );
// };

// export default FileList;
