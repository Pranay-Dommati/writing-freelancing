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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="animate-pulse text-xl text-gray-600">
            <span className="inline-block animate-spin mr-2">⌛</span>
            Loading...
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavigationBar />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="bg-red-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center text-red-700">
              <span className="text-2xl mr-2">⚠️</span>
              <span className="text-lg font-semibold">{error}</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 hover:shadow-lg">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Assignment Info */}
          <div className="mb-8">
            <p className="text-gray-700 text-lg mb-2">
              Someone has applied for your assignment:
            </p>
            <p className="text-blue-600 font-semibold text-xl p-3 bg-blue-50 rounded-lg">
              {assignmentName}
            </p>
          </div>

          {/* Action Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <p className="text-gray-700 font-medium mb-3">Please choose an action:</p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  <strong className="text-gray-700">Confirm:</strong> You will receive 
                  the writer's details via email, and the assignment will be removed 
                  from the website.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">×</span>
                <span>
                  <strong className="text-gray-700">Cancel:</strong> The application 
                  will be closed, and the assignment will remain active on the website.
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg 
                         font-medium transform transition-all duration-200
                         hover:bg-green-600 hover:scale-105 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                         disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleAction('confirm')}
              disabled={processing}
            >
              <span className="flex items-center justify-center">
                ✅ Confirm
              </span>
            </button>
            <button 
              className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg 
                         font-medium transform transition-all duration-200
                         hover:bg-red-600 hover:scale-105
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                         disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleAction('cancel')}
              disabled={processing}
            >
              <span className="flex items-center justify-center">
                ❌ Cancel
              </span>
            </button>
          </div>

          {/* Processing Indicator */}
          {processing && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin mr-2">⚙️</div>
              <span className="text-gray-600">Processing your request...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmApplication;
