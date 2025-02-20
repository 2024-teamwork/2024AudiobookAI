import React, { useEffect, useState } from "react";
import "./PodcastPlayer.css";

const PodcastPlayer = ({ jobId }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJobReady, setIsJobReady] = useState(false);
  console.log("jobId: ", jobId);

  const fetchAudioAndTranscript = async () => {
    setIsLoading(true);

    try {
      // Fetch the audio file
      const audioResponse = await fetch(
        `https://audioai.alphalio.cn/api/v1/jobs/download?task_id=${jobId}&result_type=podcast`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3NDI2Nzk4MTR9.T8rmAYHaVD_fHRfw1PUDcee2-UwLJ3ausGE-_63w3kw",
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

      // Fetch the transcript
      const transcriptResponse = await fetch(
        `https://audioai.alphalio.cn/api/v1/jobs/download?task_id=${jobId}&result_type=transcript`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3NDI2Nzk4MTR9.T8rmAYHaVD_fHRfw1PUDcee2-UwLJ3ausGE-_63w3kw`
          },
        }
      );

      if (transcriptResponse.status === 400) {
        const errorDetails = await transcriptResponse.json();
        if (errorDetails.detail === "Job result not ready") {
          console.log("Transcript job result not ready. Retrying...");
          setTimeout(fetchAudioAndTranscript, 5000); // Retry after 5 seconds
          return;
        }
        throw new Error(errorDetails.detail || "Error fetching transcript");
      }

      const transcriptText = await transcriptResponse.text();
      const formattedTranscript = parseTranscript(transcriptText);
      setTranscript(formattedTranscript);
      setIsJobReady(true);
    } catch (error) {
      console.error("Error fetching audio or transcript:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseTranscript = (text) => {
    const lines = text.split("\n");
    return lines
      .map((line) => {
        const match = line.match(/<(\w+)> "(.*)"/);
        if (match) {
          return { speaker: match[1], text: match[2] };
        }
        return null;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    fetchAudioAndTranscript();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <button className="loading-button" disabled>
          Loading...
        </button>
      </div>
    );
  }

  if (!isJobReady) {
    return (
      <div className="loading-container">
        <button className="loading-button" disabled>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="podcast-container">
      <div className="podcast-header">
        <h3 className="podcast-title">Podcast Player</h3>
      </div>
      <div className="audio-player">
        {audioUrl && (
          <audio controls className="audio-element">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      <div className="transcript">
        {transcript.map((item, index) => (
          <p key={index} className="transcript-text">
            <strong>{item.speaker}: </strong>
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PodcastPlayer;
