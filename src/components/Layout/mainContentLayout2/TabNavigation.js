import React from "react";
import "./MainContentLayout.css"

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      {Object.entries(tabs).map(([key, tab]) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={activeTab === key ? "active" : ""}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
