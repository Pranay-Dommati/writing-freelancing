import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './Navbar';

const ConfirmApplication = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignmentName, setAssignmentName] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/confirm-application/${token}/`);
        setAssignmentName(response.data.assignment_name);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleAction = async (action) => {
    setProcessing(true);
    try {
      await axios.post(`http://localhost:8000/api/confirm-application/${token}/`, { action });
      navigate('/', { 
        state: { 
          message: action === 'confirm' ? 
            "Application confirmed! Check your email for writer's details." : 
            "Application cancelled successfully" 
        }
      });
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavigationBar />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavigationBar />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Assignment Application</h1>
          <p className="text-gray-600 mb-4">Someone has applied for your assignment: <strong>{assignmentName}</strong></p>
          <p className="text-gray-600 mb-4">Please choose an action:</p>
          <ul className="text-left text-gray-600 mb-4">
            <li><strong>Confirm:</strong> You will receive the writer's details via email, and the assignment will be removed from the website.</li>
            <li><strong>Cancel:</strong> The application will be closed, and the assignment will remain active on the website.</li>
          </ul>
          
          <div className="flex justify-center gap-4">
            <button 
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
              onClick={() => handleAction('confirm')}
              disabled={processing}
            >
              ✅ Confirm
            </button>
            <button 
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50"
              onClick={() => handleAction('cancel')}
              disabled={processing}
            >
              ❌ Cancel
            </button>
          </div>

          {processing && <div className="text-gray-600 mt-4">Processing...</div>}
        </div>
      </div>
    </>
  );
};

export default ConfirmApplication;
