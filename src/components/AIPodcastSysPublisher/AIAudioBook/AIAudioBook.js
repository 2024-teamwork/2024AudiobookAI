import React, { useState } from "react";
import axios from "axios";
import "./AIAudioBook.css";
import AudioBookPlayer from "./AudioPlayer/AudioPlayer";

const AIAudioBook = ({  selectedFiles = [] }) => {
  const [formData, setFormData] = useState({
    text: "",
    fileUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.text && !formData.fileUrl) {
      alert("Please provide text or a file URL.");
      return;
    }

    const payload = formData.text
      ? { text: formData.text }
      : { file_url: formData.fileUrl };

    try {
      const response = await axios.post(
        "https://audioai.alphalio.cn/api/v1/jobs/submit/env_sound",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3MzcwNjk2NDJ9.uKR7IA1j5n9i0xBlksTZMNPl-gnbu_3qyG6znRzE5Xc",
          },
        }
      );

      alert(`Job submitted successfully! Job ID: ${response.data.task_id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Error: ${error.response?.data || "Server error"}`);
    }
  };

  return (
    <div className="ai-audio-book-container">
      <h1>AI Audio Books</h1>
      <p>Convert text or a file URL into immersive audio books.</p>

      <form onSubmit={handleSubmit} className="ai-audio-book-form">
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
          <label>File URL</label>
          <input
            type="url"
            name="fileUrl"
            placeholder="Enter file URL"
            value={formData.fileUrl}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Generate</button>
      </form>

      <AudioBookPlayer />
    </div>
  );
};

export default AIAudioBook;
