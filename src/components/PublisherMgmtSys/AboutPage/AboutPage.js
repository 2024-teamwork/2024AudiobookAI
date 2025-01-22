import React, { useState } from "react";
import "./AboutPage.css";
import introImage1 from "../../../images/intro_1.JPG";
import introImage2 from "../../../images/intro_2.JPG";
import introImage3 from "../../../images/intro_3.JPG";
import Footer from "../../Layout/footer/Footer";
import Navigation from "../../Layout/navigation/Navigation";
import rightArrow from "../../../images/icon/right_arrow.JPG";
import leftArrow from "../../../images/icon/left_arrow.JPG";
import review1 from "../../../images/review1.png";
import review2 from "../../../images/review2.png";
import review3 from "../../../images/review3.png";
import review4 from "../../../images/review4.png";
import review5 from "../../../images/review5.png";
import review6 from "../../../images/review6.png";
import review7 from "../../../images/review7.png";
import review8 from "../../../images/review8.png";
import review9 from "../../../images/review9.png";
import microphone from "../../../images/icon/microphonePlusOne.png";
import soundwave from "../../../images/soundwave.png";
import microphoneRotate from "../../../images/icon/microphonePlusOneRotated.png";
import qAndA from "../../../images/qAndA.png";

const userReviews = [
    {
      profile_pic_url: review1,
      username: "Eve Madien",
      rating: 5,
      review_content:
        "This AI-driven audiobook is a game-changer. The AI's ability to adapt the narration style based on my feedback is incredible, and it makes the listening experience feel personalized.",
    },
    {
      profile_pic_url: review2,
      username: "Ash Benfred",
      rating: 5,
      review_content:
        "The AI's analysis of cybersecurity trends is spot on, and the hosts do a great job of explaining the implications in a way that's easy to understand.",
    },
    {
      profile_pic_url: review3,
      username: "Ryan Smith",
      rating: 5,
      review_content:
        "Wow, I'm absolutely hooked on this AI-powered podcast! The hosts have such a unique way of breaking down complex tech topics and making them accessible for everyone.",
    },

    {
      profile_pic_url: review4,
      username: "Chris Johnson",
      rating: 4,
      review_content: "A great tool for creating audiobooks. The AI voices are natural and engaging!",
    },
    {
      profile_pic_url: review5,
      username: "Samantha Lee",
      rating: 5,
      review_content: "Amazing technology! It has cut down my podcast production time by half.",
    },
    {
      profile_pic_url: review6,
      username: "Michael Brown",
      rating: 5,
      review_content: "Highly recommend this AI tool for audiobook creators. Super efficient!",
    },
    {
      profile_pic_url: review7,
      username: "Linda Harris",
      rating: 4,
      review_content: "Fantastic AI narration. Still improving, but already impressive.",
    },
    {
      profile_pic_url: review8,
      username: "Paul Wilson",
      rating: 5,
      review_content: "The level of detail and customization in this tool is amazing!",
    },
    {
      profile_pic_url: review9,
      username: "Diana Evans",
      rating: 5,
      review_content: "Game changer for podcast and audiobook production. Great work!",
    },
  ];

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLeftClick = () => {
    if (isTransitioning) return; 
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 3 + userReviews.length) % userReviews.length);
  };

  const handleRightClick = () => {
    if (isTransitioning) return; 
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 3) % userReviews.length);
  };

  React.useEffect(() => {
    if (!isTransitioning) return;
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Duration of the transition (0.5s)
    return () => clearTimeout(timeout);
  }, [isTransitioning]);

  return (
    <div>
        <div className="nav-top">
            <Navigation />
        </div>
    <div id="about-page">

      {/* Intro One */}
      <div id="intro-one">
        <div id="intro-left">
            <h1>Generate your AI Audio Products with SoundWave</h1>
            <p>
                Revolutionize Your Podcast or Audiobook Production with AI – Fast,
                Easy, and Efficient!
             </p>
            <a href="/subscription">
              <button id="subscribe-button">Subscribe</button>
            </a>

        </div>
        <div id="intro-right">
          <img src={introImage1} alt="SoundWave Intro" />
        </div>
      </div>

      {/* Intro Two */}
      <div id="intro-two">
        <div id="intro-left-2">

            <div className="segment-box">
                <div className="segment segment-small"></div>
                <div className="segment segment-large"></div>
            </div>
        <h2>What is SoundWave?</h2>
        <p>
           From conceptualizing ideas and crafting scripts to simulating human
            voices and producing final audio files, AI handles the entire
            workflow seamlessly.
        </p>
            <div className="segment segment-green"></div>
        </div>
        <div id="intro-right-2">
          <img src={introImage2} alt="SoundWave Workflow" />
        </div>
      </div>

    {/* Intro Three */}
    <div id="intro-three">
        <div id="intro-left-3">
            <img src={introImage3} alt="How to Use SoundWave" />
        </div>
        <div id="intro-right-3">
        <div className="segment segment-green-large"></div>
        <h2>
            How to Use <span className="highlight">SoundWave</span> to Generate Audio Products
        </h2>
        <ol>
            <li>
                <p>1. Select Your Input</p>
                <p>
                    Choose a text source or input a URL link for your podcast or audiobook content.
                </p>
            </li>
            <li>
                <p>2. Generate AI Podcast or Audiobook</p>
                <p>
                    Pick your desired voice role and tone model, and let SoundWave AI create a professional-quality podcast or audiobook.
                </p>
            </li>
            <li>
                <p>3. Customize and Publish</p>
                <p>
                    Generate your podcast, then share it with our community. It's that simple!
                </p>
            </li>
        </ol>
        </div>
    </div>

    {/* User Review Section */}
    <div id="user-review">
        <div className="review-header">
          <h2>What our listeners say</h2>
          <p>Reviews for the product</p>
        </div>
        <div className="review-navigation">
          <img src={leftArrow} alt="Left Arrow" onClick={handleLeftClick} />
          <img src={rightArrow} alt="Right Arrow" onClick={handleRightClick} />
        </div>
        <div className="review-row">
          {userReviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-top">
                <img
                  src={review.profile_pic_url}
                  alt={`${review.username}'s profile`}
                  className="profile-pic"
                />
                <div className="review-info">
                  <h3>{review.username}</h3>
                  <div className="stars">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                          fill="#FF7602"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-content">{review.review_content}</p>
              <div className="review-segment"></div>
            </div>
          ))}
        </div>
      </div>
    
     {/* Navigate to Generate page Section */}
    <div className="start-generate">
        <div className="start-generate-row">
            <img src={microphone} alt="microphone icon" className="microphone" />

            <div className="journey-text-generate-container">
                <p className="journey-text">Start Your Journey of Creating AI Audio Product</p>
                <a href="/subscription">
                    <button id="about_nav_home" className="generate-button">Generate</button>
                </a>
            </div>

            <img src={microphoneRotate} alt="rotated microphone icon" className="microphone-rotate" />
        </div>
        <img src={soundwave} alt="soundwave image" className="soundwave" />  
    </div>


     {/* Q&A Section */}
    <div class="q-and-a-container">
        <div class="q-and-a-left">
            <h2 class="q-and-a-heading">Q&A</h2>
            <a href="/qanda" class="see-more-link">See More</a>
            <img src={qAndA} alt="Q&A Help Image" class="q-and-a-image" />
        </div>

        <div class="q-and-a-right">
            <h1 class="q-and-a-title">Q&A</h1>
            <ul class="q-and-a-list">
                <li><a href="/qanda/q1">How do I adjust the speed of the AI narration?</a></li>
                <li><a href="/qanda/q2">Can the AI narrator read in different accents or languages?</a></li>
                <li><a href="/qanda/q3">How do I get personalized recommendations based on my listening history?</a></li>
                <li><a href="/qanda/q4">Can I skip or replay sections of the audiobook or podcast?</a></li>
                <li><a href="/qanda/q5">How does the AI handle difficult or ambiguous text in the audiobook?</a></li>
                <li><a href="/qanda/q6">Is there an option to download episodes or audiobooks for offline listening?</a></li>
                <li><a href="/qanda/q7">How can I provide feedback on the AI narration or the content?</a></li>
                <li><a href="/qanda/q8">Can I sync my listening progress across multiple devices?</a></li>
                <li><a href="/qanda/q9">What privacy measures are in place to protect my listening habits?</a></li>
            </ul>
        </div>
    </div>


    </div>
        <Footer />
    </div>
    
  );
};

export default About;
