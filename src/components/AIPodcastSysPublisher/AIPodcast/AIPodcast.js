import React, { useState } from "react";
import axios from "axios";
import "./AIPodcast.css";
import PodcastPlayer from "./PodcastPlayer/PodcastPlayer"

const AIPodcast = ({ selectedFiles = [] }) => {
  const [formData, setFormData] = useState({
    topic: "",
    text: "",
    urlList: "",
    language: "",
    ttsModel: "openai",
    transcriptOnly: false,
    config: "",
    conversationConfig: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.urlList && !selectedFiles.length && !formData.text && !formData.topic) {
      setResponseMessage("Please provide at least one input: Topic, Text, URL, or select a file.");
      return;
    }

    const data = new FormData();
    data.append("topic", formData.topic);
    data.append("text", formData.text);
    data.append("url_list", formData.urlList);
    data.append("selected_files", JSON.stringify(selectedFiles)); // Include selected files
    data.append("language", formData.language);
    data.append("tts_model", formData.ttsModel);
    data.append("transcript_only", formData.transcriptOnly);

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://localhost:9002/api/ai/submit-job",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResponseMessage(`Job submitted successfully! Job ID: ${response.data.job_id}`);
      setJobId(response.data.job_id);
    } catch (error) {
      setResponseMessage(`Error: ${error.response?.data || "Server error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-podcast-container">
      <h1>AI Podcasts</h1>
      <p>Convert any content to audio dialog</p>

      <form onSubmit={handleSubmit} className="ai-podcast-form">
        <div className="form-group">
          <label>Topic</label>
          <textarea
            name="topic"
            placeholder="Enter a topic"
            value={formData.topic}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Text</label>
          <textarea
            name="text"
            placeholder="Enter text content"
            value={formData.text}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>URL</label>
          <input
            type="text"
            name="urlList"
            placeholder="Enter a URL"
            value={formData.urlList}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Selected Files</label>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Generate"}
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}

      {jobId && <PodcastPlayer jobId={jobId} />}
    </div>
  );
};

export default AIPodcast;
