import React, { useState } from "react";
import axios from "axios";
import "./AIPodcast.css";
import PodcastPlayer from "./PodcastPlayer/PodcastPlayer";

const AIPodcast = ({ selectedFiles = [] }) => {
  const [formData, setFormData] = useState({
    topic: "",
    text: "",
    urls: "",
    longform: false,
    generateAudio: true,
    config: "",
  });

  const jsonSelectedFiles = JSON.stringify(selectedFiles);

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.urls += jsonSelectedFiles;
    if ((!formData.urls || !jsonSelectedFiles) && selectedFiles.length === 0 && !formData.text && !formData.topic) {
      setResponseMessage("Please provide at least one input: Topic, Text, URL, or select a file.");
      return;
    }

    const data = new FormData();
    data.append("topic", formData.topic);
    data.append("text", formData.text);
    data.append("urls", formData.urls);
    data.append("longform", formData.longform);
    data.append("generateAudio", formData.generateAudio);
    data.append("config", formData.config);

    console.log(jsonSelectedFiles);
    console.log(formData);
    console.log(data);

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://localhost:9002/api/ai/submit-job",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResponseMessage(`Job submitted successfully! Job ID: ${response.data.jobId}`);
      setJobId(response.data.jobId);
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
            name="urls"
            placeholder="Enter URLs"
            value={formData.urls}
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="form-group">
          <label>Longform</label>
          <input
            type="checkbox"
            name="longform"
            checked={formData.longform}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Generate Audio</label>
          <input
            type="checkbox"
            name="generateAudio"
            checked={formData.generateAudio}
            onChange={handleInputChange}
          />
        </div> */}

        <div className="form-group">
          <label>Configuration</label>
          <textarea
            name="config"
            placeholder="Enter configuration settings"
            value={formData.config}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Selected Files</label>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.fileName}</li>
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
