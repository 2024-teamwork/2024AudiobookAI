import React, { useState } from "react";
import axios from "axios";
import "./AIPodcast.css";
import { useNavigate } from "react-router-dom";
import PodcastPlayer from "../PodcastPlayer/PodcastPlayer";

const AIPodcast = () => {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState(null); // New state for jobId

  const [selectedType, setSelectedType] = useState("topic");
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

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setFormData({ ...formData, topic: "", text: "", urlList: "" });
    setResponseMessage("");
  };

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

    // Validate inputs to ensure at least one required field is provided
    if (!formData.urlList && !file && !transcriptFile && !formData.text) {
      setResponseMessage("Please provide either a URL, text, or upload a file.");
      return;
    }

    const data = new FormData();
    if (selectedType === "topic") {
      data.append("text", formData.topic);
    } else if (selectedType === "text") {
      data.append("text", formData.text);
    } else if (selectedType === "url") {
      data.append("url_list", formData.urlList);
    }
    data.append("ttd_model", formData.ttsModel);
    data.append("transcript_only", formData.transcriptOnly);

    // Convert config and conversationConfig to JSON strings if they are provided
    if (formData.config) {
      try {
        const configObject = JSON.parse(formData.config);
        data.append("config", JSON.stringify(configObject));
      } catch (error) {
        setResponseMessage("Invalid JSON in config field.");
        return;
      }
    }

    if (formData.conversationConfig) {
      try {
        const conversationConfigObject = JSON.parse(formData.conversationConfig);
        data.append("conversation_config", JSON.stringify(conversationConfigObject));
      } catch (error) {
        setResponseMessage("Invalid JSON in conversationConfig field.");
        return;
      }
    }

    // Append files to FormData
    if (file) {
      data.append("file", file);
    }
    if (transcriptFile) {
      data.append("transcript_file", transcriptFile);
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://localhost:9002/api/ai/submit-job",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseMessage(
        `Job submitted successfully! Job ID: ${response.data.job_id}`
      );

    //  jobId = response.data.job_id; // Extract jobId from response
     setJobId(response.data.job_id);
     console.log(`Job submitted successfully! Job ID: ${response.data.job_id}`);
      // navigate(`/podcast/${jobId}`); // Navigate to PodcastPlayer with jobId

    } catch (error) {
      setResponseMessage(
        `Error: ${error.response ? error.response.data : "Server error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-podcast-container">
      <h1>AI Podcasts</h1>
      <p>Convert any content to audio dialog</p>

      <div className="input-type-selector">
        <button
          onClick={() => handleTypeChange("topic")}
          className={selectedType === "topic" ? "active" : "inactive"}
        >
          Topic
        </button>
        <button
          onClick={() => handleTypeChange("text")}
          className={selectedType === "text" ? "active" : "inactive"}
        >
          Text
        </button>
        <button
          onClick={() => handleTypeChange("url")}
          className={selectedType === "url" ? "active" : "inactive"}
        >
          URL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="ai-podcast-form">
        {selectedType === "topic" && (
          <div className="form-group">
            <label>Topic</label>
            <textarea
              name="topic"
              placeholder="Enter a topic for the podcast"
              value={formData.topic}
              onChange={handleInputChange}
            />
          </div>
        )}

        {selectedType === "text" && (
          <div className="form-group">
            <label>Text</label>
            <textarea
              name="text"
              placeholder="Enter text content"
              value={formData.text}
              onChange={handleInputChange}
            />
          </div>
        )}

        {selectedType === "url" && (
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
        )}

        <div className="form-group">
          <label>Language</label>
          <input
            type="text"
            name="language"
            placeholder="Choose a language"
            value={formData.language}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>LLM Model</label>
          <input
            type="text"
            name="ttsModel"
            placeholder="Choose a model"
            value={formData.ttsModel}
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

        {/* <div className="form-group">
          <label>Config (JSON)</label>
          <textarea
            name="config"
            placeholder="Enter configuration as JSON"
            value={formData.config}
            onChange={handleInputChange}
          />
        </div> */}

        {/* <div className="form-group">
          <label>Conversation Config (JSON)</label>
          <textarea
            name="conversationConfig"
            placeholder="Enter conversation configuration as JSON"
            value={formData.conversationConfig}
            onChange={handleInputChange}
          />
        </div> */}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Generate"}
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}


      {jobId && (
        <PodcastPlayer jobId={jobId} /> // Dynamically render PodcastPlayer
      )}

    </div>
  );
};

export default AIPodcast;
