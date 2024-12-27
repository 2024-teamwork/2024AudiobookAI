import React, { useEffect, useState } from "react";

const AudioBookPlayer = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAudioAndTranscript = async () => {
    setIsLoading(true);

    try {
      // Fetch the audio file
      const audioResponse = await fetch(
        "https://audioai.alphalio.cn/api/v1/jobs/download?task_id=b926f255-fb38-4564-87a3-495196d05525&result_type=envaudio",
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3MzcwNjk2NDJ9.uKR7IA1j5n9i0xBlksTZMNPl-gnbu_3qyG6znRzE5Xc",
          },
        }
      );

      const audioBlob = await audioResponse.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
} catch (error) {
      console.error("Error fetching audio or transcript:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseTranscript = (text) => {
    const lines = text.split("\n");
    return lines.map((line) => {
      const match = line.match(/<(\w+)> "(.*)"/);
      if (match) {
        return { speaker: match[1], text: match[2] };
      }
      return null;
    }).filter(Boolean);
  };

  useEffect(() => {
    fetchAudioAndTranscript();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Podcast Player</h3>
      </div>
      <div style={styles.audioPlayer}>
        {audioUrl && (
          <audio controls style={styles.audio}>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: "16px",
  },
  title: {
    margin: 0,
  },
  audioPlayer: {
    marginBottom: "16px",
  },
  audio: {
    width: "100%",
  },
  transcript: {
    maxHeight: "300px",
    overflowY: "auto",
    padding: "8px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  transcriptText: {
    margin: "8px 0",
  },
};

export default AudioBookPlayer;
