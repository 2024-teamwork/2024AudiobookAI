import React from 'react';

const VideoRecorder = ({
  recording,
  videoRef,
  onStartRecording,
  onStopRecording,
  isGenerating,
  isDisabled, // New prop to disable buttons
}) => {
  return (
    <div className="video-recorder">
      <h2>Record Video</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: '100%', height: 'auto' }}
      ></video>
      <div className="record-buttons">
        <button
          onClick={onStartRecording}
          disabled={isGenerating || recording || isDisabled} // Disable based on new state
        >
          Start Recording
        </button>
        <button
          onClick={onStopRecording}
          disabled={isGenerating || !recording || isDisabled} // Disable based on new state
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default VideoRecorder;
