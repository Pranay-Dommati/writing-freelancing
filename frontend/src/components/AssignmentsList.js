import React from 'react';
import '../styles/assignments-list.css';
import { useNavigate } from 'react-router-dom';

const sampleAssignments = [
    {
        id: 1,
        name: "John's Assignment",
        pages: 8,
        pricePerPage: 25,
    },
    {
        id: 2,
        name: "Sarah's Project",
        pages: 5,
        pricePerPage: 30,
    },
    {
        id: 3,
        name: "Mike's Research Work",
        pages: 3,
        pricePerPage: 35,
    }
];

const AssignmentsList = () => {
    const navigate = useNavigate();

    const handleApplyClick = () => {
        navigate('/apply-form');
    };

    return (
        <div className="assignments-page">
            <h1 className="college-name">College Name</h1>
            <div className="assignments-container">
                {sampleAssignments.map(assignment => (
                    <div key={assignment.id} className="assignment-card">
                        <h2 className="assignment-name">{assignment.name}</h2>
                        <div className="assignment-details">
                            <div className="detail-item">
                                <span className="detail-label">Approx Pages:</span>
                                <span className="detail-value">{assignment.pages}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Pay per page:</span>
                                <span className="detail-value">${assignment.pricePerPage}</span>
                            </div>
                            <div className="detail-item total-pay">
                                <span className="detail-label">Total Pay:</span>
                                <span className="detail-value">${assignment.pages * assignment.pricePerPage}</span>
                            </div>
                        </div>
                        <button className="apply-button" onClick={handleApplyClick}>
                        Apply to Write
                        </button>                    
                        </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentsList;






