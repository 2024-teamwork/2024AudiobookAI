import React, { useState } from "react";
import axios from "axios";
import "./AIPodcast.css";
import PodcastPlayer from "../PodcastPlayer/PodcastPlayer";

const AIPodcast = () => {
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

  const [file, setFile] = useState(null);
  const [transcriptFile, setTranscriptFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTranscriptFileChange = (e) => {
    setTranscriptFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.urlList && !file && !transcriptFile && !formData.text && !formData.topic) {
      setResponseMessage("Please provide at least one input: Topic, Text, or URL.");
      return;
    }

    const data = new FormData();
    data.append("topic", formData.topic);
    data.append("text", formData.text);
    data.append("url_list", formData.urlList);
    data.append("ttd_model", formData.ttsModel);
    data.append("transcript_only", formData.transcriptOnly);

    if (formData.config) {
      try {
        data.append("config", JSON.stringify(JSON.parse(formData.config)));
      } catch {
        setResponseMessage("Invalid JSON in config field.");
        return;
      }
    }

    if (formData.conversationConfig) {
      try {
        data.append(
          "conversation_config",
          JSON.stringify(JSON.parse(formData.conversationConfig))
        );
      } catch {
        setResponseMessage("Invalid JSON in conversationConfig field.");
        return;
      }
    }

    if (file) data.append("file", file);
    if (transcriptFile) data.append("transcript_file", transcriptFile);

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
        {/* Combined input fields */}
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
          <label>Language</label>
          <input
            type="text"
            name="language"
            placeholder="Enter a language"
            value={formData.language}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Upload File</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label>Transcript File</label>
          <input type="file" onChange={handleTranscriptFileChange} />
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
