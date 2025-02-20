import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './Navbar';
import '../styles/assignments-list.css';

const AssignmentsList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [assignments, setAssignments] = useState([]);
    const [displayedAssignments, setDisplayedAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collegeName, setCollegeName] = useState('');
    const searchParams = new URLSearchParams(location.search);
    const collegeId = searchParams.get('college');
    const [currentPage, setCurrentPage] = useState(1);
    const assignmentsPerPage = 6;

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
                setDisplayedAssignments(assignmentsResponse.data.slice(0, assignmentsPerPage));
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

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        const startIndex = 0;
        const endIndex = nextPage * assignmentsPerPage;
        setDisplayedAssignments(assignments.slice(startIndex, endIndex));
        setCurrentPage(nextPage);
    };

    const handleApplyClick = (assignmentId) => {
        navigate(`/college/${collegeId}/assignments/${assignmentId}/apply`);
    };

    if (loading) {
        return (
            <>
                <NavigationBar />
                <div className="assignments-page">
                    <div className="loading-container">Loading...</div>
                </div>
            </>
        );
    }

    if (assignments.length === 0) {
        return (
            <>
                <NavigationBar />
                <div className="assignments-page">
                    <h1 className="college-name">{collegeName}</h1>
                    <div className="no-assignments">
                        <p>No assignments available at the moment.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavigationBar />
            <div className="assignments-page">
                <h1 className="college-name">{collegeName}</h1>
                <div className="assignments-container">
                    {displayedAssignments.map(assignment => (
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
                {displayedAssignments.length < assignments.length && (
                    <button className="load-more-button" onClick={handleLoadMore}>
                        Load More
                    </button>
                )}
            </div>
        </>
    );
};

export default AssignmentsList;