import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/college-page.css';

const CollegePage = () => {
  const navigate = useNavigate();

  const handleNeedWritingClick = () => {
    navigate('/assignment-form');
  };

  const handleWriteEarnClick = () => {
    navigate('/assignments');
  };

  return (
    <div className="college-page">
      <h1 className="college-name">College Name</h1>
      <div className="buttons-container">
        <button 
          className="action-button write-earn"
          onClick={handleWriteEarnClick}
        >
          Write & Earn
        </button>
        <button 
          className="action-button need-writing"
          onClick={handleNeedWritingClick}
        >
          Need Writing Done?
        </button>
      </div>
    </div>
  );
};

export default CollegePage;