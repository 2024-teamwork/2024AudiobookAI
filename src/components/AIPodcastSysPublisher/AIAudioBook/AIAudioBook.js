import React, { useState } from "react";
import axios from "axios";
import "./AIAudioBook.css";
import AudioBookPlayer from "./AudioPlayer/AudioPlayer";

const AIAudioBook = ({  selectedFiles = [] }) => {
  const [jobId, setJobId] = useState(null);
  const [formData, setFormData] = useState({
    text: "不必说碧绿的菜畦，光滑的石井栏，高大的皂荚树，紫红的桑葚；也不必说鸣蝉在树叶里长吟，肥胖的黄蜂伏在菜花上，轻捷的叫天子(云雀)忽然从草间直窜向云霄里去了。单是周围的短短的泥墙根一带，就有无限趣味。油蛉在这里低唱，蟋蟀们在这里弹琴。翻开断砖来，有时会遇见蜈蚣；还有斑蝥，倘若用手指按住它的脊梁，便会啪的一声，从后窍喷出一阵烟雾。何首乌藤和木莲藤缠络着，木莲有莲房一般的果实，何首乌有臃肿的根。有人说，何首乌根是有像人形的，吃了便可以成仙，我于是常常拔它起来，牵连不断地拔起来，也曾因此弄坏了泥墙，却从来没有见过有一块根像人样。如果不怕刺，还可以摘到覆盆子，像小珊瑚珠攒成的小球，又酸又甜，色味都比桑葚要好得远。",
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

      // alert(`Job submitted successfully! Job ID: ${response.data.task_id}`);
      setJobId(response.data.task_id);
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

      {jobId && <AudioBookPlayer jobId = {jobId}/>}
    </div>
  );
};

export default AIAudioBook;
