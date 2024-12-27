import React, { useState } from 'react';
import './ProductDetails.css';

const ProductDetails = () => {
  const [details, setDetails] = useState({
    property: 'Value',
    price: 20,
    date: '2024-10-12',
    url: 'https://example.com',
    isbn10: '1234567890',
    isbn13: '123-4567890123',
    publisher: '',
    genre: '',
    description: ''
  });

  const [pictures, setPictures] = useState([]);
  const [audio, setAudio] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPictures((prevPictures) => [...prevPictures, ...imageUrls]);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(URL.createObjectURL(file));
    }
  };

  const removeImage = (index) => {
    setPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
  };

  const handleExpandImage = (index) => {
    setExpandedIndex(index);
  };

  const handleCloseExpanded = () => {
    setExpandedIndex(null);
  };

  const handleRemoveCurrentImage = () => {
    if (expandedIndex !== null) {
      const newPictures = pictures.filter((_, i) => i !== expandedIndex);
      setPictures(newPictures);
      setExpandedIndex(newPictures.length > 0 ? (expandedIndex % newPictures.length) : null);
    }
  };

  const handleSave = () => {
    console.log('Saved details:', details);
    console.log('Uploaded pictures:', pictures);
    if (audio) {
      console.log('Uploaded audio:', audio);
    }
  };

  return (
    <div className="product-details-container">
      <h2>Audio Product Details</h2>
      <div className="details">
      <div className="image-upload-container">
        <strong className="upload-text">Upload Pictures: </strong>
        
          <label htmlFor="image-upload" className="custom-file-upload-small">
            Select Images
          </label>

          <input
            id="image-upload"
            type="file"
            multiple accept="image/*" 
            className="image-upload"
            onChange={handleFileUpload} 
          />
        
        <div className="picture-previews">
          {pictures.map((src, index) => (
            <div key={index} className="picture-preview-container">
              <img
                src={src}
                alt="Uploaded Preview"
                className="picture-preview"
                onClick={() => handleExpandImage(index)}
              />
              <button className="remove-image" onClick={() => removeImage(index)}>
                &times;
              </button>
            </div>
          ))}
        </div>

        </div>

        {expandedIndex !== null && (
          <div className="expanded-view">
            <button className="close-expanded" onClick={handleCloseExpanded}>&times;</button>
            <img src={pictures[expandedIndex]} alt="Expanded Preview" className="expanded-image" />
            <button className="remove-expanded" onClick={handleRemoveCurrentImage}>Remove Image</button>
            {expandedIndex > 0 && (
              <button className="prev-image" onClick={() => setExpandedIndex(expandedIndex - 1)}>&lt;</button>
            )}
            {expandedIndex < pictures.length - 1 && (
              <button className="next-image" onClick={() => setExpandedIndex(expandedIndex + 1)}>&gt;</button>
            )}
          </div>
        )}
        

        <div className="audio-upload-container">
          <strong className='upload-text'>Upload Audio: </strong>
          <label htmlFor="audio-upload" className="custom-file-upload-small">
              Upload / Reupload Audio
            </label>
            <input
              id="audio-upload"
              type="file"
              multiple accept="audio/*" 
              className="audio-upload"
              onChange={handleAudioUpload} 
            />
          {audio && (
            <div className="audio-preview">
              <audio controls src={audio}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>


        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={details.description}
            onChange={handleChange}
            style={{ height: "80px" }}
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input type="text" name="property" value={details.property} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={details.price} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={details.date} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>URL</label>
          <input type="url" name="url" value={details.url} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>ISBN-10</label>
          <input type="text" name="isbn10" value={details.isbn10} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>ISBN-13</label>
          <input type="text" name="isbn13" value={details.isbn13} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Publisher</label>
          <input type="text" name="publisher" value={details.publisher} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input type="text" name="genre" value={details.genre} onChange={handleChange} />
        </div>
      </div>

      <button className="action-button" onClick={handleSave}>Save Changes</button>

      </div>
    );
  };

  export default ProductDetails;