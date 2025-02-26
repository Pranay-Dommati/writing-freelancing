import React from 'react';
import NavigationBar from './Navbar';
import '../styles/terms-conditions.css'; // We'll create this file

const TermsAndConditions = () => {
  return (
    <>
      <NavigationBar />
      <div className="tc-page">
        <h1 className="tc-title">Terms and Conditions</h1>
        <div className="tc-container">
          <div className="tc-section">
            <h2 className="tc-section-title">Disclaimer</h2>
            <ul className="tc-list">
              <li>
                The platform does not guarantee any job, assignment, or payment.
              </li>
              <li>
                The company is not responsible for any damages, losses, or conflicts that arise from student interactions.
              </li>
              <li>
                By using this platform, users agree to take full responsibility for their actions.
              </li>
              <li>
                The platform is not responsible for:
                <ul className="tc-nested-list">
                  <li>Any disputes, conflicts, or disagreements between students.</li>
                  <li>The quality, accuracy, or originality of completed work.</li>
                  <li>Payments, refunds, or financial agreements between students.</li>
                  <li>Any academic misconduct or violations of institutional policies.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="tc-section">
            <h2 className="tc-section-title">Platform Usage</h2>
            <ul className="tc-list">
              <li>
                This website is a student-to-student connection platform where:
                <ul className="tc-nested-list">
                  <li>Students can post assignments they need help with.</li>
                  <li>Other students can apply to complete assignments and earn money.</li>
                </ul>
              </li>
              <li>
                The platform is only meant to connect students in need of help with those willing to assist.
              </li>
              <li>
                The platform is not responsible after students connect with each other—all further interactions are solely between them.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
