import React, { useState } from 'react';
import './MyAudioProduct.css';
import Navigation from "../../Layout/navigation/Navigation";

import playIcon from '../../../images/icon/play.png';
import binIcon from '../../../images/icon/bin.png';
import downloadIcon from '../../../images/icon/download.png';
import plusIcon from '../../../images/icon/plus.png';

import testAudio1 from '../../../audio/testAudio1.mp3';
import testAudio2 from '../../../audio/testAudio2.mp3';
import testAudio3 from '../../../audio/testAudio3.mp3';
import testAudio4 from '../../../audio/testAudio4.mp3';
import testAudio5 from '../../../audio/testAudio5.mp3';
import testAudio6 from '../../../audio/testAudio6.mp3';
import testAudio7 from '../../../audio/testAudio7.mp3';
import testAudio8 from '../../../audio/testAudio8.mp3';
import testAudio9 from '../../../audio/testAudio9.mp3';


const ProductPage = () => {
  const fakeAudioData = [
    {
      audioId: '1',
      userId: '1432',
      title: 'Apple',
      date: '2024-12-01',
      author: 'Mary Shahi',
      type: 'Podcast',
      source: testAudio1,
    },
    {
      audioId: '2',
      userId: '1432',
      title: 'Pear',
      date: '2024-11-20',
      author: 'Jason Lin',
      type: 'Music',
      source: testAudio2,
    },
    {
      audioId: '3',
      userId: '1432',
      title: 'Banana',
      date: '2024-10-15',
      author: 'Alice Acker',
      type: 'Audiobook',
      source: testAudio3,
    },
    {
      audioId: '4',
      userId: '1432',
      title: 'Grape',
      date: '2024-09-05',
      author: 'Chris Yoon',
      type: 'Podcast',
      source: testAudio4,
    },
    {
      audioId: '5',
      userId: '1432',
      title: 'Orange',
      date: '2024-08-18',
      author: 'Natalie King',
      type: 'Music',
      source: testAudio5,
    },
    {
      audioId: '6',
      userId: '1432',
      title: 'Pineapple',
      date: '2024-07-10',
      author: 'Victor Zhou',
      type: 'Audiobook',
      source: testAudio6,
    },
    {
      audioId: '7',
      userId: '1432',
      title: 'Mango',
      date: '2024-06-22',
      author: 'Sophia Lee',
      type: 'Podcast',
      source: testAudio7,
    },
    {
      audioId: '8',
      userId: '1432',
      title: 'Strawberry',
      date: '2024-05-13',
      author: 'Daniel Chen',
      type: 'Music',
      source: testAudio8,
    },
    {
      audioId: '9',
      userId: '1432',
      title: 'Blueberry',
      date: '2024-04-02',
      author: 'Ella Park',
      type: 'Audiobook',
      source: testAudio9,
    },
  ];
  

  const [searchTerm, setSearchTerm] = useState('');
  const [audioData] = useState(fakeAudioData);

  const filteredData = audioData.filter(
    (audio) =>
      audio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audio.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlay = (source) => {
    const audio = new Audio(source);
    audio.play();
  };

  const handleDownload = (source, title) => {
    const link = document.createElement('a');
    link.href = source;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (source, title, audioId, userId) => {
    alert("Uncomplete Function\nUser wants to delete audio",title," with audioId ",audioId);
    console.log("delete action: {\nsource: ",source,"\ntitle:", title,"\naudioId: ",audioId,"\nuserId: ",userId,"}");
  }

  return (
    <div>

        <Navigation/>
  
      <div className="product-page-container">
        {/* Header Section */}
        <header className="product-page-header">
          <h1 className="product-page-title">My Audio Products</h1>
          <button
            onClick={() => (window.location.href = '/')}
            className="new-project-button"
          >
            <img src={plusIcon} alt="New Project" className="plus-icon" />
            New Project
          </button>
        </header>

        {/* Search Input */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by audio name or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Audio Project Cards */}
        <div className="audio-cards-grid">
          {filteredData
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((project) => (
              <div key={project.id} className="audio-card">
                <div className="audio-card-title">{project.title}</div>
                <div className="audio-card-date">{project.date}</div>
                <hr className="audio-card-divider" />
                <div className="audio-card-info">
                  <span className="audio-type">{project.type}</span>
                  <span className="separator">•</span>
                  <span className="audio-author">{project.author}</span>
                </div>
                <div className="audio-card-actions">
                  <div
                    className="audio-icon-wrapper"
                    onClick={() => handlePlay(project.source)}
                  >
                    <img src={playIcon} alt="Play" className="audio-card-icon" />
                  </div>
                  <div
                    className="audio-icon-wrapper"
                    onClick={() => handleDownload(project.source, project.title)}
                  >
                    <img
                      src={downloadIcon}
                      alt="Download"
                      className="audio-card-icon"
                    />
                  </div>
                  <div
                    className="audio-icon-wrapper"
                    onClick={() => handleDelete(project.source, project.title, project.audioId, project.userId)}
                  >
                    <img src={binIcon} alt="Delete" className="audio-card-icon" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
