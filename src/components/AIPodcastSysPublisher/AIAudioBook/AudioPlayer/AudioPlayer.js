import React, { useEffect, useState } from "react";
import "./AudioBookPlayer.css";
import microphoneIcon from "../../../../images/icon/microphone.png";

const subscriptionInfo = {
  planType: "Free Plan",
  planTokenCount: 5000,
};

const handleRegenerate = () => {
  console.log("Regenerating...");
};

const handleShare = () => {
  console.log("Sharing...");
};

const AudioBookPlayer = ({ jobId, audiobookText }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJobReady, setIsJobReady] = useState(false);
  const [progress, setProgress] = useState(0);

  console.log("jobId:", jobId);

  useEffect(() => {
    const estimatedTime = 3.5 * 60 * 1000; // 3 分 30 秒
    const startTime = Date.now();
    const unevenSpeeds = [10, 50, 100, 300, 700];

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const fakeProgress = (elapsedTime / estimatedTime) * 100;
      setProgress((prev) => Math.max(prev, Math.min(98, fakeProgress + Math.random() * 5)));
    }, unevenSpeeds[Math.floor(Math.random() * unevenSpeeds.length)]);

    return () => clearInterval(timer);
  }, []);

  const fetchAudioAndTranscript = async () => {
    setIsLoading(true);

    try {
      const audioResponse = await fetch(
        `https://audioai.alphalio.cn/api/v1/jobs/download?task_id=${jobId}&result_type=envaudio`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3NDM3NzU3Mjd9.iGmsi1jCjc-fgrJ7J9eUzr8mQR0qOhD6mFsVTN_ZYL0`,
          },
        }
      );

      if (audioResponse.status === 400) {
        const errorDetails = await audioResponse.json();
        if (errorDetails.detail === "Job result not ready") {
          console.log("Audio job result not ready. Retrying...");
          setTimeout(fetchAudioAndTranscript, 5000);
          return;
        }
        throw new Error(errorDetails.detail || "Error fetching audio file");
      }

      const audioBlob = await audioResponse.blob();
      setAudioUrl(URL.createObjectURL(audioBlob));
      setIsJobReady(true);
    } catch (error) {
      console.error("Error fetching audio:", error);
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAudioAndTranscript();
  }, []);

  const handleSave = () => {
    if (!audioUrl) {
      alert("Audio is not ready yet!");
      return;
    }

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "audiobook.mp3";
    link.click();
  };

  if (isLoading || !isJobReady) {
    return (
      <div className="loading-container">
        <div className="audiobook-intro-container">
          <h1>AI Audio Books</h1>
          <p>Your file has been submitted! We are producing your audiobook...</p>
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%`, backgroundColor: "#7287f9" }}></div>
          <div className="loading-percentage">{Math.floor(progress)}%</div>
        </div>
        <button className="loading-button" disabled>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="audiobook-container">
      <div className="audiobook-header">
        <p>Your audio has been successfully generated. You may further customize it or simply download it for use.</p>
        <img src={microphoneIcon} className="microphoneIcon" alt="Microphone Icon" />
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
        <div className="audiobook-text">{audiobookText}</div>
      </div>
      <div className="audiobook-actions">
        <button onClick={handleRegenerate} className="action-button">Regenerate</button>
        <button onClick={handleSave} className="action-button">Save</button>
        <button onClick={handleShare} className="action-button">Share</button>
      </div>
      <p className="subscription-info">
        <span className="plan-type">{subscriptionInfo.planType}</span>
        <span className="token-count">{subscriptionInfo.planTokenCount}</span>
        <span className="tokens-left">tokens left</span>
      </p>
    </div>
  );
};

export default AudioBookPlayer;