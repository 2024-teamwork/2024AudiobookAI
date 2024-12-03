import React from 'react';
import AIPodcast from '../../AIPodcastSysPublisher/AIPodcast/AIPodcast';
import PodcastPlayer from '../../AIPodcastSysPublisher/AIPodcast/PodcastPlayer/PodcastPlayer';

const PublisherAIPodcastLayout = () => {
  return (
    <div className="content-wrapper">
      <div className="content-section">
          <AIPodcast />
          {/* <PodcastPlayer /> */}
      </div>
      {/* <div className="content-section">
        <AudioProductDetails />
      </div> */}
    </div>
  );
};

export default PublisherAIPodcastLayout;
