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

// const sampleFiles = [

// ];

const FileList = ({ fileList = [], loading, onFileToggle, onDeleteFile, selectedFiles = [] }) => {

  // // 合并传入的 fileList 和 sampleFiles，确保不会重复展示文件
  // const combinedFiles = [...sampleFiles, ...fileList.filter(
  //   (file) => !sampleFiles.some((sample) => sample.fileId === file.fileId)
  // )];

  const [popupFile, setPopupFile] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const moreIconRef = useRef(null);

  const handleMoreClick = (file, event) => {
    event.stopPropagation();
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
    <div>
    <div className="pdf-list">
      <h3 className="list-item-title">Uploaded Files</h3>
      <div className="pdf-list-content">
        {loading ? (
          <p>Loading files...</p>
        ) : fileList.length > 0 ? (
          fileList.map((file, index) => (
          <div  key={index}>
            <div className="pdf-item">
                <input
                  type="checkbox"
                  checked={selectedFiles.fileName}
                  onChange={() => onFileToggle(file)} // Pass the entire file object to parent
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
              
              
        </div>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
        
      </div>
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
              <button
                onClick={() => {
                  if (popupFile) {
                    onDeleteFile(popupFile.fileId); // Delete the file
                    setPopupFile(null);
                  }
                }}
                className="popup-remove-button"
              >
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
