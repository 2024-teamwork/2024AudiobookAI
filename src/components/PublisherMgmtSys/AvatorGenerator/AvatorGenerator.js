import React, { useState, useRef } from 'react';
import Modal from './Modal';
import PhotoUpload from './PhotoUpload';
import VideoRecorder from './VideoRecorder';
import VideoGeneration from './VideoGeneration';
import './AvatarGenerator.css'; // Importing CSS for styling

const AvatarGenerator = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [isDisabled, setIsDisabled] = useState(false); // New state to disable components

  const videoRef = useRef(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setImageFile(null);
    setImageName('');
    setRecordedChunks([]);
    setIsGenerated(false);
    setVideoURL('');
    setIsDisabled(false); // Reset the disabled state when closing the modal
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
    }
  };

  const handleStartRecording = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(mediaStream);
    videoRef.current.srcObject = mediaStream;

    const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => [...prev, e.data]);
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  const handleGenerateVideo = () => {
    setIsDisabled(true); // Disable the components after clicking the button
    setIsGenerating(true);
    setTimeout(() => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(blob);
      setVideoURL(videoURL);
      setIsGenerating(false);
      setIsGenerated(true);
    }, 3000);
  };

  const handleDownloadVideo = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AI_generated_video.webm';
    a.click();
  };

  return (
    <div className="avatar-generator">
      <button onClick={handleOpenModal}>Generate Your Avatar</button>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <div className="modal-content">
          <div className="left-right-content">
            <PhotoUpload
              imageName={imageName}
              imageFile={imageFile}
              onImageUpload={handleImageUpload}
              isGenerating={isGenerating}
              isDisabled={isDisabled} // Pass disabled state to PhotoUpload
            />
            <VideoRecorder
              recording={recording}
              videoRef={videoRef}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              isGenerating={isGenerating}
              isDisabled={isDisabled} // Pass disabled state to VideoRecorder
            />
          </div>
          <VideoGeneration
            isGenerating={isGenerating}
            isGenerated={isGenerated}
            videoURL={videoURL}
            onGenerate={handleGenerateVideo}
            onDownload={handleDownloadVideo}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AvatarGenerator;
