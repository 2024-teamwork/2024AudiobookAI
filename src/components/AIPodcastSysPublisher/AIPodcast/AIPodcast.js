import React, { useState } from "react";
import axios from "axios";
import "./AIPodcast.css";
import PodcastPlayer from "./PodcastPlayer/PodcastPlayer";

const AIPodcast = ({ selectedFiles = [] }) => {
  const [formData, setFormData] = useState({
    topic: "",
    text: "",
    file_urls: [],
    script: "",
    language: "English",
    voice: "Soft",
    character1: "Male",
    speed: "1x",
    topicSelect:"",
    character2: "Female",
  });

  const jsonSelectedFiles = JSON.stringify(selectedFiles);

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const taskId = '8961e00f-ad32-4f31-9b5e-35cab438bf72';

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

    //additional user selections
    const podcastSelections = {
      ...formData,
      file_urls: prepareFileUrls(),
    };

    console.log("Submitting Payload:", requestPayload);
    console.log("Podcast Selections:", podcastSelections);

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://localhost:9002/api/ai/submit-job",
        requestPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      setResponseMessage(`Job submitted successfully! Job ID: ${response.data.task_id}`);
      // setJobId(response.data.task_id);
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


        <div className="form-group">
          <label>Script</label>
          <textarea
            name="script"
            placeholder="Enter the script"
            value={formData.script}
            onChange={handleInputChange}
            style={{ width: "100%", height: "80px" }}
          />
        </div>

        <div className="form-group-row">
          {/* First Row: Language, Speed */}
          <div className="form-column">
            <div className="form-group">
              <label>Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Speed</label>
              <select
                name="speed"
                value={formData.speed}
                onChange={handleInputChange}
              >
                <option value="0.5x">0.5x</option>
                <option value="0.75x">0.75x</option>
                <option value="1x">1x</option>
                <option value="1.25x">1.25x</option>
                <option value="1.5x">1.5x</option>
                <option value="1.75x">1.75x</option>
                <option value="2x">2x</option>
                <option value="3x">3x</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group-row">
          {/* Second Row: Voice, Topic */}
          <div className="form-column">
            <div className="form-group">
              <label>Voice</label>
              <select
                name="voice"
                value={formData.voice}
                onChange={handleInputChange}
              >
                <option value="Soft">Soft</option>
                <option value="Serious">Serious</option>
                <option value="Neutral">Neutral</option>
              </select>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Topic</label>
              <select
                name="topicSelect"
                value={formData.topicSelect}
                onChange={handleInputChange}
              >
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="True Crime">True Crime</option>
                <option value="Entertainment & Pop Culture">
                  Entertainment & Pop Culture
                </option>
                <option value="Science & Education">Science & Education</option>
                <option value="Society & Culture">Society & Culture</option>
                <option value="Sports">Sports</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group-row">
          {/* Third Row: Character 1, Character 2 */}
          <div className="form-column">
            <div className="form-group">
              <label>Character 1</label>
              <select
                name="character1"
                value={formData.character1}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Character 2</label>
              <select
                name="character2"
                value={formData.character2}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>


        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Generate"}
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}

      {jobId && <PodcastPlayer jobId={jobId}/>}
    </div>
  );
};

export default AIPodcast;