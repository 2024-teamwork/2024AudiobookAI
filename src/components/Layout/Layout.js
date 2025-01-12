import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navigation from "./navigation/Navigation";
import MainContentLayout from "./mainContentLayout2/MainContentLayout"
import AIPodcast from "../AIPodcastSysPublisher/AIPodcast/AIPodcast"
import Footer from "./footer/Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // State for selected files

  const handleFilesSelected = (files) => {
    setSelectedFiles(files); // Update selected files
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Navigation />

        {/* MainContentLayout handles the dynamic content switching */}
        {/* <MainContentLayout selectedFiles={selectedFiles} /> */}
        <MainContentLayout />


      </div>
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
