import React from 'react';
import NavigationBar from './Navbar';
import '../styles/about-page.css';

const AboutPage = () => {
  return (
    <>
    <NavigationBar />
      <div className="about-page">
  
  <div className="about-content">
    <h1>About FreelanceWriting</h1>
    <div className="platform-description">
      <p>
        FreelanceWriting connects college students who need writing assistance 
        with student writers. Our platform facilitates seamless 
        collaboration while providing opportunities for students to earn through writing.
      </p>
    </div>

    <h2>How It Works</h2>
          
          <div className="cards-container">
            <div className="info-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                  <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"/>
                </svg>
              </div>
              <h4>For Students Needing Writing Help</h4>
              <ul>
                <li>Post your writing assignment details</li>
                <li>Set your budget per page</li>
                <li>Get matched with skilled writers</li>
                <li>Receive an email with writer details</li>
              </ul>
            </div>

            <div className="info-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </div>
              <h4>For Student Writers</h4>
              <ul>
                <li>Browse available writing opportunities</li>
                <li>Choose assignments that match your expertise</li>
                <li>Apply with your preferred contact method</li>
                <li>Connect and earn by writing</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AboutPage;