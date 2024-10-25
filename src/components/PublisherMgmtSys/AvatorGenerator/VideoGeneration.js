import React, { useState, useEffect } from 'react';

const VideoGeneration = ({
  isGenerating,
  isGenerated,
  videoURL,
  onGenerate,
  onDownload,
}) => {
  const [showLoading, setShowLoading] = useState(false);

  // Handle the click to generate video and show loading screen
  const handleGenerateClick = () => {
    setShowLoading(true); // Show loading screen immediately
    onGenerate(); // Trigger the video generation logic passed as props
  };

  useEffect(() => {
    // Stop showing the loading screen if video is generated
    if (isGenerated) {
      setShowLoading(false);
    }
  }, [isGenerated]);

  if (showLoading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isGenerated) {
    return (
      <div className="confirmation-page">
        <p>Your AI video is generated successfully!</p>
        <video controls src={videoURL} style={{ width: '100%' }}></video>
        <button onClick={onDownload}>Download Video</button>
      </div>
    );
  }

  return (
    <button onClick={handleGenerateClick} className="submit-button">
      Generate Your AI Video
    </button>
  );
};

export default VideoGeneration;
