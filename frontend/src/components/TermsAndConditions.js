import React from 'react';
import NavigationBar from './Navbar';
import '../styles/terms-conditions.css';

const TermsAndConditions = () => {
return (
<>
<NavigationBar />
<div className="tc-page">
<div className="tc-container">
<h1 className="tc-title">Terms and Conditions</h1>

{/* Disclaimer Section */}
<div className="tc-section">
<h2 className="tc-section-title">Disclaimer</h2>
<div className="tc-divider"></div>
<ul className="tc-list">
<li>The company is not responsible for any damages, losses, or conflicts arising from student interactions.</li>
<li>By using this platform, users agree to take full responsibility for their actions.</li>
<li className="tc-list-with-sublist">
<span>The platform is not responsible for:</span>
<ul className="tc-nested-list">
<li>Any disputes, conflicts, or disagreements between students.</li>
<li>The quality, accuracy, or originality of completed work.</li>
<li>Payments, refunds, or financial agreements between students.</li>
<li>Any academic misconduct or violations of institutional policies.</li>
</ul>
</li>
</ul>
</div>

{/* Platform Usage Section */}
<div className="tc-section">
<h2 className="tc-section-title">Platform Usage</h2>
<div className="tc-divider"></div>
<ul className="tc-list">
<li>The platform is only meant to connect students in need of help with those willing to assist.</li>
<li>The platform is not responsible after students connect—all further interactions are solely between them.</li>
<li className="tc-list-with-sublist">
<span>This website is a student-to-student connection platform where:</span>
<ul className="tc-nested-list">
<li>Students can post assignments they need help with.</li>
<li>Other students can apply to complete assignments and earn money.</li>
</ul>
</li>
</ul>
</div>
</div>
</div>
</>
);
};

export default TermsAndConditions;
