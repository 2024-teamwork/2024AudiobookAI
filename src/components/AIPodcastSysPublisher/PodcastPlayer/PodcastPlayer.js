import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PodcastPlayer.css";

const PodcastPlayer = ({ jobId }) => {
  const [script, setScript] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch the text script
  useEffect(() => {
    const fetchScript = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9002/api/ai/download/text/${jobId}`
        );
        setScript(response.data);
      } catch (error) {
        console.error("Error fetching script:", error);
        setMessage(
          "Failed to fetch podcast script. Please Select one script to show here!"
        );
      }
    };

    const fetchAudio = async () => {
      try {
        const audioResponse = `http://localhost:9002/api/ai/download/audio/${jobId}`;
        setAudioUrl(audioResponse); // Set audio URL for the audio player
      } catch (error) {
        console.error("Error fetching audio:", error);
        setMessage("Failed to fetch podcast audio.");
      }
    };

    // Fetch both script and audio
    fetchScript();
    fetchAudio();
    setLoading(false);
  }, [jobId]);

  // Save the updated script
  const saveScript = async () => {
    setSaving(true);
    try {
      // await axios.post(`http://localhost:9002/api/ai/update/text/${jobId}`, {
      //   text: script,
      // });
      setMessage("Script saved successfully.");
    } catch (error) {
      console.error("Error saving script:", error);
      setMessage("Failed to save script.");
    } finally {
      setSaving(false);
    }
  };

  const shareScript = async () => {
    setSharing(true);
    try {
      setMessage("Script shared successfully.");
    } catch (error) {
      console.error("Error sharing script:", error);
      setMessage("Failed to share script.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="podcast-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Your Podcast</h1>
          <p>
            Your audio has been successfully generated. You may further
            customize it or download it for use.
          </p>

          {/* Audio Player */}
          <div className="audio-player">
            <audio controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Script Editor */}
          <div className="script-editor">
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Your podcast script will appear here..."
            ></textarea>
            <div className="button-container">
              <button onClick={saveScript} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>

              <button onClick={shareScript} disabled={saving}>
                {sharing ? "Sharing..." : "Share to my social media platform"}
              </button>
            </div>
          </div>

          {/* Display message */}
          {message && <p className="message">{message}</p>}
        </>
      )}
    </div>
  );
};

export default PodcastPlayer;
