import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/college-page.css';

const CollegePage = () => {
  const navigate = useNavigate();
  const { collegeId } = useParams();
  const [collegeName, setCollegeName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/colleges/${collegeId}/`);
        setCollegeName(response.data.name);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching college details:', error);
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [collegeId]);

  const handleNeedWritingClick = () => {
    navigate(`/college/${collegeId}/addassignment`);
  };

  const handleWriteEarnClick = () => {
    navigate(`/assignments?college=${collegeId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="college-page">
      <h1 className="college-name">{collegeName}</h1>
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