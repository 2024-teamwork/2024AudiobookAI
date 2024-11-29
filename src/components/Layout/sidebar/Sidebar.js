import React from "react";
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">File Manager</div>
      <FileUploader />
      <FileList />
    </div>
  );
};

export default Sidebar;


// import React, { useState } from "react";
// import FileUploader from "./FileUploader";
// import FileList from "./FileList";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const [fileNames, setFileNames] = useState([]);

//   const handleUploadSuccess = (urls) => {
//     const names = urls.map((url) => {
//       const parts = url.split("/");
//       console.log("urls:" + parts);
//       return parts[parts.length - 1]; 
//     });
//     setFileNames((prev) => [...prev, ...names]);
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-title">File Manager</div>
//       <FileUploader onUploadSuccess={handleUploadSuccess} />
//       {/* <FileList fileNames={fileNames} /> */}
//       <FileList />
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // For API requests
// import SubscriptionModal from '../../SubscriptionModal/SubscriptionModal'; // Adjusted path
// import './Sidebar.css';

// const Sidebar = ({ pdfFiles = [], toggleSelect, selectAll, setPdfFiles, deleteFile }) => {
//   const navigate = useNavigate();
//   const [selectAllChecked, setSelectAllChecked] = useState(false);
//   const [showModal, setShowModal] = useState(false); // State to manage modal visibility
//   const [selectedFiles, setSelectedFiles] = useState([]); // Temporary storage for selected files

//   useEffect(() => {
//     const allSelected = pdfFiles.length > 0 && pdfFiles.every((file) => file.selected);
//     setSelectAllChecked(allSelected);
//   }, [pdfFiles]);

//   // Function to handle "Select All" toggle
//   const handleSelectAll = () => {
//     const newSelectAllChecked = !selectAllChecked;
//     setSelectAllChecked(newSelectAllChecked);
//     selectAll(newSelectAllChecked);
//   };

//   // Function to handle file input change
//   const handleFileInputChange = (e) => {
//     const files = Array.from(e.target.files);

//     // Check if file limit is reached
//     if (pdfFiles.length + files.length > 10) {
//       setShowModal(true); // Show the modal if the file limit is reached
//       return;
//     }

//     // Store selected files for submission
//     setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
//   };

//   // Function to handle file submission
//   const handleSubmitFiles = async () => {
//     if (selectedFiles.length === 0) {
//       alert('No files selected for upload.');
//       return;
//     }

//     const formData = new FormData();
//     selectedFiles.forEach((file) => formData.append('file', file));

//     try {
//       const response = await axios.post('http://localhost:9001/api/cos/upload/pdf', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Update the sidebar with uploaded files
//       const uploadedFiles = response.data.map((url, index) => ({
//         name: selectedFiles[index].name,
//         url,
//         selected: false,
//       }));

//       setPdfFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
//       setSelectedFiles([]); // Clear selected files after submission
//       alert('Files uploaded successfully!');
//     } catch (error) {
//       console.error('File upload failed:', error.response?.data || error.message);
//       alert('File upload failed. Please try again.');
//     }
//   };

//   // Function to delete a file
//   const handleDeleteFile = (index) => {
//     deleteFile(index);
//   };

//   // Function to toggle file selection
//   const handleToggleSelect = (index) => {
//     toggleSelect(index);
//   };

//   // Navigate to User Center
//   const goToUserCenter = () => {
//     navigate('/user-center');
//   };

//   // Close modal when Cancel is clicked
//   const closeModal = () => {
//     setShowModal(false); // Close the modal when the Cancel button is clicked
//   };

//   return (
//     <div className="sidebar">
//       <h2 className="sidebar-title" onClick={goToUserCenter} style={{ cursor: 'pointer' }}>
//         AudioBook AI
//       </h2>

//       <div className="file-frame">
//         <div className="file-upload-wrapper">
//           <label htmlFor="file-upload" className="custom-file-upload">Choose Files</label>
//           <input
//             id="file-upload"
//             type="file"
//             multiple
//             onChange={handleFileInputChange} // Trigger file input change handler
//             className="file-upload"
//           />
//           <span className="file-count">{pdfFiles.length}/10 files uploaded</span>
//         </div>

//         {/* Submit Button */}
//         <button
//           className="submit-button"
//           onClick={handleSubmitFiles} // Trigger file submission
//         >
//           Submit
//         </button>

//         <div className="pdf-list">
//           {pdfFiles.map((pdf, index) => (
//             <div
//               key={index} // Ensure unique key for each file
//               className="pdf-item"
//               onClick={() => handleToggleSelect(index)}
//             >
//               <input
//                 type="checkbox"
//                 checked={pdf.selected}
//                 onChange={() => handleToggleSelect(index)}
//                 style={{ marginRight: '10px' }}
//               />
//               <span className="pdf-name">
//                 {pdf.name} {pdf.url ? <a href={pdf.url} target="_blank" rel="noopener noreferrer">(View)</a> : null}
//               </span>
//               <button
//                 className="delete-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDeleteFile(index);
//                 }}
//                 title="remove file"
//               >
//                 🗑️
//               </button>
//             </div>
//           ))}
//         </div>

//         <label className="select-all">
//           <input
//             type="checkbox"
//             checked={selectAllChecked}
//             onChange={handleSelectAll}
//           />
//           Select All
//         </label>
//       </div>

//       {/* Show the modal when the file limit is reached */}
//       {showModal && (
//         <SubscriptionModal
//           message="File number reached limit! <a href='/subscription'>Subscribe us!</a>"
//           closeModal={closeModal} // Pass closeModal to handle closing the modal
//         />
//       )}
//     </div>
//   );
// };

// export default Sidebar;
