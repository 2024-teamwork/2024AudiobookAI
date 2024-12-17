import React, { useState } from "react";
import axios from "axios";
import "./AIPodcast.css";
import PodcastPlayer from "./PodcastPlayer/PodcastPlayer";

const AIPodcast = ({ selectedFiles = [] }) => {
  const [formData, setFormData] = useState({
    topic: "",
    text: "",
    file_urls: [],
  });

  const jsonSelectedFiles = JSON.stringify(selectedFiles);

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);

  // const handleInputChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Prepare file_urls array
  const prepareFileUrls = () => {
    return selectedFiles.map((file) => ({
      fileName: file.fileName,
      cosUrl: file.cosUrl,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.topic && !formData.text && selectedFiles.length === 0) {
      setResponseMessage("Please provide Topic, Text, or upload files.");
      return;
    }

    // Build AIJobRequest payload
    const requestPayload = {
      topic: formData.topic,
      text: formData.text,
      file_urls: prepareFileUrls(),
    };

    console.log("Submitting Payload:", requestPayload);

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://localhost:9002/api/ai/submit-job",
        requestPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      setResponseMessage(`Job submitted successfully! Job ID: ${response.data.task_id}`);
      setJobId(response.data.task_id);
      console.log("Response:", response);
    } catch (error) {
      console.error("Submission Error:", error.response);
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

      {/* {jobId && <PodcastPlayer jobId={jobId} />} */}
    </div>
  );
};

export default AIPodcast;
