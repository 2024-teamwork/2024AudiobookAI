import React, { useEffect, useState } from "react";
import "./AudioBookPlayer.css";

const AudioBookPlayer = ({ jobId }) => {
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
        <div className="loading-bar"></div>
        <button className="loading-button" disabled>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="audiobook-container">
      <div className="audiobook-header">
        <h3 className="audiobook-title">AudioBook Player</h3>
      </div>
      <div className="audio-player">
        {audioUrl && (
          <audio controls className="audio-element">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default AudioBookPlayer;
