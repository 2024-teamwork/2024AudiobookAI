// AvatarGenerator.js
import React, { useState, useRef } from 'react';
import Modal from './Modal';
import PhotoUpload from './PhotoUpload';
import VideoUploader from './VideoUploader'; // Import VideoUploader
import VideoGeneration from './VideoGeneration';
import './AvatarGenerator.css';

const AvatarGenerator = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    resetState();
  };

  const resetState = () => {
    setImageFile(null);
    setImageName('');
    setRecordedChunks([]);
    setIsGenerated(false);
    setVideoURL('');
    setIsDisabled(false);
    setVideoFile(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
    }
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
              isDisabled={isDisabled}
            />
            <VideoUploader
              isGenerating={isGenerating}
              isDisabled={isDisabled}
              setVideoFile={setVideoFile}
              videoFile={videoFile}
              recordedChunks={recordedChunks}
              setRecordedChunks={setRecordedChunks}
              isGeneratingVideo={isGeneratingVideo}
              setIsGeneratingVideo={setIsGeneratingVideo}
              setIsGenerated={setIsGenerated}
              setVideoURL={setVideoURL}
            />
          </div>
          <VideoGeneration
            isGenerating={isGenerating}
            isGenerated={isGenerated}
            videoURL={videoURL}
            onGenerate={() => {}}
            onDownload={() => {}}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AvatarGenerator;
