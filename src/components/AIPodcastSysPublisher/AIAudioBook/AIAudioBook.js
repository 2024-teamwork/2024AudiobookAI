import React, { useState } from "react";
import axios from "axios";
import "./AIAudioBook.css";
import AudioBookPlayer from "./AudioPlayer/AudioPlayer";

const AIAudioBook = ({ selectedFiles = [] }) => {
  const [jobId, setJobId] = useState(null);
  const [formData, setFormData] = useState({
    text: "Nestled between towering peaks and lush valleys lies a landscape that feels almost otherworldly. The morning sun casts its golden glow over rolling hills blanketed in emerald-green grass, each blade glistening with dew. A soft mist lingers, curling around the base of ancient trees that stand like silent sentinels, their twisted branches reaching skyward. The air is crisp and carries the faint, sweet aroma of wildflowers, scattered like tiny jewels across the landscape—pinks, yellows, and purples blending seamlessly into the tapestry of nature.  \nIn the distance, a crystal-clear river winds its way through the terrain, its waters shimmering like liquid silver under the sun's warm rays. The sound of its gentle flow is a soothing melody, harmonizing with the soft rustle of leaves stirred by a light breeze. Birds flit from branch to branch, their vibrant feathers catching the light as they sing joyful tunes that echo across the expanse. \nBeyond the river, a field of golden wheat sways lazily, rippling like an ocean in the wind. The scene is framed by towering mountains, their rugged peaks capped with snow that glows with an ethereal pink hue in the early light. Wisps of clouds cling to their slopes, adding an air of mystery to their grandeur. \nA dirt path meanders through the valley, inviting wanderers to explore its hidden corners. Along the trail, small wooden bridges span bubbling brooks, and moss-covered rocks sit like natural sculptures, adorned with tiny ferns and lichens. The path leads to a serene lake at the heart of the valley, its surface so still it mirrors the surrounding landscape with breathtaking clarity. As the sun climbs higher, the lake sparkles, its azure waters a stark contrast to the deep greens and browns of the earth around it. \nThe tranquility of the scene is broken only by the occasional call of a distant hawk or the rustle of an unseen creature in the underbrush. Time seems to slow in this idyllic haven, where nature's beauty unfolds in every direction. It is a place that invites peace, reflection, and a deep appreciation for the wonders of the world. ",
    fileUrl: "",
    language: "English",
    voice: "Soft",
    character: "Male",
    speed: "1x",
    styleSelect: "Fantasy",
    ambientSound: "On",
  });

  const [isFormVisible, setIsFormVisible] = useState(true);

  const sampleJob = '93f71ef1-4c94-4aa7-9bdb-84331a28b47a';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormVisible(false);
    const audiobookSelectText = `\nFollowing information is requirements to the audio, not part of the audio:
    Language: ${formData.language};
    Voice: ${formData.voice};
    Character: ${formData.character};
    Speed: ${formData.speed};
    Style: ${formData.styleSelect};
    Ambient Sound: ${formData.ambientSound}.`;

    if (!formData.text && !formData.fileUrl) {
      alert("Please provide text or a file URL.");
      return;
    }

    const payload = formData.text
      ? { text: formData.text+audiobookSelectText}
      : { file_url: formData.fileUrl };
    console.log("AIAudiobook Payload: ",payload)
    try {
      const response = await axios.post(
        "https://audioai.alphalio.cn/api/v1/jobs/submit/env_sound",
        payload,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDU4MGVlZC0zMjIyLTQ5YmQtODE3MS0wYmNkZTBiMmQ3OTQiLCJleHAiOjE3NDM3NzU3Mjd9.iGmsi1jCjc-fgrJ7J9eUzr8mQR0qOhD6mFsVTN_ZYL0`
          },
        }
      );
      setJobId(response.data.task_id);
      // setJobId('93f71ef1-4c94-4aa7-9bdb-84331a28b47a');
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Error: ${error.response?.data || "Server error"}`);
    }
  };

  return (
    <div className="ai-audio-book-container">
      {isFormVisible ? (
        <div className="audiobook-intro-container">
          <h1>AI Audio Books</h1>
          <p>Convert text or a file URL into immersive audio books.</p>
        </div>
      ) : (
        <div>
          {jobId && <AudioBookPlayer jobId={jobId} audiobookText={formData.text} />}
        </div>
      )}
      {isFormVisible && (
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
            <label>Selected Files</label>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.fileName}</li>
              ))}
            </ul>
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
                  <label>Style</label>
                  <select
                    name="styleSelect"
                    value={formData.styleSelect}
                    onChange={handleInputChange}
                  >
                    <option value="Fantasy">Fantasy</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Horror">Horror</option>
                    <option value="Historical Fiction">Historical Fiction</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Young Adult">Young Adult</option>
                    <option value="Literary Fiction">Literary Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Humor">Humor</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Children's Books">Children's Books</option>
                    <option value="Crime and Thriller">Crime and Thriller</option>
                    <option value="Epic and Saga">Epic and Saga</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div className="form-group-row">
              <div className="form-column">
                <div className="form-group">
                  <label>Character</label>
                  <select
                    name="character"
                    value={formData.character}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
  
              <div className="form-column">
                <div className="form-group">
                  <label>Ambient Sound</label>
                  <select
                    name="ambientSound"
                    value={formData.ambientSound}
                    onChange={handleInputChange}
                  >
                    <option value="On">On</option>
                    <option value="Off">Off</option>
                  </select>
                </div>
              </div>
            </div>


          <div className="audiobook-button-container">
            <button type="submit">Submit</button>
            <button type="submit" onClick={() => setJobId(sampleJob)}>
              See Sample
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AIAudioBook;