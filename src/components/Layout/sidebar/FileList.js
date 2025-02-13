import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import moreIcon from "../../../images/icon/more.png";
import syncedIcon from '../../../images/icon/synced.png';

//latest sync time
const syncRecordInMinutes = 660;
function formatTime(minutes) { //sync time process
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

const latestSyncTime = formatTime(syncRecordInMinutes);

const sampleFiles = [
  { fileId: 1, 
    fileName: "Generative AI", 
    cosUrl: "https://arxiv.org/pdf/2309.07930",
    uploadTime: "3 minutes ago" },
  { fileId: 2, 
    fileName: "Generative Artificial Intelligence: A Systematic Review and Applications", 
    cosUrl: "https://arxiv.org/html/2405.11029v1" },
  { fileId: 3, 
    fileName: "The Rapid Adoption of Generative AI", 
    cosUrl: "https://www.nber.org/papers/w32966" },
];

const FileList = ({ fileList = [], loading, onFileToggle, onDeleteFile, selectedFiles = [] }) => {
  const [popupFile, setPopupFile] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const moreIconRef = useRef(null);

  // Merge sampleFiles and fileList without duplicates
  const combinedFiles = [...sampleFiles, ...fileList.filter(
    (file) => !sampleFiles.some((sample) => sample.fileId === file.fileId)
  )];

  const handleMoreClick = (file, event) => {
    event.stopPropagation(); // Prevent checkbox from triggering
    setPopupFile(file);

    // Get the position of the moreIcon element
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY - 10,
      left: rect.right + 10,
    });
  };

  const closePopup = () => {
    setPopupFile(null);
  };

  return (
    <div className="pdf-list">
      <h3 className="list-item-title">Uploaded Files</h3>
      <div className="pdf-list-content">
        {loading ? (
          <p>Loading files...</p>
        ) : combinedFiles.length > 0 ? (
          combinedFiles.map((file, index) => (
            <div key={file.fileId} className="pdf-item">
              <input
                type="checkbox"
                checked={selectedFiles.some((selected) => selected.fileId === file.fileId)}
                onChange={() => onFileToggle(file)}
              />
              <div className="pdf-info-preview">
                <span className="pdf-name">{file.fileName}</span>
                <span className="pdf-upload-time">{file.uploadTime}</span>
              </div>
              <img
                src={moreIcon}
                alt="More options"
                className="more-icon"
                onClick={(event) => handleMoreClick(file, event)}
                ref={moreIconRef}
              />
            </div>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
        <div className="sync-message-container">
          <img src={syncedIcon} className="synced-icon"></img>
          <p className="sync-text">Last synced: {latestSyncTime}</p>
        </div>
      </div>

      {popupFile && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: Math.min(popupPosition.top, 580),
              left: popupPosition.left,
            }}
          >
            <div className="popup-file-name">
              <strong>File Name:</strong> {popupFile.fileName}
            </div>
            <div className="popup-actions">
              <a href={popupFile.cosUrl} target="_blank" rel="noopener noreferrer" className="popup-view-button">
                View File
              </a>
              <button onClick={() => popupFile && onDeleteFile(popupFile.fileId)} className="popup-remove-button">
                Remove File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileList;
