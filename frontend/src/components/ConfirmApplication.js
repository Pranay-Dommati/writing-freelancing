import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './Navbar';
import '../styles/confirm-application.css';

const ConfirmApplication = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignmentName, setAssignmentName] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/confirm-application/${token}/`);
        setAssignmentName(response.data.assignment_name);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleAction = async (action) => {
    setProcessing(true);
    try {
      await axios.post(`http://localhost:8000/api/confirm-application/${token}/`, { action });
      navigate('/', { 
        state: { 
          message: action === 'confirm' ? 
            "Application confirmed! Check your email for writer's details." : 
            "Application cancelled successfully" 
        }
      });
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavigationBar />
        <div className="loading-container">⏳ Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavigationBar />
        <div className="error-container">⚠️ {error}</div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="confirm-application-page">
        <div className="confirmation-box">
          <h1>Confirm Your Application</h1>
          <p>Someone has applied for your assignment: <strong>{assignmentName}</strong></p>
          <p>Please choose an action:</p>
          <ul className="action-details">
            <li><strong>✅ Confirm:</strong> You will receive the writer's details via email, and the assignment will be removed from the website.</li>
            <li><strong>❌ Cancel:</strong> The application will be closed, and the assignment will remain active on the website.</li>
          </ul>
          
          <div className="buttons-container">
            <button 
              className="confirm-button"
              onClick={() => handleAction('confirm')}
              disabled={processing}
            >
              ✅ Confirm
            </button>
            <button 
              className="cancel-button"
              onClick={() => handleAction('cancel')}
              disabled={processing}
            >
              ❌ Cancel
            </button>
          </div>

          {processing && <div className="processing-message">⏳ Processing...</div>}
        </div>
      </div>
    </>
  );
};

export default ConfirmApplication;
