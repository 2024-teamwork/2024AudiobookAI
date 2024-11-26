import React, { useState } from "react";
import './SummaryGenerator.css';

const SummaryGenerator = () => {
  const markdownContent = `
<Person1> "Welcome to AudioBook AI - Your Personal Generative AI Podcast!  Today, we're diving into the fascinating world of alternative data in FinTech and business intelligence. Buckle up!"
</Person1><Person2> "Ooh, alternative data. Sounds intriguing! What exactly are we talking about here?  Is it like, stock tips from a psychic?"
</Person2><Person1> "Haha, not quite!  Think less🔮crystal ball and more 📊data mining. We're talking about unconventional and unstructured data sources – think text, images, digital footprints, internet of things...the whole shebang!"
</Person1><Person2> "So, like, instead of just looking at financial statements, we're looking at… satellite images of parking lots?"
</Person2><Person1> "Exactly!  This paper by Cong, Li, and Zhang really lays out the landscape. They discuss how satellite imagery can be used to cross-validate business metrics, like retail store traffic.  It's like a real-world cheat sheet for investors!"
</Person1><Person2> "Wow!  That's pretty wild. Are there other examples of image-based alternative data?"
</Person2><Person1> "Absolutely.  Think facial recognition for customer loyalty programs,  video data for loss prevention, even robots monitoring store shelves.  It's all about gaining an edge through observation." 
</Person1><Person2> "Okay, so images are one thing, but what about text?  How does that fit into the picture?"
</Person2><Person1> "Textual analysis is huge in this field.  Everything from news articles and corporate filings to social media posts can be analyzed for sentiment, trends, and predictive signals.  It's like reading between the lines, but at massive scale." 
</Person1><Person2> "I can see how that'd be valuable. Is this where natural language processing comes in?" 
</Person2><Person1> "You bet! NLP and machine learning are crucial for making sense of all this textual data.  They can identify topics, measure corporate governance, even assess systemic risk. Pretty impressive stuff." 
</Person1><Person2> "So it's not just keyword searches anymore. We're getting deep into the meaning behind the words." 
</Person2><Person1> "Precisely.  And then there are digital footprints… the trails we leave behind as we interact with the digital world. Think mobile phone usage, online shopping habits, social media activity. It's a goldmine of information about consumer behavior."  
</Person1><Person2> "That does sound valuable, but also a little… creepy.  Is there a privacy concern here?" 
</Person2><Person1> "That's a valid point, and definitely something the paper acknowledges. There's a constant balancing act between leveraging data and protecting individual privacy. It's a conversation we need to be having." 
</Person1><Person2> "Fair enough. So, digital footprints, satellite images, textual analysis... anything else?"
</Person2><Person1> "Don't forget the internet of things!  IoT devices generate mountains of data that can be used to optimize everything from supply chain operations to customer experiences. It's changing the game for retailers, big time."  
</Person1><Person2> "I'm starting to see the bigger picture here. It's like all the little pieces of data we generate throughout the day are coming together to form this… giant, interconnected web of information." 
</Person2><Person1> "Exactly! And the ability to harness that web is becoming a key competitive advantage in the financial world. The paper goes into a fascinating case study about using digital footprints for microloan risk assessment. Apparently, mobile usage and mobility traces are incredibly predictive of repayment behavior." 
</Person1><Person2> "Wow.  So your phone really *does* know everything about you." 
</Person2><Person1> "It seems that way!  But seriously, this research highlights the immense potential of alternative data to improve financial decision-making, increase efficiency, and even promote financial inclusion. It's a rapidly evolving field, and the possibilities are endless." 
</Person1><Person2> "It sounds like it!  This is definitely a topic I want to keep learning about. Thanks for breaking it down for me." 
</Person2><Person1> "My pleasure! And thank *you* for listening to AudioBook AI.  We'll be back next week with another deep dive into the world of AI. Until then, stay curious!" </Person1>
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
