import React, { useState } from 'react';
import { FaPlay, FaPause, FaFileUpload } from 'react-icons/fa';
import './AIAudioBook.css';

const AIAudioBook = ({ selectedFiles = [] }) => {
  const [status, setStatus] = useState('idle'); // idle, loading, generated
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerateAudio = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file!");
      return;
    }

    setStatus('loading');

    const payload = {
      // text: "场景描述文本",
      text_url: {
        fileName: selectedFiles[0].fileName,
        cosUrl: selectedFiles[0].cosUrl, // Replace with your logic
      },
    };
    console.log(payload);

    try {
      const response = await fetch('https://audioai.alphalio.cn/api/v1/jobs/submit/env_sound', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3MzcwNjk2NDJ9.uKR7IA1j5n9i0xBlksTZMNPl-gnbu_3qyG6znRzE5Xc' // Add the Bearer Token here
        },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });

      if (!response.ok) throw new Error('Failed to generate audio');

      setStatus('generated');
    } catch (error) {
      console.error(error);
      alert('Error generating audio');
      setStatus('idle');
    }
  };

  return (
    <div className="audio-ai-generator bordered">
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

      {/* Submit Button */}
      {status === 'idle' && (
        <button className="submit-button" onClick={handleGenerateAudio}>
          Submit Generating Audio
        </button>
      )}

      {/* Loading State */}
      {status === 'loading' && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Generating Audio...</p>
        </div>
      )}

      {/* Generated State */}
      {status === 'generated' && (
        <div>
          <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <DownloadButton />
        </div>
      )}
    </div>
  );
};

// Audio Player Component
const AudioPlayer = ({ isPlaying, setIsPlaying }) => {
  return (
    <div className="audio-player">
      <button onClick={() => setIsPlaying(!isPlaying)} className="play-pause-button">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <p>Audio Playback (Mock)</p>
    </div>
  );
};

// Download Button Component
const DownloadButton = () => (
  <button
    className="download-button"
    onClick={() => alert('Downloading audio file...')}
  >
    Download Audio
  </button>
);

export default AIAudioBook;
