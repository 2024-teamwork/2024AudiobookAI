import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Navigation from './navigation/Navigation';
import Footer from './footer/Footer';
import './Layout.css';

const Layout = ({ children, pdfFiles, toggleSelect, selectAll, handleFileUpload, deleteFile }) => {
  return (
    <div className="app-container">
      <Sidebar
        pdfFiles={pdfFiles}
        toggleSelect={toggleSelect}
        selectAll={selectAll}
        handleFileUpload={handleFileUpload}
        deleteFile={deleteFile} // Pass delete function to Sidebar
      />
      <div className="main-content">
        <Navigation />
        <div className="content-area">
          {children}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
