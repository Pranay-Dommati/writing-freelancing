import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/assignments-list.css';

const AssignmentsList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collegeName, setCollegeName] = useState('');
    const searchParams = new URLSearchParams(location.search);
    const collegeId = searchParams.get('college');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch college details
                const collegeResponse = await axios.get(
                    `http://localhost:8000/api/colleges/${collegeId}/`
                );
                setCollegeName(collegeResponse.data.name);

                // Fetch assignments for this college
                const assignmentsResponse = await axios.get(
                    `http://localhost:8000/api/colleges/${collegeId}/assignments/list/`
                );
                setAssignments(assignmentsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        if (collegeId) {
            fetchData();
        }
    }, [collegeId]);

    const handleApplyClick = (assignmentId) => {
        navigate(`/apply-form?assignment=${assignmentId}&college=${collegeId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (assignments.length === 0) {
        return (
            <div className="assignments-page">
                <h1 className="college-name">{collegeName}</h1>
                <div className="no-assignments">
                    <p>No assignments available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="assignments-page">
            <h1 className="college-name">{collegeName}</h1>
            <div className="assignments-container">
                {assignments.map(assignment => (
                    <div key={assignment.id} className="assignment-card">
                        <h2 className="assignment-name">{assignment.name}</h2>
                        <div className="assignment-details">
                            <div className="detail-item">
                                <span className="detail-label">Approx Pages:</span>
                                <span className="detail-value">{assignment.pages}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Pay per page:</span>
                                <span className="detail-value">₹{assignment.price_per_page}</span>
                            </div>
                            <div className="detail-item total-pay">
                                <span className="detail-label">Total Pay:</span>
                                <span className="detail-value">
                                    ₹{(assignment.pages * assignment.price_per_page).toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <button 
                            className="apply-button"
                            onClick={() => handleApplyClick(assignment.id)}
                        >
                            Apply to Write
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentsList;