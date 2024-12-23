import React, { useState, useEffect } from "react";
import "./PodcastPlayer.css";

const PodcastPlayer = ({ jobId }) => {
  // Blob text
  const blobData = `
    ID3#TSSELavf58.76.100���Info �K...
  `;

  const [audioBlobUrl, setAudioBlobUrl] = useState(null);

  useEffect(() => {
    // Convert the blobData to a Blob and create a URL
    const blob = new Blob([blobData], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    setAudioBlobUrl(url);

    // Cleanup blob URL on component unmount
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [blobData]);

  const transcript = `
    Voice 1: Welcome back to our show, everyone! I'm Alex, your host for today's episode where we're diving into an exciting and increasingly popular trend — secondhand shopping!
    Voice 2: Hey there, Alex! I'm Amy, and I'm thrilled to be joining you for this discussion. I've noticed a significant shift in recent years towards embracing secondhand items. It's fascinating to see how consumer behavior is evolving.
    Voice 1: Absolutely, Jamie! It's remarkable how secondhand shopping has gone from being seen as a necessity for some to a stylish, eco-friendly choice for many. So, let's start with the basics. Why do you think secondhand shopping has become more popular than ever?
    Voice 2: Well, I think there are several factors at play. Firstly, the economic aspect can't be ignored. In today's world, where costs are continually rising, finding quality items at affordable prices is a huge draw.
  `;

  const [showTranscript, setShowTranscript] = useState(true);

  const handleRegenerate = () => {
    alert("Regenerate functionality is not implemented yet.");
  };

  const handleSave = () => {
    alert("Save functionality is not implemented yet.");
  };

  const handleShare = () => {
    alert("Share functionality is not implemented yet.");
  };

  return (
    <div className="podcast-player-container">
      <div className="status-message">
        <p>Your audio has been successfully generated. You may further customize it or simply download it for use.</p>
      </div>
      <div className="audio-section">
        {audioBlobUrl ? (
          <audio controls>
            <source src={audioBlobUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p>Loading audio...</p>
        )}
      </div>
      <div className="transcript-section">
        {showTranscript && <p className="transcript-text">{transcript}</p>}
      </div>
      <div className="action-buttons">
        <button onClick={handleRegenerate} className="button regenerate">
          Regenerate
        </button>
        <button onClick={handleSave} className="button save">
          Save
        </button>
        <button onClick={handleShare} className="button share">
          Share
        </button>
      </div>
    </div>
  );
};

export default PodcastPlayer;
