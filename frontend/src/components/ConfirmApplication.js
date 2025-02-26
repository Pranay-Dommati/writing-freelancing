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
  const [completed, setCompleted] = useState(false);
  const [actionTaken, setActionTaken] = useState('');

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
      setProcessing(false);
      setCompleted(true);
      setActionTaken(action);
      
      // Set timeout to navigate after showing confirmation message
      setTimeout(() => {
        navigate('/', { 
          state: { 
            message: action === 'confirm' ? 
              "Application confirmed! Check your email for writer's details." : 
              "Application cancelled successfully" 
          }
        });
      }, 3000); // Show confirmation message for 3 seconds before redirecting
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Container with responsive padding */}
        <div className="container mx-auto px-4 py-8 md:py-16">
          
          {/* Card Container with max-width for larger screens */}
          <div className="max-w-2xl mx-auto">
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">

                <p className="text-blue-100 text-center mt-2">
                  Please review the application details below
                </p>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8">
                {/* Assignment Info Card */}
                <div className="bg-blue-50 rounded-xl p-6 mb-8 border-2 border-blue-100">
                  <h2 className="text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
                    Assignment Details
                  </h2>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">
                    {assignmentName}
                  </p>
                </div>

                {/* Action Info Section */}
                <div className="space-y-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Available Actions
                  </h3>
                  
                  {/* Confirm Option Card */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                          <span className="text-green-600 text-xl">✓</span>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-green-800 font-medium mb-1">Confirm Application</h4>
                        <p className="text-green-700 text-sm">
                        Accept the application and receive the writer's details via email. 
                        The assignment will be deactivated on the website and removed from visibility for users.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cancel Option Card */}
                  <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                          <span className="text-red-600 text-xl">×</span>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-red-800 font-medium mb-1">Cancel Application</h4>
                        <p className="text-red-700 text-sm">
                          Decline the application and keep the assignment active on the website.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleAction('confirm')}
                    disabled={processing || completed}
                    className="flex items-center justify-center px-6 py-3 rounded-lg
                      bg-gradient-to-r from-green-500 to-green-600 
                      text-white font-semibold
                      transform transition-all duration-200
                      hover:from-green-600 hover:to-green-700
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                      disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-lg hover:shadow-xl"
                  >
                    {processing ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span>Confirm Application</span>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => handleAction('cancel')}
                    disabled={processing || completed}
                    className="flex items-center justify-center px-6 py-3 rounded-lg
                      bg-gradient-to-r from-red-500 to-red-600
                      text-white font-semibold
                      transform transition-all duration-200
                      hover:from-red-600 hover:to-red-700
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                      disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-lg hover:shadow-xl"
                  >
                    {processing ? 'Processing...' : 'Cancel Application'}
                  </button>
                </div>
              </div>
            </div>

            {/* Processing Overlay */}
            {processing && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <p className="text-gray-700 font-medium">Processing your request...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation Message Overlay */}
            {completed && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 shadow-xl max-w-md w-full mx-4 text-center">
                  {actionTaken === 'confirm' ? (
                    <>
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Confirmed!</h3>
                      <p className="text-gray-700 mb-3">
                        The writer's details have been sent to your email. The assignment has been deactivated from the website.
                      </p>
                      <p className="text-sm text-gray-500">Redirecting to homepage...</p>
                    </>
                  ) : (
                    <>
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                        <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Cancelled</h3>
                      <p className="text-gray-700 mb-3">
                        Your assignment will remain active on the website for other applicants.
                      </p>
                      <p className="text-sm text-gray-500">Redirecting to homepage...</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmApplication;
