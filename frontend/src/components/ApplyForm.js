import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/apply-form.css';

const ApplyForm = () => {
  const navigate = useNavigate();
  const { collegeId, assignmentId } = useParams();
  const [collegeName, setCollegeName] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    contactType: 'mobile',
    contactValue: '',
  });
  const [showDialog, setShowDialog] = useState(false);

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
      case 'mobile':
        return 'Enter your mobile number';
      case 'instaId':
        return 'Enter your Instagram ID';
      case 'email':
        return 'Enter your email address';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Format the data according to the backend expectations
        const applicationData = {
          name: formData.name,
          contact_type: formData.contactType,
          contact_value: formData.contactValue,
        };
  
        // Make the API call
        const response = await axios.post(
          `http://localhost:8000/api/colleges/${collegeId}/assignments/${assignmentId}/apply/`,
          applicationData,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
  
        if (response.status === 201) {
          setShowDialog(true);
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        if (error.response?.data) {
          // Show specific error message from backend
          alert(`Error: ${JSON.stringify(error.response.data)}`);
        } else {
          alert('Error submitting application. Please try again.');
        }
      }
    };

  const handleCloseDialog = () => {
    setShowDialog(false);
    navigate(`/assignments?college=${collegeId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
            required
          />
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
            required
          />
        </div>

        <button type="submit" className="confirm-button">
          Confirm Application
        </button>
      </form>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Application Submitted!</h2>
            <p>
              You will get {formData.contactType === 'mobile' ? 'a call ' : 
              formData.contactType === 'instaId' ? 'messages on Instagram ' : 'an email '} 
              from the assignment owner so you can connect in college and complete the writing work.
            </p>
            <button onClick={handleCloseDialog} className="dialog-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyForm;