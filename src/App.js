import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import EditContent from './components/PublisherMgmtSys/EditContent/EditContent';
import AudioProductDetails from './components/PublisherMgmtSys/AudioProductDetails/AudioProductDetails';
import MainContentLayout from './components/Layout/mainContentLayout/MainContentLayout';
import SubscriptionPage from './components/PublisherMgmtSys/SubscriptionPage/SubscriptionPage';
import UserCenter from './components/PublisherMgmtSys/UserCenter/UserCenter';
import LoginPage from './components/LoginRegister/Login/LoginPage';
import RegisterPage from './components/LoginRegister/Register/RegisterPage';
import AIPodcast from './components/AIPodcastSysPublisher/AIPodcast/AIPodcast';
import PublisherAIPodcastLayout from './components/Layout/PublisherAIPodcastLayout/PublisherAIPodcastLayout';
import PodcastPlayer from './components/AIPodcastSysPublisher/AIPodcast/PodcastPlayer/PodcastPlayer';
import AboutPage from './components/PublisherMgmtSys/AboutPage/AboutPage'; 

const App = () => {
  const [pdfFiles, setPdfFiles] = useState([
    { name: 'Getting Started with NotebookLM', selected: false },
    { name: 'NotebookLM Features', selected: false },
    { name: 'NotebookLM Troubleshooting', selected: false },
  ]);

  const toggleSelect = (index) => {
    const updatedFiles = pdfFiles.map((pdf, i) =>
      i === index ? { ...pdf, selected: !pdf.selected } : pdf
    );
    setPdfFiles(updatedFiles);
  };

  const selectAll = (isSelected) => {
    const updatedFiles = pdfFiles.map((pdf) => ({
      ...pdf,
      selected: isSelected,
    }));
    setPdfFiles(updatedFiles);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({ name: file.name, selected: false }));
    setPdfFiles((prevFiles) => {
      // Limit to a maximum of 10 files
      const totalFiles = prevFiles.length + newFiles.length;
      return [...prevFiles, ...newFiles.slice(0, Math.max(0, 10 - prevFiles.length))];
    });
  };

  const deleteFile = (index) => {
    setPdfFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/customer-view"
          element={
            <Layout
              pdfFiles={pdfFiles}
              toggleSelect={toggleSelect}
              selectAll={selectAll}
              handleFileUpload={handleFileUpload}
              deleteFile={deleteFile} // Pass delete function to Layout
            >
              <MainContentLayout />
            </Layout>
          }
        />

        {/* Route for other Pages */}
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/user-center" element={<UserCenter />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/podcast" element={<AIPodcast />} />
        <Route path="/about" element={<AboutPage />} /> 

        <Route
          path="/"
          element={
            <Layout
              pdfFiles={pdfFiles}
              toggleSelect={toggleSelect}
              selectAll={selectAll}
              handleFileUpload={handleFileUpload}
              deleteFile={deleteFile} // Pass delete function to Layout
            >
              <PublisherAIPodcastLayout />
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
