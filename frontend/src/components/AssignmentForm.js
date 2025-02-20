import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/assignment-form.css';

const AssignmentForm = () => {
  const { collegeId } = useParams();
  const [collegeName, setCollegeName] = useState('');
  const [loading, setLoading] = useState(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here with collegeId
    console.log('Form submitted:', { ...formData, collegeId });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="assignment-form-page">
      <h1 className="college-name">{collegeName}</h1>
      <form className="assignment-form" onSubmit={handleSubmit}>
        {/* ... existing form fields ... */}
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