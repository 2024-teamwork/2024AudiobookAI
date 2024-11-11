import React, { useState, useRef, useEffect } from 'react';
import './VideoUploader.css';

const VideoUploader = ({
  isGenerating,
  isDisabled,
  setVideoFile,
  videoFile,
  recordedChunks,
  setRecordedChunks,
  setVideoURL,
}) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'record'
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  // Start recording functionality
  const handleStartRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(mediaStream); // Store the stream state

      // Ensure videoRef is available before trying to set srcObject
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  // Stop recording functionality
  const handleStopRecording = () => {
    if (mediaRecorder && stream) {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  // Remove video functionality
  const handleRemoveVideo = () => {
    setVideoFile(null);
    setRecordedChunks([]);
  };

  // Switch between upload and record tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Automatically reset video if new video is uploaded or recording is stopped
    if (videoRef.current && (videoFile || recordedChunks.length > 0)) {
      videoRef.current.currentTime = 0; // Reset video to the beginning
    }
  }, [videoFile, recordedChunks]);

  return (
    <div className="video-uploader">
      <h2>Upload or Record Video</h2>

      {/* Tabbar navigation */}
      <div className="tabbar">
        <button
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => handleTabChange('upload')}
          disabled={isGenerating || isDisabled}
        >
          Upload Video
        </button>
        <button
          className={activeTab === 'record' ? 'active' : ''}
          onClick={() => handleTabChange('record')}
          disabled={isGenerating || isDisabled}
        >
          Record Video
        </button>
      </div>

      {/* Display the selected tab */}
      {activeTab === 'upload' && (
        <div className="upload-section">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={isDisabled || isGenerating || recording}
          />
          {videoFile && (
            <div className="video-preview">
              <video controls ref={videoRef} width="100%" height="350px"src={URL.createObjectURL(videoFile)} />
              <button onClick={handleRemoveVideo} disabled={isDisabled || isGenerating}>Remove Video</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'record' && (
        <div className="record-section">
          <div className="self-view">
            {/* Display user's video feed while recording */}
            <video
              ref={videoRef}
              autoPlay
              muted
              width="100%"
              style={{ border: '1px solid black', marginBottom: '10px' }}
            />
          </div>
          <div className="record-actions">
            {/* Start and Stop buttons */}
            <button
              onClick={handleStartRecording}
              disabled={isDisabled || isGenerating || recording || videoFile}
            >
              Start Recording
            </button>
            <button
              onClick={handleStopRecording}
              disabled={isDisabled || isGenerating || !recording}
            >
              Stop Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
