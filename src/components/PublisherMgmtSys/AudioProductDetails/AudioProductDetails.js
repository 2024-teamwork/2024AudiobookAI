import React, { useState } from 'react';
import './AudioProductDetails.css';

const AudioProductDetails = () => {
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

  const handleSave = () => {
    console.log('Saved details:', details);
    console.log('Uploaded pictures:', pictures);
    if (audio) {
      console.log('Uploaded audio:', audio);
    }
  };

  return (
    <div className="content-card audio-product-details">
      <h2>Audio Product Details</h2>
      <div className="details">
        <label>
          <strong>Upload Pictures:</strong>
          <input type="file" multiple accept="image/*" onChange={handleFileUpload} />
        </label>
        <div className="picture-previews">
          {pictures.map((src, index) => (
            <img key={index} src={src} alt="Uploaded Preview" className="picture-preview" />
          ))}
        </div>

        <label>
          <strong>Upload Audio:</strong>
          <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        </label>
        {audio && (
          <div className="audio-preview">
            <audio controls src={audio}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <label>
          <strong>Name:</strong>
          <input type="text" name="property" value={details.property} onChange={handleChange} />
        </label>
        <label>
          <strong>Price:</strong>
          <input type="number" name="price" value={details.price} onChange={handleChange} />
        </label>
        <label>
          <strong>Date:</strong>
          <input type="date" name="date" value={details.date} onChange={handleChange} />
        </label>
        <label>
          <strong>URL:</strong>
          <input type="url" name="url" value={details.url} onChange={handleChange} />
        </label>
        <label>
          <strong>ISBN-10:</strong>
          <input type="text" name="isbn10" value={details.isbn10} onChange={handleChange} />
        </label>
        <label>
          <strong>ISBN-13:</strong>
          <input type="text" name="isbn13" value={details.isbn13} onChange={handleChange} />
        </label>
        <label>
          <strong>Publisher:</strong>
          <input type="text" name="publisher" value={details.publisher} onChange={handleChange} />
        </label>
        <label>
          <strong>Genre:</strong>
          <input type="text" name="genre" value={details.genre} onChange={handleChange} />
        </label>
        <label>
          <strong>Description:</strong>
          <textarea name="description" value={details.description} onChange={handleChange} />
        </label>        
      </div>
      
      <button className="action-button" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default AudioProductDetails;
