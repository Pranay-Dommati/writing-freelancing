import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/apply-form.css';

const ApplyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactType: 'mobile',
    contactValue: '',
  });
  const [showDialog, setShowDialog] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    navigate('/assignments'); // Navigate back to assignments list
  };

  return (
    <div className="apply-form-page">
      <h1 className="college-name">College Name</h1>
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