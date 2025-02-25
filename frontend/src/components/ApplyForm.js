import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './Navbar';
import '../styles/apply-form.css';

// Validation helper functions
const validators = {
  mobile: (number) => /^[6-9]\d{9}$/.test(number),
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  instaId: (id) => /^[a-zA-Z0-9_.]{1,30}$/.test(id)
};

const getValidationMessage = (type, value) => {
  const messages = {
    name: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name must be less than 50 characters',
      pattern: 'Name can only contain letters and spaces'
    },
    mobile: {
      required: 'Mobile number is required',
      pattern: 'Please enter a valid 10-digit mobile number starting with 6-9'
    },
    email: {
      required: 'Email is required',
      pattern: 'Please enter a valid email address'
    },
    instaId: {
      required: 'Instagram ID is required',
      pattern: 'Please enter a valid Instagram ID (letters, numbers, dots, underscores only)',
      maxLength: 'Instagram ID must be less than 30 characters'
    }
  };

  if (!value || !value.trim()) return messages[type].required;
  
  switch (type) {
    case 'name':
      if (value.trim().length < 2) return messages.name.minLength;
      if (value.trim().length > 50) return messages.name.maxLength;
      if (!/^[a-zA-Z\s]+$/.test(value)) return messages.name.pattern;
      break;
    case 'mobile':
      if (!validators.mobile(value)) return messages.mobile.pattern;
      break;
    case 'email':
      if (!validators.email(value)) return messages.email.pattern;
      break;
    case 'instaId':
      if (!validators.instaId(value)) return messages.instaId.pattern;
      if (value.length > 30) return messages.instaId.maxLength;
      break;
    default:
      return '';
  }
  return '';
};

const ApplyForm = () => {
  const navigate = useNavigate();
  const { collegeId, assignmentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [collegeName, setCollegeName] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    contactType: 'mobile',
    contactValue: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    contactValue: false
  });

  const [errors, setErrors] = useState({
    name: '',
    contactValue: ''
  });

  const [dialogState, setDialogState] = useState({
    show: false,
    status: '',
    message: ''
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

  const validateField = (name, value) => {
    if (name === 'name') {
      return getValidationMessage('name', value);
    }
    if (name === 'contactValue') {
      return getValidationMessage(formData.contactType, value);
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input based on field type
    let sanitizedValue = value;
    if (name === 'name') {
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (formData.contactType === 'mobile') {
      sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    }

    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    if (touched[name]) {
      const error = validateField(name, sanitizedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }

    // Reset contact value when changing contact type
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

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      contactValue: validateField('contactValue', formData.contactValue)
    };

    setErrors(newErrors);
    setTouched({ name: true, contactValue: true });

    return !Object.values(newErrors).some(error => error);
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
      await axios.post(
        `http://localhost:8000/api/colleges/${collegeId}/assignments/${assignmentId}/apply/`,
        {
          name: formData.name.trim(),
          contact_type: formData.contactType,
          contact_value: formData.contactValue.trim()
        }
      );

      setDialogState({
        show: true,
        status: 'success',
        message: `You will get ${
          formData.contactType === 'mobile' ? 'a call' : 
          formData.contactType === 'instaId' ? 'messages on Instagram' : 
          'an email'
        } from the assignment owner to connect and complete the writing work.`
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
        <form className="apply-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${touched.name && errors.name ? 'has-error' : ''}`}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.name ? 'invalid' : ''}
              required
              aria-invalid={touched.name && errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {touched.name && errors.name && (
              <div className="error-message" id="name-error" role="alert">
                {errors.name}
              </div>
            )}
          </div>

          <div className={`form-group contact-group ${touched.contactValue && errors.contactValue ? 'has-error' : ''}`}>
            <select
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
              className="contact-select"
              required
            >
              <option value="mobile">Mobile Number</option>
              <option value="instaId">Instagram ID</option>
              <option value="email">Email</option>
            </select>

            <input
              type={formData.contactType === 'email' ? 'email' : 'text'}
              name="contactValue"
              placeholder={
                formData.contactType === 'mobile' ? 'Enter your mobile number' :
                formData.contactType === 'instaId' ? 'Enter your Instagram ID' :
                'Enter your email address'
              }
              value={formData.contactValue}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.contactValue && errors.contactValue ? 'invalid' : ''}
              required
              aria-invalid={touched.contactValue && errors.contactValue ? 'true' : 'false'}
              aria-describedby={errors.contactValue ? 'contact-error' : undefined}
            />
          </div>
          {touched.contactValue && errors.contactValue && (
            <div className="error-message" id="contact-error" role="alert">
              {errors.contactValue}
            </div>
          )}

          <div className="privacy-message">
            <svg className="privacy-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
            <span>
              Your data remains private and is only shared with the assignment owner to connect in college
            </span>
          </div>
          <button 
            type="submit" 
            className="confirm-button"
            disabled={Object.keys(errors).some(key => errors[key]) || !formData.name || !formData.contactValue}
          >
            Confirm Application
          </button>
        </form>

        {dialogState.show && (
          <div className="dialog-overlay" role="dialog">
            <div className="dialog-box">
              {dialogState.status === 'loading' ? (
                <>
                  <div className="spinner" role="status">
                    {/* <span className="sr-only">Loading...</span> */}
                  </div>
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