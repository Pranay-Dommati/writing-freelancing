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

  const [touched, setTouched] = useState({
    name: false,
    pages: false,
    pricePerPage: false,
    email: false
  });

  const [errors, setErrors] = useState({
    name: '',
    pages: '',
    pricePerPage: '',
    email: ''
  });

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Display name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 50) return 'Name must be less than 50 characters';
        return '';

      case 'pages':
        if (!value) return 'Number of pages is required';
        if (isNaN(value) || value < 1) return 'Please enter a valid number of pages';
        if (value > 100) return 'Maximum 100 pages allowed';
        return '';

      case 'pricePerPage':
        if (!value) return 'Price per page is required';
        if (isNaN(value) || value < 1) return 'Please enter a valid price';
        if (value > 1000) return 'Maximum price per page is $1000';
        return '';

      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';

      default:
        return '';
    }
  };

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      pages: true,
      pricePerPage: true,
      email: true
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        <form className="assignment-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${touched.name && errors.name ? 'has-error' : ''}`}>
            <input
              type="text"
              name="name"
              placeholder="Enter a display name (any random name!)"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.name ? 'invalid' : ''}
              required
            />
            {touched.name && errors.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </div>

          <div className={`form-group ${touched.pages && errors.pages ? 'has-error' : ''}`}>
            <input
              type="number"
              name="pages"
              placeholder="Approximate number of pages needed"
              value={formData.pages}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.pages && errors.pages ? 'invalid' : ''}
              required
              min="1"
            />
            {touched.pages && errors.pages && (
              <div className="error-message">{errors.pages}</div>
            )}
          </div>

          <div className={`form-group ${touched.pricePerPage && errors.pricePerPage ? 'has-error' : ''}`}>
            <input
              type="number"
              name="pricePerPage"
              placeholder="Amount you'll pay per page ($)"
              value={formData.pricePerPage}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.pricePerPage && errors.pricePerPage ? 'invalid' : ''}
              required
              min="1"
            />
            {touched.pricePerPage && errors.pricePerPage && (
              <div className="error-message">{errors.pricePerPage}</div>
            )}
          </div>

          <div className={`form-group ${touched.email && errors.email ? 'has-error' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder="Your email (for notifications only, not visible on website)"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? 'invalid' : ''}
              required
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          <div className="helper-messages">
  <div className="helper-message">
    <svg className="info-icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
    <span>You can enter any anonymous random name</span>
  </div>

  <div className="helper-message">
    <svg className="info-icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
    <span>Your email is not exposed on website</span>
  </div>
</div>
          <button 
            type="submit" 
            className="submit-button"
            disabled={Object.keys(errors).some(key => errors[key])}
          >
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