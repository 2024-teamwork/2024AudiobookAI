import React from "react";
import "./SubscriptionPage.css"; // CSS file for styling
import Footer from "../../Layout/footer/Footer";
import Navigation from "../../Layout/navigation/Navigation";

const SubscriptionPage = () => {
  const subscriptionPlans = [
    {
      name: "Basic",
      price: "$9.99/month",
      features: [
        "10 hours of audio processing",
        "Standard quality",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$19.99/month",
      features: [
        "50 hours of audio processing",
        "High quality",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "$49.99/month",
      features: [
        "Unlimited hours of audio processing",
        "Premium quality",
        "Dedicated support",
        "Custom solutions",
      ],
    },
  ];

  return (
    <div className="subscription-page">
          <Navigation />
      <h1 className="title">Choose Your AudioAI Subscription Plan</h1>
      <div className="plans-container">
        {subscriptionPlans.map((plan, index) => (
          <div key={index} className="plan-card">
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-price">{plan.price}</p>
            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="subscribe-button">Subscribe</button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default SubscriptionPage;
