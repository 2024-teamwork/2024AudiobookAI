import React, { useState } from "react";
import TabNavigation from "./TabNavigation";
import AIPodcast from "../../AIPodcastSysPublisher/AIPodcast/AIPodcast";
import AIAudioBook from "../../AIPodcastSysPublisher/AIAudioBook/AIAudioBook"
import ProductDetails from "../../AIPodcastSysPublisher/ProductDetails/ProductDetails"
import "./MainContentLayout.css"

const TABS = {
  AIPodcast: { label: "AI Podcast", component: AIPodcast },
  AIAudioBook: { label: "AI Audiobook", component: AIAudioBook },
  ProductDetails: { label: "Product Details", component: ProductDetails },
};

const MainContentLayout = ({ selectedFiles }) => {
  const [activeTab, setActiveTab] = useState("AIPodcast"); // Default to the first tab

  const ActiveComponent = TABS[activeTab].component;

  return (
    <div className="main-content-layout">
      {/* Reusable Tab Navigation */}
      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Render the active tab's component */}
      <div className="content-area">
        <ActiveComponent selectedFiles={selectedFiles} />
      </div>
    </div>
  );
};

export default MainContentLayout;
