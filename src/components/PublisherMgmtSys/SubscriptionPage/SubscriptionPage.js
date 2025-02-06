import React, { useState } from "react";
import Footer from "../../Layout/footer/Footer";
import Navigation from "../../Layout/navigation/Navigation";
import "./SubscriptionPage.css";
import basicIcon from "../../../images/icon/basic.jpg";
import checkIcon from "../../../images/icon/check.jpg";
import earphoneIcon from "../../../images/icon/earphone.jpg";
import enterpriseIcon from "../../../images/icon/enterprise.jpg";
import proIcon from "../../../images/icon/pro.jpg";

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  const subscribeToPlan = (planType) => {
    console.log(`Subscribed to ${planType} plan`);
  };

  const plans = [
    {
      type: "Basic",
      price: "$19.99",
      description: "Perfect for beginners and hobbyists",
      icon: basicIcon,
      features: [
        "AI-powered audio enhancement",
        "Basic noise reduction",
        "5 hours of processing per month",
        "Standard support",
        "720p export quality",
      ],
    },
    {
      type: "Pro",
      price: "$29.99",
      description: "Ideal for content creators",
      icon: proIcon,
      features: [
        "Everything in Basic",
        "Advanced noise reduction",
        "20 hours of processing per month",
        "Priority support",
        "4K export quality",
        "Custom AI voice cloning",
      ],
    },
    {
      type: "Enterprise",
      price: "$59.99",
      description: "For professional studios",
      icon: enterpriseIcon,
      features: [
        "Everything in Pro",
        "Unlimited processing",
        "24/7 dedicated support",
        "8K export quality",
        "Multiple AI voice profiles",
        "API access",
        "Custom integration support",
      ],
    },
  ];

  return (
    <>
      <Navigation />
      <div className="subscription-container">
        <img src={earphoneIcon} alt="Headphone Icon" className="headphone-icon" />
        <h2>Choose Your AudioAI Plan</h2>
        <p className="subtext">
          Transform your audio experience with cutting-edge AI technology.
        </p>
        <div className="plans">
          {plans.map((plan) => (
            <div
              key={plan.type}
              className={`plan-card ${selectedPlan === plan.type ? "selected" : ""}`}
              onClick={() => setSelectedPlan(plan.type)}
            >
              <div className="plan-header">
                <img src={plan.icon} alt={`${plan.type} Icon`} className="plan-icon" />
                <h3>{plan.type}</h3>
              </div>
              <p className="description">{plan.description}</p>
              <h4>
                {plan.price} <span className="per-month">/month</span>
              </h4>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <img src={checkIcon} alt="Check" className="check-icon" /> {feature}
                  </li>
                ))}
              </ul>
              <button onClick={() => subscribeToPlan(plan.type)}>Get Started</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubscriptionPage;
