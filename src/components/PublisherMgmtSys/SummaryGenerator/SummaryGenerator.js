import React, { useState } from "react";
import './SummaryGenerator.css';

const SummaryGenerator = () => {
  const markdownContent = `
  The document discusses the rise and impact of alternative data sources in finance and business intelligence, highlighting how unconventional data, such as textual, image, digital footprint, and IoT data, is transforming these fields.
  
  Key points include:
  
  1. **Textual Analysis**: Text data, including news, financial reports, and social media posts, is leveraged using machine learning and NLP to reveal insights in corporate finance and investment strategies.
  
  2. **Image Data**: Satellite imagery and facial recognition are used to assess economic indicators and predict corporate performance. Applications range from tracking retail activity via satellite to evaluating managerial competence based on facial features.
  
  3. **Digital Footprints**: Behavioral data from social media and mobile devices enhances financial predictions, especially in credit scoring, by capturing user activities and patterns that improve the accuracy and inclusiveness of traditional models.
  
  4. **IoT Data**: The Internet of Things enables real-time data collection from sensors in various industries, improving customer experience and operational efficiency. In retail, IoT facilitates better inventory management and targeted marketing.
  
  The authors emphasize the transformative potential of alternative data, while noting challenges like data privacy, model transparency, and regulatory implications as fields to address moving forward.
  `;

  const [textContent] = useState(markdownContent);

  return (
    <div className="content-card edit-content">
      <h2>Podcast Script</h2>
      <textarea placeholder="Podcast Script will show here..." 
      className="textarea"       
      value={textContent}
      />
      <button className="action-button">Regenerate Podcast Script</button>
    </div>
  );
};

export default SummaryGenerator;
