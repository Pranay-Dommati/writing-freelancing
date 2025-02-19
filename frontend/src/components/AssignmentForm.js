import React, { useState } from 'react';
import '../styles/assignment-form.css';

const AssignmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    pages: '',
    pricePerPage: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className="assignment-form-page">
      <h1 className="college-name">College Name</h1>
      
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
    </div>
  );
};

export default AssignmentForm;