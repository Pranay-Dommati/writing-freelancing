import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './Navbar';
import '../styles/feedback-form.css';
import config from '../config';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    errors: '',
    suggestions: ''
  });
  const [dialogState, setDialogState] = useState({
    show: false,
    status: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.errors && !formData.suggestions) {
      alert('Please fill at least one field');
      return;
    }

    setDialogState({
      show: true,
      status: 'loading',
      message: 'Submitting your feedback...'
    });

    try {
      await axios.post('${config.API_URL}/feedback/', formData);
      setDialogState({
        show: true,
        status: 'success',
        message: 'Thank you for your feedback!'
      });
    } catch (error) {
      setDialogState({
        show: true,
        status: 'error',
        message: 'Error submitting feedback. Please try again.'
      });
    }
  };

  const handleCloseDialog = () => {
    if (dialogState.status === 'success') {
      navigate('/');
    } else {
      setDialogState({ show: false, status: '', message: '' });
    }
  };
  return (
    <>
      <NavigationBar />
      <div className="feedback-page">
        <h1 className="feedback-title">Feedback</h1> {/* Moved outside */}
        <div className="feedback-container">
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Any Errors Found?</label>
              <textarea
                name="errors"
                value={formData.errors}
                onChange={handleChange}
                placeholder="Describe any errors or issues you encountered..."
                rows="4"
              />
            </div>
  
            <div className="form-group">
              <label>Suggestions</label>
              <textarea
                name="suggestions"
                value={formData.suggestions}
                onChange={handleChange}
                placeholder="Share your suggestions for improvement..."
                rows="4"
              />
            </div>
  
            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </form>
        </div>
  
        {dialogState.show && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              {dialogState.status === 'loading' ? (
                <>
                  <div className="spinner"></div>
                  <p>Submitting your feedback...</p>
                </>
              ) : dialogState.status === 'success' ? (
                <>
                  <h2>Thank You!</h2>
                  <p>{dialogState.message}</p>
                  <button onClick={handleCloseDialog} className="dialog-button">
                    OK
                  </button>
                </>
              ) : (
                <>
                  <h2>Error</h2>
                  <p>{dialogState.message}</p>
                  <button onClick={handleCloseDialog} className="dialog-button">
                    Try Again
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

};

export default FeedbackForm;