import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './Navbar';
import '../styles/apply-form.css';

const validateMobile = (number) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(number);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateInstaId = (id) => {
  const instaRegex = /^[a-zA-Z0-9_.]{1,30}$/;
  return instaRegex.test(id);
};

const getValidationMessage = (type, value) => {
  switch(type) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
      
    case 'mobile':
      if (!value) return 'Mobile number is required';
      if (!validateMobile(value)) return 'Please enter a valid 10-digit mobile number';
      return '';
      
    case 'email':
      if (!value) return 'Email is required';
      if (!validateEmail(value)) return 'Please enter a valid email address';
      return '';
      
    case 'instaId':
      if (!value) return 'Instagram ID is required';
      if (!validateInstaId(value)) {
        return 'Please enter a valid Instagram ID (letters, numbers, periods, and underscores only)';
      }
      return '';
      
    default:
      return '';
  }
};

const ApplyForm = () => {
  const navigate = useNavigate();
  const { collegeId, assignmentId } = useParams();
  const [collegeName, setCollegeName] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogState, setDialogState] = useState({
    show: false,
    status: '',
    message: ''
  });
  
  const [formData, setFormData] = useState({
    name: '',
    contactType: 'mobile',
    contactValue: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    contactValue: false
  });

  const [errors, setErrors] = useState({
    name: '',
    contactValue: ''
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

  const getPlaceholder = () => {
    switch(formData.contactType) {
      case 'mobile': return 'Enter your mobile number';
      case 'instaId': return 'Enter your Instagram ID';
      case 'email': return 'Enter your email address';
      default: return '';
    }
  };

  const validateField = (name, value) => {
    if (name === 'name') {
      return getValidationMessage('name', value);
    }

    if (name === 'contactValue') {
      return getValidationMessage(formData.contactType, value);
    }

    return '';
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }

    if (name === 'contactType') {
      setFormData(prev => ({
        ...prev,
        contactValue: ''
      }));
      setTouched(prev => ({
        ...prev,
        contactValue: false
      }));
      setErrors(prev => ({
        ...prev,
        contactValue: ''
      }));
    }
  };

  const validateForm = () => {
    const nameError = validateField('name', formData.name);
    const contactError = validateField('contactValue', formData.contactValue);

    setTouched({
      name: true,
      contactValue: true
    });

    setErrors({
      name: nameError,
      contactValue: contactError
    });

    return !nameError && !contactError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setDialogState({
      show: true,
      status: 'loading',
      message: 'Submitting your application...'
    });

    try {
      const applicationData = {
        name: formData.name,
        contact_type: formData.contactType,
        contact_value: formData.contactValue,
      };

      await axios.post(
        `http://localhost:8000/api/colleges/${collegeId}/assignments/${assignmentId}/apply/`,
        applicationData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setDialogState({
        show: true,
        status: 'success',
        message: `You will get ${formData.contactType === 'mobile' ? 'a call' : 
                 formData.contactType === 'instaId' ? 'messages on Instagram' : 'an email'} 
                 from the assignment owner so you can connect in college and complete the writing work.`
      });
    } catch (error) {
      setDialogState({
        show: true,
        status: 'error',
        message: error.response?.data?.detail || 'Error submitting application. Please try again.'
      });
    }
  };

  const handleCloseDialog = () => {
    if (dialogState.status === 'success') {
      navigate(`/assignments?college=${collegeId}`);
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
      <div className="apply-form-page">
        <h1 className="college-name">{collegeName}</h1>
        <form className="apply-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
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

          <div className="form-group contact-group">
            <select
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
              required
            >
              <option value="mobile">Mobile Number</option>
              <option value="instaId">Instagram ID</option>
              <option value="email">Email</option>
            </select>

            <input
              type={formData.contactType === 'email' ? 'email' : 'text'}
              name="contactValue"
              placeholder={getPlaceholder()}
              value={formData.contactValue}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.contactValue && errors.contactValue ? 'invalid' : ''}
              required
            />
          </div>
          {touched.contactValue && errors.contactValue && (
            <div className="error-message">{errors.contactValue}</div>
          )}

          <button 
            type="submit" 
            className="confirm-button"
            disabled={Object.keys(errors).some(key => errors[key])}
          >
            Confirm Application
          </button>
        </form>

        {dialogState.show && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              {dialogState.status === 'loading' ? (
                <>
                  <div className="spinner"></div>
                  <p>Submitting your application...</p>
                </>
              ) : dialogState.status === 'success' ? (
                <>
                  <h2>Application Submitted!</h2>
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

export default ApplyForm;