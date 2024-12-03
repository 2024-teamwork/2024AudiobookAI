import React, { useState } from 'react';
import './PhotoUpload.css';

const PhotoUpload = ({ imageName, imageFile, onImageUpload, isGenerating, isDisabled }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // State for expanded image

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    if (onImageUpload) {
      onImageUpload(event); // Ensure your parent component handler is called too
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
  };

  const handleExpandImage = (index) => {
    setExpandedIndex(index); // Set the image to expand
  };

  const handleCloseExpanded = () => {
    setExpandedIndex(null); // Close expanded view
  };

  const handlePrevImage = () => {
    setExpandedIndex((prevIndex) => (prevIndex === 0 ? uploadedFiles.length - 1 : prevIndex - 1)); // Go to previous image
  };

  const handleNextImage = () => {
    setExpandedIndex((prevIndex) => (prevIndex === uploadedFiles.length - 1 ? 0 : prevIndex + 1)); // Go to next image
  };

  return (
    <div className="image-upload-container_avatar">
      <h2 className="upload-text">Upload Photo</h2>
      <div className="upload-actions">
        <label htmlFor="image-upload" className="custom-file-upload-small">
          Choose Files
        </label>
        <input
          id="image-upload"
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple // Allow multiple file selection
          onChange={handleImageUpload}
          disabled={isGenerating || isDisabled}
          className="image-upload"
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="picture-previews">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="picture-preview-container" onClick={() => handleExpandImage(index)}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="picture-preview"
              />
              <button className="remove-image" onClick={(e) => { e.stopPropagation(); handleRemoveFile(file); }}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Expanded Image View */}
      {expandedIndex !== null && (
        <div className="expanded-view">
          <button className="close-expanded" onClick={handleCloseExpanded}>&times;</button>
          <img
            src={URL.createObjectURL(uploadedFiles[expandedIndex])}
            alt={`Expanded Preview ${expandedIndex}`}
            className="expanded-image"
          />
          <button className="prev-image" onClick={handlePrevImage}>&lt;</button>
          <button className="next-image" onClick={handleNextImage}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
