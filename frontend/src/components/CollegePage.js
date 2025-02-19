import React from 'react';
import '../styles/college-page.css';

const CollegePage = () => {
  return (
    <div className="college-page">
      <h1 className="college-name">College Name</h1>
      <div className="buttons-container">
        <button className="action-button write-earn">Write and Earn</button>
        <button className="action-button need-writing">Need Writing Done?</button>
      </div>
    </div>
  );
};

export default CollegePage;