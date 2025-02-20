import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './Navbar';
import '../styles/assignment-form.css';

const AssignmentForm = () => {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const [collegeName, setCollegeName] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogState, setDialogState] = useState({
    show: false,
    status: '',
    message: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    pages: '',
    pricePerPage: '',
    email: ''
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDialogState({
      show: true,
      status: 'loading',
      message: 'Posting your assignment...'
    });

    try {
      await axios.post(`http://localhost:8000/api/colleges/${collegeId}/assignments/`, {
        name: formData.name,
        pages: parseInt(formData.pages),
        price_per_page: parseFloat(formData.pricePerPage),
        email: formData.email
      });
      
      setDialogState({
        show: true,
        status: 'success',
        message: 'Assignment posted successfully!'
      });
    } catch (error) {
      setDialogState({
        show: true,
        status: 'error',
        message: 'Error posting assignment. Please try again.'
      });
    }
  };

  const handleCloseDialog = () => {
    if (dialogState.status === 'success') {
      navigate(`/college/${collegeId}`);
    } else {
      setDialogState({ show: false, status: '', message: '' });
    }
  };

  if (loading) {
    return (
      <>
        <NavigationBar />
        <div className="loading-container">Loading...</div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="assignment-form-page">
        <h1 className="college-name">{collegeName}</h1>
        <form className="assignment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter a display name (any random name!)"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="pages"
              placeholder="Approximate number of pages needed"
              value={formData.pages}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="pricePerPage"
              placeholder="Amount you'll pay per page ($)"
              value={formData.pricePerPage}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your email (for notifications only, not visible on website)"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Post Assignment
          </button>
        </form>

        {dialogState.show && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              {dialogState.status === 'loading' ? (
                <>
                  <div className="spinner"></div>
                  <p>Posting your assignment...</p>
                </>
              ) : dialogState.status === 'success' ? (
                <>
                  <h2>Success!</h2>
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

export default AssignmentForm;