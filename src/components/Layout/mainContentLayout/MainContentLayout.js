import React from 'react';
import EditContent from '../../PublisherMgmtSys/EditContent/EditContent';
import AudioProductDetails from '../../PublisherMgmtSys/AudioProductDetails/AudioProductDetails';
import AudioAIGenerator from '../../PublisherMgmtSys/AudioAIGenerator/AudioAIGenerator';
import './MainContentLayout.css';
import PodcastAIGenerator from '../../PublisherMgmtSys/PodcastAIGenerator/PodcastAIGenerator';
import AvatorGenerator from '../../PublisherMgmtSys/AvatorGenerator/AvatorGenerator';
import SummaryGenerator from '../../PublisherMgmtSys/SummaryGenerator/SummaryGenerator';

const MainContentLayout = () => {
  return (
    <div className="content-wrapper">
      <div className="content-section">
        <AvatorGenerator />
        <AudioAIGenerator />
        <PodcastAIGenerator />
        <SummaryGenerator />
        <AudioProductDetails />

      </div>
      {/* <div className="content-section">
        <AudioProductDetails />
      </div> */}
    </div>
  );
};

export default MainContentLayout;
