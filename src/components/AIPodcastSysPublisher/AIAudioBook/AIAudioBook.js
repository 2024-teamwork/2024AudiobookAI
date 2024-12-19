import React, { useState } from "react";
import { FaPlay, FaPause, FaFileUpload } from "react-icons/fa";
import ReactPlayer from "react-player";
import "./AIAudioBook.css";

const AIAudioBook = ({ selectedFiles = [] }) => {
  const [status, setStatus] = useState("idle"); // idle, loading, generated
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerateAudio = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file!");
      return;
    }

    setStatus("loading");

    const payload = {
      text_url: {
        fileName: selectedFiles[0].fileName,
        cosUrl: selectedFiles[0].cosUrl,
      },
    };

    try {
      await fetch("https://audioai.alphalio.cn/api/v1/jobs/submit/env_sound", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3MzcwNjk2NDJ9.uKR7IA1j5n9i0xBlksTZMNPl-gnbu_3qyG6znRzE5Xc",
        },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });

      setStatus("generated");
    } catch (error) {
      console.error(error);
      alert("Error generating audio");
      setStatus("idle");
    }
  };

  return (
    <div className="audio-ai-generator">
      <h2>AI Audio Book Generator</h2>

      {/* File Selection */}
      <div className="form-group">
        <label htmlFor="fileInput" className="file-label">
          <FaFileUpload /> Select Files
        </label>
        {selectedFiles.length > 0 && (
          <ul className="selected-files-list">
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.fileName}</li>
            ))}
          </ul>
        )}
      </div>

      {/* State Management */}
      {status === "idle" && (
        <button className="generate-button" onClick={handleGenerateAudio}>
          Submit Generating Audio
        </button>
      )}
      {status === "loading" && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Generating Audio...</p>
        </div>
      )}
      {status === "generated" && (
        <>
          <AudioPlayer audioSrc="https://www.youtube.com/watch?v=Oud9Gzy89dw" />
          <DownloadButton downloadUrl="https://example.com/sample-audio.mp3" />
        </>
      )}
    </div>
  );
};

// AudioPlayer Component
const AudioPlayer = ({ audioSrc }) => (
  <div className="audio-player">
    <ReactPlayer url={audioSrc} controls width="100%" height="60px" />
  </div>
);

// DownloadButton Component
const DownloadButton = ({ downloadUrl }) => (
  <a href={downloadUrl} download className="download-button">
    Download Audio
  </a>
);

export default AIAudioBook;
