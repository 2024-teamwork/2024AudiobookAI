import React from 'react';
import EditContent from '../../PublisherMgmtSys/EditContent/EditContent';
import AudioProductDetails from '../../PublisherMgmtSys/AudioProductDetails/AudioProductDetails';
import AudioAIGenerator from '../../PublisherMgmtSys/AudioAIGenerator/AudioAIGenerator';
import './MainContentLayout.css';

const MainContentLayout = () => {
  return (
    <div className="content-wrapper">
      <div className="content-section">
        <EditContent />
        <AudioAIGenerator />
      </div>
      <div className="content-section">
        <AudioProductDetails />
      </div>
    </div>
  );
};

export default MainContentLayout;
