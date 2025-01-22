import React, { useState } from "react";
import axios from "axios";
import "./AIAudioBook.css";
import AudioBookPlayer from "./AudioPlayer/AudioPlayer";

const AIAudioBook = ({ selectedFiles = [] }) => {
  const [jobId, setJobId] = useState(null);
  const [formData, setFormData] = useState({
    text: "不必说碧绿的菜畦，光滑的石井栏，高大的皂荚树，紫红的桑葚；也不必说鸣蝉在树叶里长吟，肥胖的黄蜂伏在菜花上，轻捷的叫天子(云雀)忽然从草间直窜向云霄里去了。单是周围的短短的泥墙根一带，就有无限趣味。油蛉在这里低唱，蟋蟀们在这里弹琴。翻开断砖来，有时会遇见蜈蚣；还有斑蝥，倘若用手指按住它的脊梁，便会啪的一声，从后窍喷出一阵烟雾。何首乌藤和木莲藤缠络着，木莲有莲房一般的果实，何首乌有臃肿的根。有人说，何首乌根是有像人形的，吃了便可以成仙，我于是常常拔它起来，牵连不断地拔起来，也曾因此弄坏了泥墙，却从来没有见过有一块根像人样。如果不怕刺，还可以摘到覆盆子，像小珊瑚珠攒成的小球，又酸又甜，色味都比桑葚要好得远。",
    fileUrl: "",
    language: "English",
    voice: "Soft",
    character: "Male",
    speed: "1x",
    styleSelect: "Fantasy",
    ambientSound: "On",
  });

  const [isFormVisible, setIsFormVisible] = useState(true);



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
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          },
        }
      );
      setJobId(response.data.task_id);
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
          </div>
        </form>
      )}
    </div>
  );
};

export default AIAudioBook;