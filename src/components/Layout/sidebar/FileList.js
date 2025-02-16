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
  {
    fileId: 1,
    fileName: "Generative AI",
    cosUrl: "https://arxiv.org/pdf/2309.07930",
  }/*,
  {
    fileId: 2,
    fileName: "Generative Artificial Intelligence: A Systematic Review and Applications",
    cosUrl: "https://arxiv.org/html/2405.11029v1",
  },
  {
    fileId: 3,
    fileName: "The Rapid Adoption of Generative AI",
    cosUrl: "https://www.nber.org/papers/w32966",
  },
  {
    fileId: 6,
    fileName: "Generative AI-Business & Information Systems Engineering.pdf",
    cosUrl: "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1734415933455_6fadee86-ab31-413b-8a6e-82755ddfe838_Generative%20AI-Business%20%26%20Information%20Systems%20Engineering.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1734415948%3B1993615948%26q-key-time%3D1734415948%3B1993615948%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D6d0313cdb67bbf415ae9bd74d3e403774975eb78",
  },
  {
    fileId: 5,
    fileName: "The GenAI is out of the bottle_generative artificial intelligence from a business model innovation perspective.pdf",
    cosUrl: "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1734416101402_461e791d-da64-449d-8081-cfa7bfb73eed_The%20GenAI%20is%20out%20of%20the%20bottle_generative%20artificial%20intelligence%20from%20a%20business%20model%20innovation%20perspective.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1734416130%3B1993616130%26q-key-time%3D1734416130%3B1993616130%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D2988c4b5f5e2248723a51496917ec6c5cc9ac336",
  },
  {
    fileId: 4,
    fileName: "The Cue-of-the-Cloud Effec - When Reminders of Online Information Availability Increase Purchase Intentions and Choice.pdf",
    cosUrl: "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1734407756859_2003d6bc-90ac-4591-8fa7-831dc302256f_The%20Cue-of-the-Cloud%20Effec%20-%20When%20Reminders%20of%20Online%20Information%20Availability%20Increase%20Purchase%20Intentions%20and%20Choice.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1734407757%3B1993607757%26q-key-time%3D1734407757%3B1993607757%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D5a4a01e0f14116f17c12029dba9eaf7aa38cc542",
  },*/
];

const FileList = ({ fileList = [], loading, onFileToggle, onDeleteFile, selectedFiles = [] }) => {

  // 合并传入的 fileList 和 sampleFiles，确保不会重复展示文件
  const combinedFiles = [...sampleFiles, ...fileList.filter(
    (file) => !sampleFiles.some((sample) => sample.fileId === file.fileId)
  )];

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
        ) : combinedFiles.length > 0 ? (
          combinedFiles.map((file, index) => (
          <div>
            <div key={index} className="pdf-item">
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
