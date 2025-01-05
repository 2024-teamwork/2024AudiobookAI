import React, { useEffect, useState } from "react";
import "./AudioBookPlayer.css";
import microphoneIcon from '../../../../images/icon/microphone.png';

const subscriptionInfo = {
  planType: 'Free Plan',
  planTokenCount: 5000
};

const handleRegenerate =()=>{
};

const handleSave=()=> {
};

const handleShare=()=> {
};


const AudioBookPlayer = ({ jobId,audiobookText }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJobReady, setIsJobReady] = useState(false);
  console.log("jobId:" + jobId);

  const fetchAudioAndTranscript = async () => {
    setIsLoading(true);

    try {
      // Fetch the audio file
      const audioResponse = await fetch(
        `https://audioai.alphalio.cn/api/v1/jobs/download?task_id=${jobId}&result_type=envaudio`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3MzcwNjk2NDJ9.uKR7IA1j5n9i0xBlksTZMNPl-gnbu_3qyG6znRzE5Xc",
          },
        }
      );

      if (audioResponse.status === 400) {
        const errorDetails = await audioResponse.json();
        if (errorDetails.detail === "Job result not ready") {
          console.log("Audio job result not ready. Retrying...");
          setTimeout(fetchAudioAndTranscript, 5000); // Retry after 5 seconds
          return;
        }
        throw new Error(errorDetails.detail || "Error fetching audio file");
      }

      const audioBlob = await audioResponse.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      setIsJobReady(true);
    } catch (error) {
      console.error("Error fetching audio:", error);
      setIsLoading(true); // Keep the loading bar visible when an error occurs
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAudioAndTranscript();
  }, []);

  if (isLoading || !isJobReady) {
    return (
      <div className="loading-container">
        <div className="audiobook-intro-container">
          <h1>AI Audio Books</h1>
          <p>Your file has been submittted! We are producing your audiobook...</p>
        </div>
        <div className="loading-bar"></div>
        <button className="loading-button" disabled>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="audiobook-container">
      <div className="audiobook-header" style={{ position: 'relative', paddingBottom: '36px' }}>
        Your audio has been successfully generated. You may further customize it or simply download it for use.
        <img src={microphoneIcon} className="microphoneIcon" />
      </div>
      <div className="audiobook-output-display">
        <div className="audio-player">
          {audioUrl && (
            <audio controls className="audio-element">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        <div className="audiobook-text">
            {audiobookText}
        </div>
      </div>
      <div className="audiobook-actions">
        <button onClick={handleRegenerate} className="action-button">Regenerate</button>
        <button onClick={handleSave} className="action-button">Save</button>
        <button onClick={handleShare} className="action-button">Share</button>
      </div>
      <p class="subscription-info">
        <span class="plan-type">{subscriptionInfo.planType}</span>
        <span class="token-count">{subscriptionInfo.planTokenCount}</span>
        <span class="tokens-left">tokens left</span>
      </p>
    </div>
  );  
};

export default AudioBookPlayer;
