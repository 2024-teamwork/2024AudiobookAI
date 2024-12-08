import React, { useState } from "react";
import TabNavigation from "./TabNavigation";
import Sidebar from "../sidebar/Sidebar"; // Import Sidebar
import AIPodcast from "../../AIPodcastSysPublisher/AIPodcast/AIPodcast";
import AIAudioBook from "../../AIPodcastSysPublisher/AIAudioBook/AIAudioBook";
import ProductDetails from "../../AIPodcastSysPublisher/ProductDetails/ProductDetails";
import AvatarGenerator from "../../AIPodcastSysPublisher/AIAvatorGenerator/AvatorGenerator";
import "./MainContentLayout.css";

const TABS = {
  AIPodcast: { label: "AI Podcast", component: AIPodcast },
  AIAudioBook: { label: "AI Audiobook", component: AIAudioBook },
  AvatarGenerator: { label: "Your AI Avatar", component: AvatarGenerator },
  ProductDetails: { label: "Audio Product", component: ProductDetails },
};

const MainContentLayout = () => {
  const [activeTab, setActiveTab] = useState("AIPodcast"); // Default to the first tab

  const ActiveComponent = TABS[activeTab].component;

  const [selectedFiles, setSelectedFiles] = useState([]); // State for selected files

  const handleFilesSelected = (files) => {
    setSelectedFiles(files); // Update selected files
    console.log(selectedFiles);
  };

  const handleSubmit = () => {
    const cosUrls = selectedFiles.map((file) => file.cosUrl); // Extract cosUrls for submission
    console.log("Submitting:", cosUrls);
    // Submit cosUrls as required
  };

  return (
    <div className="main-content-layout">
      {/* Tab Navigation at the top */}
      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="layout-body">
        {/* Sidebar on the left */}
        <div className="sidebar-area">
          {/* <Sidebar onFilesSelected={(files) => console.log(files)} /> */}
          <Sidebar onFilesSelected={handleFilesSelected} />
        </div>

        {/* Main content area */}
        <div className="content-area">
          <ActiveComponent selectedFiles={selectedFiles}
         />
        </div>
      </div>
    </div>
  );
};

export default MainContentLayout;
