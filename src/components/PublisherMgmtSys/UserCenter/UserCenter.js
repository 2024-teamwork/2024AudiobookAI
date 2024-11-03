// UserCenter.js
import React from 'react';
import Card from './Card/Card';

import './UserCenter.css';

const UserCenter = () => {
  const notebooks = [
    { title: 'Audio Product1', date: 'Oct 8, 2024', sources: 3, icon: '📘' },
    { title: 'Audio Product2', date: 'Oct 8, 2024', sources: 2, icon: '📕' }
  ];

  const exampleNotebooks = [
    { title: 'Introduction to AudioBookAI', date: 'Dec 5, 2023', sources: 8, icon: '👋' },
    { title: 'Invention Of The Lightbulb', date: 'Dec 7, 2023', sources: 4, icon: '💡' },
    { title: 'Mugifier Documents', date: 'Nov 28, 2023', sources: 6, icon: '☕' },
    { title: 'Westward Mushrooms', date: 'Nov 21, 2023', sources: 7, icon: '🍄' }
  ];

  return (
    <div className="user-center">
      <h1>AudioBookAI</h1>
      
      <section>
        <h2>Your Audio Products</h2>
        <div className="notebook-grid">
          <Card isNew />
          {notebooks.map((notebook, index) => (
            <Card
              key={index}
              title={notebook.title}
              date={notebook.date}
              sources={notebook.sources}
              icon={notebook.icon}
            />
          ))}
        </div>
      </section>
      
      <section>
        <h2>Example Audio Products</h2>
        <div className="notebook-grid">
          {exampleNotebooks.map((notebook, index) => (
            <Card
              key={index}
              title={notebook.title}
              date={notebook.date}
              sources={notebook.sources}
              icon={notebook.icon}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserCenter;
