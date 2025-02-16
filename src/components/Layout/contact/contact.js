import React, { useState } from "react";
import twitterIcon from "../../../images/contact/twitter.JPG";
import linkedinIcon from "../../../images/contact/linkedin.JPG";
import facebookIcon from "../../../images/contact/facebook.JPG";
import contactHistogram from "../../../images/contact/histogram.JPG";
import "./contact.css"; // Ensure this file exists with styles
import Navigation from "../../Layout/navigation/Navigation";

const Contact = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      query: "",
      message: "",
    });
  
    const [showPopup, setShowPopup] = useState(false);
  
    // Handle input change
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle social media icon clicks
    const socialMediaLinks = (platform) => {
      console.log(`Redirecting to ${platform} page`);
      // Uncomment the line below when real links are available
      // window.location.href = `https://www.${platform}.com`;
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data:", JSON.stringify(formData, null, 2));
  
      // Show success popup
      setShowPopup(true);
  
      // Clear form fields
      setFormData({
        name: "",
        email: "",
        query: "",
        message: "",
      });
  
      /* Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      */
    };
  
    return (
      <div>
        <Navigation />
        <div className="contact-container">
          <div className="contact-form">
            <h2>Contact Us</h2>
            <p className="form-subtitle">Please fill the form below.</p>
  
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="query"
                placeholder="Query Related"
                value={formData.query}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Contact now</button>
            </form>
          </div>
  
          <div className="contact-info">
            <h3>Socials</h3>
            <div className="social-icons">
              <img src={facebookIcon} alt="Facebook" onClick={() => socialMediaLinks("facebook")} />
              <img src={twitterIcon} alt="Twitter" onClick={() => socialMediaLinks("twitter")} />
              <img src={linkedinIcon} alt="LinkedIn" onClick={() => socialMediaLinks("linkedin")} />
            </div>
          </div>
  
          <div className="contact-histogram">
            <img src={contactHistogram} alt="Histogram" />
          </div>
        </div>
  
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <p className="popup-message">
                {"You have successfully submitted the contact form!\n We'll reach out to you soon."}
              </p>
              <button className="popup-close" onClick={() => setShowPopup(false)}>✖</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Contact;