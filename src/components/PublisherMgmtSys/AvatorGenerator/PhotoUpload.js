import React from 'react';

const PhotoUpload = ({ imageName, imageFile, onImageUpload, isGenerating, isDisabled }) => {
  return (
    <div className="photo-upload">
      <h2>Upload Photo</h2>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={onImageUpload}
        disabled={isGenerating || isDisabled} // Disable input based on new state
      />
      {imageName && <p>Uploaded: {imageName}</p>}
      {imageFile && (
        <div className="photo-preview">
          <img src={URL.createObjectURL(imageFile)} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
