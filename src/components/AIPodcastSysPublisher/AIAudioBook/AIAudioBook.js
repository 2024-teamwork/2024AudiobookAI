import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import './AIAudioBook.css';

const AIAudioBook = () => {
  const [status, setStatus] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 60; // Assume a 60-second audio for demonstration

  const handleGenerateAudio = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('generated');
      setProgress(0);
    }, 3000);
  };

  return (
    <div className="audio-ai-generator bordered">
      <h2>AI Audio Book Generator</h2>

      {status === 'idle' && <IdleState onGenerate={handleGenerateAudio} />}
      {status === 'loading' && <LoadingState />}
      {status === 'generated' && (
        <>
          <AudioPlayer
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            progress={progress}
            setProgress={setProgress}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
          />
          <DownloadButton />
        </>
      )}
    </div>
  );
};

// Subcomponent for Idle State
const IdleState = ({ onGenerate }) => (
  <button className="generate-button" onClick={onGenerate}>
    Generate AI Audio
  </button>
);

// Subcomponent for Loading State
const LoadingState = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p className="loading-text">Generating Audio...</p>
  </div>
);

// Subcomponent for Audio Player
const AudioPlayer = ({
  isPlaying,
  setIsPlaying,
  progress,
  setProgress,
  currentTime,
  setCurrentTime,
  duration
}) => {
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime < duration) {
            setProgress(((prevTime + 1) / duration) * 100);
            return prevTime + 1;
          } else {
            setIsPlaying(false); // Stop when the duration ends
            return prevTime;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration, setCurrentTime, setProgress, setIsPlaying]);

  const toggleAudioPlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="audio-player">
      <button className="play-pause-button" onClick={toggleAudioPlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div className="progress-container">
        <span className="timestamp">{formatTime(currentTime)}</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="timestamp">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

// Subcomponent for Download Button
const DownloadButton = () => {
  const handleDownload = () => {
    // Placeholder for download logic
    alert('Downloading audio file...');
  };
  return (
    <button className="download-button" onClick={handleDownload}>
      Download Audio
    </button>
  );
};

// Helper function to format time
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default AIAudioBook;
