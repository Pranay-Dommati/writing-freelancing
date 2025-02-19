import React, { useState } from 'react';
import '../styles/apply-form.css';

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactType: 'mobile', // default selection
    contactValue: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    // Add submission logic here
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
    </div>
  );
};

export default ApplyForm;